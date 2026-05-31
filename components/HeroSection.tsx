"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lang, translate } from "@/components/translations";

// Draggable Neobrutalist Shape Component for Hero section
const DraggableShape = ({
  initialClass,
  colorClass,
  sizeClass,
  rotateClass,
  animationDelay,
}: {
  initialClass: string;
  colorClass: string;
  sizeClass: string;
  rotateClass: string;
  animationDelay?: string;
}) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    let currentX = position?.x ?? 0;
    let currentY = position?.y ?? 0;

    if (position === null) {
      const parent = elementRef.current.offsetParent;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        currentX = rect.left - parentRect.left;
        currentY = rect.top - parentRect.top;
        setPosition({ x: currentX, y: currentY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    }

    dragStart.current = {
      x: clientX - currentX,
      y: clientY - currentY,
    };
    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const newX = clientX - dragStart.current.x;
    const newY = clientY - dragStart.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    handleStart(e.clientX, e.clientY);
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (e.cancelable) e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const style: React.CSSProperties = position
    ? {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? "scale(1.05) rotate(0deg)" : undefined,
        zIndex: isDragging ? 50 : 10,
        cursor: isDragging ? "grabbing" : "grab",
        animationDelay,
      }
    : {
        cursor: "grab",
        animationDelay,
      };

  return (
    <div
      ref={elementRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={style}
      className={`
        absolute border-4 border-black shadow-neo-lg select-none
        ${colorClass} ${sizeClass} ${rotateClass}
        ${position ? "" : initialClass}
        ${isDragging ? "dragging" : "animate-float"}
      `}
    />
  );
};

export function HeroSection({ lang }: { lang: Lang }) {
  const [mounted, setMounted] = useState(false);
  const [typedTitle, setTypedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const snakeCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Job title typing effect trigger
  useEffect(() => {
    if (!mounted) return;
    const textToType = lang === "id" ? "Programmer & Pengembang" : "Programmer & Developer";
    let currentLength = 0;
    
    const initTimer = setTimeout(() => {
      setTypedTitle("");
      setIsTyping(true);
    }, 0);

    const timer = setInterval(() => {
      currentLength++;
      setTypedTitle(textToType.slice(0, currentLength));
      if (currentLength >= textToType.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 75);
    return () => {
      clearTimeout(initTimer);
      clearInterval(timer);
    };
  }, [lang, mounted]);

  // Snake animation logic
  useEffect(() => {
    if (!mounted) return;
    const canvas = snakeCanvasRef.current;
    if (!canvas) return;

    let animId: number;
    let isInitialized = false;

    // Snake settings
    const baseSegments = 16;
    let currentSegments = baseSegments;
    const spacing = 5; // how many history steps between each segment
    const r = 14;      // body segment radius
    const headR = 17;  // head radius
    const speed = 2.8;
    const maxTurnSpeed = 0.055;

    // Snake variables
    let head = { x: 200, y: 200 };
    let currentAngle = 0;
    let trail: { x: number; y: number }[] = [];
    
    // Apple variables (2 apples on screen)
    const apples = [
      { id: 1, x: 0, y: 0, pulse: 0, active: false },
      { id: 2, x: 0, y: 0, pulse: 0, active: false }
    ];
    
    // Eating particles
    let particles: { x: number; y: number; vx: number; vy: number; color: string; life: number }[] = [];

    const getNewApplePosition = (): { x: number; y: number } => {
      if (!canvas) return { x: 300, y: 300 };
      
      const margin = 45; // allows slithering near edges/navbar
      const cW = canvas.width;
      const cH = canvas.height;
      
      // Center zone (nameplate and buttons area)
      const centerXStart = cW / 2 - 250;
      const centerXEnd = cW / 2 + 250;
      const centerYStart = cH / 2 - 150;
      const centerYEnd = cH / 2 + 150;

      // 85% chance to spawn OUTSIDE center, 15% inside
      const spawnOutside = Math.random() < 0.85;

      if (spawnOutside) {
        for (let attempt = 0; attempt < 50; attempt++) {
          const x = margin + Math.random() * (cW - margin * 2);
          const y = margin + Math.random() * (cH - margin * 2);
          const isInsideCenter = (x > centerXStart && x < centerXEnd && y > centerYStart && y < centerYEnd);
          if (!isInsideCenter) {
            return { x, y };
          }
        }
      }
      
      // Fallback inside margin
      return {
        x: margin + Math.random() * (cW - margin * 2),
        y: margin + Math.random() * (cH - margin * 2)
      };
    };

    // Spawn apples after nameplate rope drop finishes (1300ms)
    const applesTimer = setTimeout(() => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        apples.forEach((ap, idx) => {
          const pos = getNewApplePosition();
          ap.x = pos.x;
          ap.y = pos.y;
          ap.pulse = idx * Math.PI; // offset phases
          ap.active = true;
        });
      }
    }, 1300);

    // Spawn snake from off-screen edges after a delay (2300ms)
    const snakeTimer = setTimeout(() => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Setup off-screen edge spawning
        const edge = Math.floor(Math.random() * 4);
        let startX = 0;
        let startY = 0;
        let startAngle = 0;
        const cW = canvas.width;
        const cH = canvas.height;
        const offset = 55; // start completely out of bounds

        if (edge === 0) { // Top edge
          startX = Math.random() * cW;
          startY = -offset;
          startAngle = Math.PI / 2; // face down
        } else if (edge === 1) { // Bottom edge
          startX = Math.random() * cW;
          startY = cH + offset;
          startAngle = -Math.PI / 2; // face up
        } else if (edge === 2) { // Left edge
          startX = -offset;
          startY = Math.random() * cH;
          startAngle = 0; // face right
        } else { // Right edge
          startX = cW + offset;
          startY = Math.random() * cH;
          startAngle = Math.PI; // face left
        }

        head = { x: startX, y: startY };
        currentAngle = startAngle;
        
        // Populate initial trail straight back from start direction
        trail = [];
        for (let i = 0; i < currentSegments * spacing + 120; i++) {
          trail.push({ 
            x: head.x - Math.cos(currentAngle) * (i * (speed / spacing)), 
            y: head.y - Math.sin(currentAngle) * (i * (speed / spacing)) 
          });
        }

        isInitialized = true;
      }
    }, 2300);

    const spawnParticles = (x: number, y: number) => {
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 1.5 + Math.random() * 2.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel,
          color: Math.random() > 0.5 ? "#22c55e" : "#ef4444", // green or red crumbs
          life: 30 + Math.random() * 20
        });
      }
    };

    // Resize handler
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const oldW = canvas.width;
        const oldH = canvas.height;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Keep snake inside boundaries
        if (oldW > 0 && oldH > 0) {
          head.x = (head.x / oldW) * canvas.width;
          head.y = (head.y / oldH) * canvas.height;
          
          apples.forEach(ap => {
            ap.x = (ap.x / oldW) * canvas.width;
            ap.y = (ap.y / oldH) * canvas.height;
          });

          // Re-populate trail based on head
          trail = [];
          for (let i = 0; i < currentSegments * spacing + 120; i++) {
            trail.push({ x: head.x, y: head.y });
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);

    // Main animation loop
    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update apple pulsing
      apples.forEach(ap => {
        if (ap.active) {
          ap.pulse += 0.05;
        }
      });

      // 2. Draw Apples
      apples.forEach(ap => {
        if (!ap.active) return;

        ctx.save();
        const appleScale = 1.0 + Math.sin(ap.pulse) * 0.08;
        ctx.translate(ap.x, ap.y);
        ctx.scale(appleScale, appleScale);

        // Draw shadow
        ctx.beginPath();
        ctx.ellipse(0, 10, 10, 5, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fill();

        // Draw apple body (two overlapping lobes)
        ctx.beginPath();
        ctx.arc(-5, 0, 10, 0, Math.PI * 2);
        ctx.arc(5, 0, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444"; // red
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3.5;
        ctx.fill();
        ctx.stroke();

        // Clean up overlay stroke inside
        ctx.beginPath();
        ctx.arc(-5, 0, 8.5, 0, Math.PI * 2);
        ctx.arc(5, 0, 8.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();

        // Highlight
        ctx.beginPath();
        ctx.ellipse(-4, -4, 4, 2, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Stem (brown line)
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.quadraticCurveTo(3, -13, 5, -14);
        ctx.strokeStyle = "#78350f"; // brown
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.stroke();

        // Leaf (green leaf)
        ctx.beginPath();
        ctx.ellipse(4, -10, 4.5, 2.2, Math.PI / 6, 0, Math.PI * 2);
        ctx.fillStyle = "#22c55e"; // green
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      // Update and draw particles
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95; // friction
        p.vy *= 0.95;
        p.life--;

        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5 * (p.life / 50), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
          return true;
        }
        return false;
      });

      if (!isInitialized) {
        animId = requestAnimationFrame(animate);
        return;
      }

      // 1. Move Snake towards closest active Apple
      let targetX = canvas.width / 2;
      let targetY = canvas.height / 2;
      let closestApple: typeof apples[0] | null = null;
      let minDist = Infinity;

      for (const ap of apples) {
        if (ap.active) {
          const dx = head.x - ap.x;
          const dy = head.y - ap.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            closestApple = ap;
          }
        }
      }

      if (closestApple) {
        targetX = closestApple.x;
        targetY = closestApple.y;
      } else {
        // wander forward if no active apples
        targetX = head.x + Math.cos(currentAngle) * 100;
        targetY = head.y + Math.sin(currentAngle) * 100;
      }

      const targetAngle = Math.atan2(targetY - head.y, targetX - head.x);
      let angleDiff = targetAngle - currentAngle;
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

      currentAngle += Math.max(-maxTurnSpeed, Math.min(maxTurnSpeed, angleDiff));

      head.x += Math.cos(currentAngle) * speed;
      head.y += Math.sin(currentAngle) * speed;

      // Keep inside bounds (safeguard)
      head.x = Math.max(10, Math.min(canvas.width - 10, head.x));
      head.y = Math.max(10, Math.min(canvas.height - 10, head.y));

      // Add head to trail
      trail.unshift({ x: head.x, y: head.y });
      if (trail.length > currentSegments * spacing + 120) {
        trail.pop();
      }

      // Check collision with apples
      apples.forEach(ap => {
        if (!ap.active) return;

        const dx = head.x - ap.x;
        const dy = head.y - ap.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < headR + 10) {
          spawnParticles(ap.x, ap.y);
          ap.active = false;
          
          // Grow snake
          if (currentSegments < 32) {
            currentSegments++;
          }

          // Delay spawning a new apple (800ms delay)
          setTimeout(() => {
            if (!isInitialized) return; // safeguard if unmounted
            const pos = getNewApplePosition();
            ap.x = pos.x;
            ap.y = pos.y;
            ap.active = true;
          }, 800);
        }
      });

      // Draw Sand Trail behind the snake's tail
      const tailStart = currentSegments * spacing;
      const trailExtra = 110; // length of fading track

      for (let i = tailStart; i < Math.min(trail.length - 1, tailStart + trailExtra); i++) {
        const pt1 = trail[i];
        const pt2 = trail[i + 1];

        const age = i - tailStart;
        const opacityFactor = 1 - age / trailExtra;
        const opacity = 0.085 * opacityFactor;

        if (opacity <= 0) continue;

        // Calculate perpendicular offsets for parallel borders
        const angle = Math.atan2(pt2.y - pt1.y, pt2.x - pt1.x);
        const perpX = Math.cos(angle + Math.PI / 2);
        const perpY = Math.sin(angle + Math.PI / 2);
        const offset = 6.0; // distance from center line

        ctx.save();

        // 1. Draw central depressed shadow (thick, very soft black)
        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.7})`;
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.stroke();

        // 2. Draw left border line (slightly darker)
        ctx.beginPath();
        ctx.moveTo(pt1.x + perpX * offset, pt1.y + perpY * offset);
        ctx.lineTo(pt2.x + perpX * offset, pt2.y + perpY * offset);
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 1.3})`;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.stroke();

        // 3. Draw right border line (slightly darker)
        ctx.beginPath();
        ctx.moveTo(pt1.x - perpX * offset, pt1.y - perpY * offset);
        ctx.lineTo(pt2.x - perpX * offset, pt2.y - perpY * offset);
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 1.3})`;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.restore();
      }

      // 3. Draw Snake (tail to head)
      for (let i = currentSegments - 1; i >= 0; i--) {
        const trailIdx = i * spacing;
        const pt = trail[trailIdx] || head;
        const segmentR = i === 0 ? headR : r * (1 - (i / currentSegments) * 0.35);

        ctx.save();
        ctx.translate(pt.x, pt.y);

        // Draw shadow
        ctx.beginPath();
        ctx.arc(2, 4, segmentR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fill();

        // Draw segment circle
        ctx.beginPath();
        ctx.arc(0, 0, segmentR, 0, Math.PI * 2);
        ctx.fillStyle = "#22c55e"; // green body
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3.5;
        ctx.fill();
        ctx.stroke();

        // If head, draw eyes
        if (i === 0) {
          const eyeOffsetAngle = 0.55;
          const eyeDist = 8.5;
          
          const leftEyeX = Math.cos(currentAngle - eyeOffsetAngle) * eyeDist;
          const leftEyeY = Math.sin(currentAngle - eyeOffsetAngle) * eyeDist;
          const rightEyeX = Math.cos(currentAngle + eyeOffsetAngle) * eyeDist;
          const rightEyeY = Math.sin(currentAngle + eyeOffsetAngle) * eyeDist;

          // Draw left eye white
          ctx.beginPath();
          ctx.arc(leftEyeX, leftEyeY, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();

          // Draw right eye white
          ctx.beginPath();
          ctx.arc(rightEyeX, rightEyeY, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.fill();
          ctx.stroke();

          // Pupils (black) offset toward target direction
          const pupilXOffset = Math.cos(currentAngle) * 1.0;
          const pupilYOffset = Math.sin(currentAngle) * 1.0;

          ctx.beginPath();
          ctx.arc(leftEyeX + pupilXOffset, leftEyeY + pupilYOffset, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#000000";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(rightEyeX + pupilXOffset, rightEyeY + pupilYOffset, 2, 0, Math.PI * 2);
          ctx.fillStyle = "#000000";
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isInitialized = false;
      clearTimeout(applesTimer);
      clearTimeout(snakeTimer);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mounted]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 border-b-8 border-black bg-neo-yellow"
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Snake background canvas */}
      <canvas ref={snakeCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Floating Neobrutalist Shapes (Draggable) */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="pointer-events-auto">
          <DraggableShape
            initialClass="top-16 left-5 md:top-1/3 md:left-1/4"
            colorClass="bg-neo-pink"
            sizeClass="w-16 h-16 md:w-32 md:h-32"
            rotateClass="hover:rotate-12"
          />
          <DraggableShape
            initialClass="bottom-10 right-5 md:bottom-1/3 md:right-1/4"
            colorClass="bg-neo-blue"
            sizeClass="w-20 h-20 md:w-40 md:h-40"
            rotateClass="hover:-rotate-12"
            animationDelay="1.0s"
          />
          <DraggableShape
            initialClass="top-20 right-5 md:top-1/2 md:left-1/2"
            colorClass="bg-neo-green"
            sizeClass="w-14 h-14 md:w-24 md:h-24"
            rotateClass="hover:rotate-45"
            animationDelay="2.0s"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-30 text-center select-none">
        <p className="text-lg sm:text-xl md:text-2xl font-black mb-4 text-black uppercase tracking-widest animate-slide-in">
          {translate(lang, "hero-greeting")}
        </p>

        <h1 className="text-3xl sm:text-6xl md:text-8xl font-black mb-6 text-black uppercase tracking-tighter">
          <div className="relative inline-block animate-slide-down-rope">
            <span className="bg-white px-6 py-3 border-4 border-black shadow-neo-xl inline-block transform -rotate-2 hover:rotate-2 transition-transform duration-300 cursor-default relative">
              {/* Visual suspended cords hanging from above on desktop */}
              <div className="absolute top-0 left-8 w-1 h-[1000px] bg-black -translate-y-full -z-10 hidden md:block"></div>
              <div className="absolute top-0 right-8 w-1 h-[1000px] bg-black -translate-y-full -z-10 hidden md:block"></div>
              {/* Bolts */}
              <div className="absolute top-1 left-7 w-3 h-3 bg-black rounded-full hidden md:block"></div>
              <div className="absolute top-1 right-7 w-3 h-3 bg-black rounded-full hidden md:block"></div>
              Farrel Diego Akbar
            </span>
          </div>
        </h1>

        <h2 className="text-xl sm:text-3xl md:text-4xl font-black mt-6 sm:mt-8 mb-8 text-black animate-slide-up bg-neo-pink text-white inline-block px-4 py-2 border-4 border-black shadow-neo transform rotate-1 hover:-rotate-1 transition-transform duration-300 cursor-default">
          <span className={`inline-block pr-1 ${isTyping ? "border-r-2 border-white animate-pulse" : ""}`}>
            {typedTitle || (lang === "id" ? "Programmer & Pengembang" : "Programmer & Developer")}
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 animate-slide-up">
          <a
            href="#projects"
            className="neo-btn px-8 py-4 text-sm sm:text-lg uppercase tracking-bold bg-neo-blue text-white w-full sm:w-auto text-center"
          >
            {translate(lang, "hero-view-work")}
          </a>
          <a
            href="https://wa.me/6282155235200?text=Halo%20Ayo%20Mutualan"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn px-8 py-4 text-sm sm:text-lg uppercase tracking-bold bg-neo-green text-black w-full sm:w-auto text-center"
          >
            <i className="fab fa-whatsapp mr-2 text-xl"></i>
            <span>{translate(lang, "hero-whatsapp")}</span>
          </a>
          <div className="flex gap-4">
            <a
              href="https://github.com/farrel-codenoob29"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-14 h-14 bg-neo-purple flex items-center justify-center text-white"
              title="GitHub"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a
              href="https://www.instagram.com/religoo_29/"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-14 h-14 bg-neo-pink flex items-center justify-center text-white"
              title="Instagram"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <a href="#about" className="text-black hover:text-neo-pink transition-colors">
          <i className="fas fa-chevron-down text-4xl"></i>
        </a>
      </div>
    </section>
  );
}
