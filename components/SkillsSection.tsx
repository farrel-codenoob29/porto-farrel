import React, { useState, useEffect, useRef } from "react";
import { Lang, translate, TranslationKey } from "@/components/translations";

interface SkillsSectionProps {
  lang: Lang;
}

interface VendingItem {
  id: string;
  label: string;
  category: "frontend" | "backend" | "devops";
  bg: string;
  textWhite?: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  angle: number;
  vAngle: number;
  isDragging?: boolean;
  isPopping?: boolean;
}

const renderNodeIcon = (id: string) => {
  switch (id) {
    case "php":
      return <img src="https://cdn.simpleicons.org/php/ffffff" alt="PHP" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "dart":
      return <img src="https://cdn.simpleicons.org/dart/ffffff" alt="Dart" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "python":
      return <img src="https://cdn.simpleicons.org/python/ffffff" alt="Python" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "csharp":
      return <img src="/img/csharp.png" alt="C#" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "javascript":
      return <img src="https://cdn.simpleicons.org/javascript/000000" alt="JavaScript" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "typescript":
      return <img src="https://cdn.simpleicons.org/typescript/ffffff" alt="TypeScript" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "go":
      return <img src="https://cdn.simpleicons.org/go/ffffff" alt="Go" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "laravel":
      return <img src="https://cdn.simpleicons.org/laravel/ffffff" alt="Laravel" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "flutter":
      return <img src="https://cdn.simpleicons.org/flutter/ffffff" alt="Flutter" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "react":
      return <img src="https://cdn.simpleicons.org/react/000000" alt="React" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "nextdotjs":
      return <img src="/img/nextjs.png" alt="Next.js" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "gin":
      return <img src="/img/gin.png" alt="Gin" className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0" />;
    case "mysql":
      return <img src="https://cdn.simpleicons.org/mysql/ffffff" alt="MySQL" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "microsoftsqlserver":
      return <img src="/img/sqlserver.png" alt="SQL Server" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "firebase":
      return <img src="https://cdn.simpleicons.org/firebase/000000" alt="Firebase" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "postgresql":
      return <img src="https://cdn.simpleicons.org/postgresql/ffffff" alt="PostgreSQL" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "rest":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0 text-white">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "soap":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0 text-white">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M8 13h8M8 17h8" />
        </svg>
      );
    case "graphql":
      return <img src="https://cdn.simpleicons.org/graphql/ffffff" alt="GraphQL" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "websockets":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0 text-white">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
    case "jenkins":
      return <img src="https://cdn.simpleicons.org/jenkins/ffffff" alt="Jenkins" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "grafana":
      return <img src="https://cdn.simpleicons.org/grafana/000000" alt="Grafana" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "prometheus":
      return <img src="https://cdn.simpleicons.org/prometheus/ffffff" alt="Prometheus" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "proxmox":
      return <img src="https://cdn.simpleicons.org/proxmox/ffffff" alt="Proxmox" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "postman":
      return <img src="https://cdn.simpleicons.org/postman/ffffff" alt="Postman" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "figma":
      return <img src="https://cdn.simpleicons.org/figma/ffffff" alt="Figma" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    case "canva":
      return <img src="/img/canva.png" alt="Canva" className="w-5 h-5 sm:w-6 sm:h-6 object-contain flex-shrink-0" />;
    default:
      return null;
  }
};

export const SkillsSection = ({ lang }: SkillsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragNodeIdRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [dragNodeId, setDragNodeId] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<"frontend" | "backend" | "devops" | null>(null);

  const vendingItemsRef = useRef<VendingItem[]>([]);
  const [vendingItemsState, setVendingItemsState] = useState<VendingItem[]>([]);

  const t = (key: TranslationKey) => translate(lang, key);

  const spawnItems = (category: "frontend" | "backend" | "devops") => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth;

    const techData: { [key: string]: { label: string; icon: string; bg: string; textWhite?: boolean }[] } = {
      frontend: [
        { label: "JavaScript", icon: "javascript", bg: "#F7DF1E" },
        { label: "TypeScript", icon: "typescript", bg: "#3178C6", textWhite: true },
        { label: "Dart", icon: "dart", bg: "#0175C2", textWhite: true },
        { label: "React", icon: "react", bg: "#61DAFB" },
        { label: "Next JS", icon: "nextdotjs", bg: "#000000", textWhite: true },
        { label: "Flutter", icon: "flutter", bg: "#02569B", textWhite: true },
        { label: "Figma", icon: "figma", bg: "#F24E1E", textWhite: true },
        { label: "Canva", icon: "canva", bg: "#FFFFFF", textWhite: false },
      ],
      backend: [
        { label: "PHP", icon: "php", bg: "#777BB4", textWhite: true },
        { label: "Python", icon: "python", bg: "#3776AB", textWhite: true },
        { label: "C#", icon: "csharp", bg: "#512BD4", textWhite: true },
        { label: "Go", icon: "go", bg: "#00ADD8", textWhite: true },
        { label: "Laravel", icon: "laravel", bg: "#FF2D20", textWhite: true },
        { label: "Gin", icon: "gin", bg: "#FFFFFF", textWhite: false },
        { label: "MySQL", icon: "mysql", bg: "#4479A1", textWhite: true },
        { label: "SQL Server", icon: "microsoftsqlserver", bg: "#FFFFFF", textWhite: false },
        { label: "Firebase", icon: "firebase", bg: "#FFCA28" },
        { label: "PostgreSQL", icon: "postgresql", bg: "#4169E1", textWhite: true },
      ],
      devops: [
        { label: "REST API", icon: "rest", bg: "#009688", textWhite: true },
        { label: "SOAP API", icon: "soap", bg: "#FF5722", textWhite: true },
        { label: "GraphQL", icon: "graphql", bg: "#E10098", textWhite: true },
        { label: "WebSockets", icon: "websockets", bg: "#010101", textWhite: true },
        { label: "Jenkins", icon: "jenkins", bg: "#D24939", textWhite: true },
        { label: "Grafana", icon: "grafana", bg: "#FADE2A" },
        { label: "Prometheus", icon: "prometheus", bg: "#E6522C", textWhite: true },
        { label: "Proxmox", icon: "proxmox", bg: "#E57000", textWhite: true },
        { label: "Postman", icon: "postman", bg: "#FF6C37", textWhite: true },
      ],
    };

    const itemsToSpawn = techData[category];
    const isMobile = width < 768;
    const size = isMobile ? 44 : 54;

    const spawned: VendingItem[] = itemsToSpawn.map((item, idx) => {
      return {
        id: `${item.icon}-${Date.now()}-${idx}-${Math.random()}`,
        label: item.label,
        category,
        bg: item.bg,
        textWhite: item.textWhite,
        x: width / 2 - 80 + idx * 40 + (Math.random() - 0.5) * 15,
        y: -60 - idx * 40,
        vx: (Math.random() - 0.5) * 5,
        vy: 3 + Math.random() * 3,
        width: size,
        height: size,
        angle: (Math.random() - 0.5) * 45,
        vAngle: (Math.random() - 0.5) * 6,
      };
    });

    const currentItems = [...vendingItemsRef.current, ...spawned];
    if (currentItems.length > 30) {
      currentItems.splice(0, currentItems.length - 30);
    }

    vendingItemsRef.current = currentItems;
    setVendingItemsState(currentItems);
  };

  const updatePhysics = () => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const items = vendingItemsRef.current;
    const gravity = 0.45;
    const damping = 0.99;
    const restitution = 0.55;
    const collisionRepulsion = 0.4;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.isDragging) continue;

      if (item.isPopping) {
        item.vy = -1.5;
        item.vx = 0;
        item.x += item.vx;
        item.y += item.vy;
        item.angle = 0;
        item.vAngle = 0;
        continue;
      }

      item.vy += gravity;
      item.vx *= damping;
      item.vy *= damping;

      item.x += item.vx;
      item.y += item.vy;

      item.angle += item.vAngle;
      item.vAngle *= 0.96;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.isDragging || item.isPopping) continue;

      const halfW = item.width / 2;
      const halfH = item.height / 2;

      if (item.y > height - halfH) {
        item.y = height - halfH;
        item.vy = -item.vy * restitution;
        item.vx *= 0.75;
        item.vAngle = -item.vx * 0.1;
        if (Math.abs(item.vy) < 1.0) item.vy = 0;
      }

      if (item.x < halfW) {
        item.x = halfW;
        item.vx = -item.vx * restitution;
        item.vAngle = item.vy * 0.1;
      }

      if (item.x > width - halfW) {
        item.x = width - halfW;
        item.vx = -item.vx * restitution;
        item.vAngle = -item.vy * 0.1;
      }

      if (item.y < -150) {
        item.y = -150;
        item.vy = 0;
      }
    }

    for (let i = 0; i < items.length; i++) {
      const itemA = items[i];
      if (itemA.isDragging || itemA.isPopping) continue;

      for (let j = i + 1; j < items.length; j++) {
        const itemB = items[j];
        if (itemB.isDragging || itemB.isPopping) continue;

        const dx = itemB.x - itemA.x;
        const dy = itemB.y - itemA.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;

        const radiusA = Math.max(itemA.width, itemA.height) / 2;
        const radiusB = Math.max(itemB.width, itemB.height) / 2;
        const minDistance = radiusA + radiusB;

        if (dist < minDistance) {
          const overlap = minDistance - dist;
          const pushX = (dx / dist) * overlap * 0.5;
          const pushY = (dy / dist) * overlap * 0.5;

          if (!itemA.isDragging) {
            itemA.x -= pushX;
            itemA.y -= pushY;
            itemA.vx -= pushX * collisionRepulsion;
            itemA.vy -= pushY * collisionRepulsion;
            itemA.vAngle += (Math.random() - 0.5) * 1.5;
          }
          if (!itemB.isDragging) {
            itemB.x += pushX;
            itemB.y += pushY;
            itemB.vx += pushX * collisionRepulsion;
            itemB.vy += pushY * collisionRepulsion;
            itemB.vAngle += (Math.random() - 0.5) * 1.5;
          }
        }
      }
    }

    setVendingItemsState([...items]);
  };

  const handleStart = (itemId: string, clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const item = vendingItemsRef.current.find((it) => it.id === itemId);
    if (!item) return;

    dragNodeIdRef.current = itemId;
    setDragNodeId(itemId);
    item.isDragging = true;
    item.angle = 0;
    item.vAngle = 0;

    dragOffsetRef.current = {
      x: x - item.x,
      y: y - item.y,
    };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!dragNodeIdRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const item = vendingItemsRef.current.find((it) => it.id === dragNodeIdRef.current);
    if (!item) return;

    const targetX = x - dragOffsetRef.current.x;
    const targetY = y - dragOffsetRef.current.y;

    item.vx = (targetX - item.x) * 0.4;
    item.vy = (targetY - item.y) * 0.4;

    item.x = targetX;
    item.y = targetY;
    item.angle = 0;
    item.vAngle = 0;
  };

  const handleEnd = () => {
    if (!dragNodeIdRef.current) return;
    const item = vendingItemsRef.current.find((it) => it.id === dragNodeIdRef.current);
    if (item) {
      item.isDragging = false;
      item.angle = 0;
      item.vAngle = 0;
    }
    dragNodeIdRef.current = null;
    setDragNodeId(null);
  };

  useEffect(() => {
    if (!dragNodeId) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (e.cancelable) e.preventDefault();
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onMouseUp = () => {
      handleEnd();
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragNodeId]);

  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      updatePhysics();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="skills" className="py-20 bg-white overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-12 text-center uppercase tracking-tighter reveal reveal-up">
          <span className="bg-neo-green text-black px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform rotate-1 hover:-rotate-1 transition-transform duration-300 cursor-default">
            {t("nav-skills")}
          </span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-4 reveal reveal-up select-none">
        <div className="bg-[#8338EC] border-[6px] border-black shadow-neo-xl p-4 sm:p-6 relative rounded-none flex flex-col items-stretch select-none">
          <div className="bg-black text-white font-mono border-b-4 border-black p-3 mb-4 select-none text-center">
            <div className="text-lg sm:text-2xl font-black tracking-widest animate-pulse">👾 Farrel&apos;s Tech Stack 👾</div>
            <div className="text-[9px] sm:text-xs text-neo-green font-bold tracking-wider mt-1 uppercase">
              {lang === "id" ? "MASUKKAN KOIN & TEKAN TOMBOL UNTUK MENGAMBIL SKILL!" : "INSERT COIN & PRESS BUTTON TO COLLECT SKILLS"}
            </div>
          </div>

          <div
            ref={containerRef}
            className="w-full h-[360px] sm:h-[450px] border-4 border-black bg-zinc-900 relative overflow-hidden shadow-inner select-none mb-6"
            style={{
              backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.35) 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px"
            }}
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/20 z-30" />
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-30" />

            {vendingItemsState.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-zinc-500 font-mono select-none">
                <i className="fas fa-coins text-4xl sm:text-5xl text-neo-yellow/30 mb-3 animate-bounce"></i>
                <div className="text-sm font-black uppercase tracking-wider text-zinc-400">
                  {lang === "id" ? "Mesin Kosong" : "Machine is Empty"}
                </div>
                <div className="text-[10px] text-zinc-500 mt-1 uppercase leading-relaxed max-w-[280px]">
                  {lang === "id" ? "Tekan tombol di bawah untuk menjatuhkan kapsul keahlian!" : "Press any button below to drop skill capsules!"}
                </div>
              </div>
            )}

            {vendingItemsState.map((item) => (
              <div
                key={item.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleStart(item.id, e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  handleStart(item.id, e.touches[0].clientX, e.touches[0].clientY);
                }}
                style={{
                  left: `${item.x - item.width / 2}px`,
                  top: `${item.y - item.height / 2}px`,
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  transform: `rotate(${dragNodeId === item.id ? 0 : item.angle}deg)`,
                  backgroundColor: item.bg,
                  zIndex: dragNodeId === item.id ? 40 : 20,
                }}
                className={`absolute rounded-full border-4 border-black flex items-center justify-center font-mono font-black select-none cursor-grab active:cursor-grabbing text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-transform duration-75 group ${
                  item.isPopping ? "animate-pop-out pointer-events-none" : ""
                }`}
              >
                {renderNodeIcon(item.id.split("-")[0])}

                <div className={`absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200 z-50 flex flex-col items-center ${
                  dragNodeId === item.id 
                    ? "opacity-100 translate-y-0 scale-105" 
                    : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1"
                }`}>
                  <div className="bg-black text-white text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                    {item.label}
                  </div>
                  <div className="w-2.5 h-2.5 bg-black border-r-2 border-b-2 border-black transform rotate-45 -mt-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-800 border-4 border-black p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-zinc-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-center mb-3 font-bold select-none">
              Control Panel - Drop Categories
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <button
                onClick={() => {
                  setActiveButton("frontend");
                  spawnItems("frontend");
                  setTimeout(() => setActiveButton(null), 150);
                }}
                className={`neo-btn py-3 bg-neo-yellow text-black border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                  activeButton === "frontend" ? "translate-x-[1px] translate-y-[1px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" : ""
                }`}
              >
                Frontend & Design
              </button>

              <button
                onClick={() => {
                  setActiveButton("backend");
                  spawnItems("backend");
                  setTimeout(() => setActiveButton(null), 150);
                }}
                className={`neo-btn py-3 bg-neo-blue text-white border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                  activeButton === "backend" ? "translate-x-[1px] translate-y-[1px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" : ""
                }`}
              >
                Backend & Database
              </button>

              <button
                onClick={() => {
                  setActiveButton("devops");
                  spawnItems("devops");
                  setTimeout(() => setActiveButton(null), 150);
                }}
                className={`neo-btn py-3 bg-neo-green text-black border-2 border-black font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                  activeButton === "devops" ? "translate-x-[1px] translate-y-[1px] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" : ""
                }`}
              >
                DevOps & API
              </button>
            </div>
          </div>

          <div className="flex justify-between items-stretch gap-6 h-20">
            <div className="flex-1 bg-zinc-950 border-4 border-black shadow-inner relative flex items-center justify-center">
              <div className="w-4/5 h-[80%] bg-zinc-900 border-2 border-zinc-800 rounded-sm flex items-center justify-center text-[9px] font-mono text-zinc-600 font-bold select-none uppercase">
                Prize Slot
              </div>
              {vendingItemsState.length > 0 && (
                <button
                  onClick={() => {
                    if (vendingItemsRef.current.some(it => it.isPopping)) return;
                    
                    vendingItemsRef.current = vendingItemsRef.current.map((item) => ({
                      ...item,
                      isPopping: true,
                    }));
                    setVendingItemsState([...vendingItemsRef.current]);

                    setTimeout(() => {
                      vendingItemsRef.current = [];
                      setVendingItemsState([]);
                    }, 350);
                  }}
                  className="absolute inset-0 bg-neo-green text-black border-2 border-black font-mono font-black text-[9px] sm:text-xs uppercase tracking-widest flex items-center justify-center hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
                >
                  ♻️ {lang === "id" ? "AMBIL / BERSIHKAN" : "GRAB / CLEAR ALL"}
                </button>
              )}
            </div>

            <div className="w-24 bg-zinc-900 border-4 border-black flex flex-col justify-around items-center p-1.5 shadow-md">
              <div className="w-10 h-2 bg-black border border-zinc-700 rounded-sm animate-pulse" />
              <span className="text-[7px] text-zinc-500 font-mono font-bold tracking-widest select-none uppercase">COIN ENTRY</span>
              <div className="w-6 h-6 bg-zinc-950 border-2 border-black rounded-full flex items-center justify-center text-[8px] font-mono text-neo-orange font-black select-none">
                $
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
