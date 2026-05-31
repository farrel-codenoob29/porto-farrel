import React, { useState, useEffect, useRef } from "react";
import { SafeImage } from "@/components/SafeImage";
import { Lang, translate, TranslationKey } from "@/components/translations";

interface CertificatesSectionProps {
  lang: Lang;
}

interface PodiumConfetti {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotate: number;
  vRotate: number;
  isRound: boolean;
  opacity: number;
}

const certificates = [
  {
    id: 1,
    title: "Sertifikat Juara 1 Tingkat Kota",
    org: "Lomba Kompetensi Siswa Bidang IT Software Solution For Business",
    year: "2024",
    image: "/img/certificates/lks1.png",
    desc: "Sertifikat ini diberikan kepada saya dikarenakan saya berhasil menjuarai Lomba Kompetensi Siswa (LKS) yang diselenggarakan setiap tahun oleh pemerintah dan saya berhasil meraih juara 1 bidang IT Software Solution For Business tingkat kota Balikpapan di tahun 2024 saat saya masih duduk di kelas 10 SMK.",
  },
  {
    id: 5,
    title: "Sertifikat Juara Harapan 3",
    org: "Axioo UpYourAiSkill",
    year: "2024",
    image: "/img/certificates/harapan3.png",
    desc: "Sertifikat ini diberikan dikarenakan saya berhasil meraih predikit juara harapan 3 dari 10 finalis di kota jakarta karena telah membuat inovasi program berteknologi AI",
  },
  {
    id: 6,
    title: "Sertifikat Juara 2 Tingkat Kota",
    org: "Lomba Kompetensi Siswa Bidang IT Software Solution For Business",
    year: "2025",
    image: "/img/certificates/lks2.png",
    desc: "Sertifikat ini diberikan kepada saya dikarenakan saya berhasil menjuarai Lomba Kompetensi Siswa (LKS) yang diselenggarakan setiap tahun oleh pemerintah dan saya berhasil meraih juara 2 bidang IT Software Solution For Business tingkat kota Balikpapan di tahun 2025 saat saya masih duduk di kelas 11 SMK.",
  },
];

export const CertificatesSection = ({ lang }: CertificatesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [hoveredPodium, setHoveredPodium] = useState<number | null>(null);
  const [certificatesScrollOffset, setCertificatesScrollOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const [podiumRevealStage, setPodiumRevealStage] = useState<"curtain" | "revealing" | "reveal3" | "reveal2" | "reveal1">("curtain");
  const [isSpotlightOverlayFaded, setIsSpotlightOverlayFaded] = useState(false);
  const [podiumConfetti, setPodiumConfetti] = useState<PodiumConfetti[]>([]);

  const t = (key: TranslationKey) => translate(lang, key);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const timer = setTimeout(() => {
      handleResize();
    }, 0);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleParallaxScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const diff = sectionCenter - viewportCenter;
        const clamped = Math.max(-400, Math.min(400, diff));
        setCertificatesScrollOffset(clamped);
      }
    };

    window.addEventListener("scroll", handleParallaxScroll, { passive: true });
    handleParallaxScroll();

    return () => {
      window.removeEventListener("scroll", handleParallaxScroll);
    };
  }, []);

  const spawnConfetti = (centerXPercent: number, centerYPercent: number, count: number) => {
    const colors = ["#FFD600", "#FF006E", "#3A86FF", "#00FF66", "#FB5607", "#8338EC"];
    const newParticles: PodiumConfetti[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.0 + Math.random() * 3.5;
      newParticles.push({
        id: Math.random() + Date.now() + i,
        x: centerXPercent,
        y: centerYPercent,
        vx: Math.cos(angle) * speed * 0.6,
        vy: (Math.sin(angle) * speed - 2.0) * 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 10,
        rotate: Math.random() * 360,
        vRotate: (Math.random() - 0.5) * 8,
        isRound: Math.random() > 0.4,
        opacity: 1.0,
      });
    }
    setPodiumConfetti(prev => [...prev, ...newParticles]);
  };

  const startPodiumReveal = () => {
    setPodiumConfetti([]);
    setIsSpotlightOverlayFaded(false);
    setPodiumRevealStage("revealing");
    
    setTimeout(() => {
      setPodiumRevealStage("reveal3");
    }, 1800);

    setTimeout(() => {
      setPodiumRevealStage("reveal2");
    }, 3600);

    setTimeout(() => {
      setPodiumRevealStage("reveal1");
      spawnConfetti(50, 45, 260);
      setTimeout(() => spawnConfetti(25, 60, 80), 300);
      setTimeout(() => spawnConfetti(75, 60, 80), 600);
    }, 5600);

    setTimeout(() => {
      setIsSpotlightOverlayFaded(true);
    }, 7600);
  };

  useEffect(() => {
    if (podiumConfetti.length === 0) return;
    let animFrame: number;
    const updateConfetti = () => {
      setPodiumConfetti(prev => {
        const updated = prev.map(p => {
          const nextVy = p.vy * 0.95 + 0.025;
          const nextVx = p.vx * 0.95;
          const sway = Math.sin((p.id % 50) + (p.y * 0.15)) * 0.12;

          return {
            ...p,
            x: p.x + nextVx + sway,
            y: p.y + nextVy,
            vx: nextVx,
            vy: nextVy,
            rotate: p.rotate + p.vRotate,
            opacity: p.opacity - 0.005,
          };
        }).filter(p => p.opacity > 0 && p.y < 120 && p.x > -20 && p.x < 120);
        
        if (updated.length > 0) {
          animFrame = requestAnimationFrame(updateConfetti);
        }
        return updated;
      });
    };
    animFrame = requestAnimationFrame(updateConfetti);
    return () => cancelAnimationFrame(animFrame);
  }, [podiumConfetti.length]);

  return (
    <section ref={sectionRef} id="certificates" className="py-20 sm:py-32 bg-neo-yellow border-y-8 border-black scroll-mt-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-16 text-center uppercase tracking-tighter reveal reveal-up">
          <span className="bg-white text-black px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform -rotate-1 hover:rotate-1 transition-transform duration-300 cursor-default">
            {t("nav-certificates")}
          </span>
        </h2>

        {/* Grand Neobrutalist Stage Box */}
        <div className="relative overflow-hidden border-8 border-black bg-white/20 shadow-neo-xl max-w-5xl mx-auto py-12 px-4 select-none rounded-none min-h-[450px] flex flex-col justify-center">
          
          {/* Confetti Overlay */}
          {podiumConfetti.map(p => (
            <div
              key={p.id}
              className="absolute pointer-events-none border-2 border-black"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                transform: `translate3d(-50%, -50%, 0) rotate(${p.rotate}deg)`,
                borderRadius: p.isRound ? "50%" : "0px",
                opacity: p.opacity,
                willChange: "transform, opacity",
                zIndex: 25,
              }}
            />
          ))}

          {/* Dynamic Circular Spotlight Follow Darkness Overlay */}
          {(() => {
            const isMobileSpotlight = windowWidth < 768;
            let circularSpotlightX = "50%";
            let circularSpotlightY = "50%";
            if (isMobileSpotlight) {
              if (podiumRevealStage === "reveal3" || podiumRevealStage === "revealing") {
                circularSpotlightX = "50%";
                circularSpotlightY = "76%";
              } else if (podiumRevealStage === "reveal2") {
                circularSpotlightX = "50%";
                circularSpotlightY = "20%";
              } else if (podiumRevealStage === "reveal1") {
                circularSpotlightX = "50%";
                circularSpotlightY = "47%";
              }
            } else {
              if (podiumRevealStage === "reveal3" || podiumRevealStage === "revealing") {
                circularSpotlightX = "78%";
                circularSpotlightY = "45%";
              } else if (podiumRevealStage === "reveal2") {
                circularSpotlightX = "22%";
                circularSpotlightY = "42%";
              } else if (podiumRevealStage === "reveal1") {
                circularSpotlightX = "50%";
                circularSpotlightY = "32%";
              }
            }
            let spotlightRadius = isMobileSpotlight ? "110px" : "150px";
            if (podiumRevealStage === "reveal1") {
              spotlightRadius = isMobileSpotlight ? "140px" : "210px";
            }
            const showCircularSpotlight = podiumRevealStage === "revealing" || podiumRevealStage === "reveal3" || podiumRevealStage === "reveal2" || podiumRevealStage === "reveal1";

            return showCircularSpotlight ? (
              <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none">
                <defs>
                  <filter id="spotlight-blur">
                    <feGaussianBlur stdDeviation="22" />
                  </filter>
                  <mask id="spotlight-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <circle 
                      cx={circularSpotlightX} 
                      cy={circularSpotlightY} 
                      r={spotlightRadius} 
                      fill="black" 
                      filter="url(#spotlight-blur)"
                      style={{
                        transition: "cx 700ms cubic-bezier(0.25, 1, 0.5, 1), cy 700ms cubic-bezier(0.25, 1, 0.5, 1), r 700ms cubic-bezier(0.25, 1, 0.5, 1)"
                      }}
                    />
                  </mask>
                </defs>
                <rect 
                  width="100%" 
                  height="100%" 
                  fill="rgba(0, 0, 0, 0.75)" 
                  mask="url(#spotlight-mask)"
                  className={`transition-opacity duration-1000 ${
                    isSpotlightOverlayFaded ? "opacity-0" : "opacity-100"
                  }`}
                />
              </svg>
            ) : null;
          })()}

          {/* Spotlight Beam for 1st Place */}
          {podiumRevealStage === "reveal1" && (
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[550px] md:h-[700px] bg-gradient-to-b from-neo-yellow/40 to-transparent pointer-events-none z-20 origin-top animate-spotlight-sweep"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                mixBlendMode: "screen",
              }}
            />
          )}

          {/* Curtains Overlay */}
          {(podiumRevealStage === "curtain" || podiumRevealStage === "revealing") && (
            <div className="absolute inset-0 z-30 flex items-center justify-center overflow-hidden bg-black/40">
              {/* Left Curtain */}
              <div 
                className="absolute top-0 left-0 bottom-0 w-1/2 bg-neo-purple border-r-4 border-black transition-transform duration-1500 ease-in-out flex flex-col justify-between p-8"
                style={{
                  transform: podiumRevealStage === "revealing" ? "translateX(-100%)" : "translateX(0)"
                }}
              >
                <div className="text-6xl sm:text-8xl font-black text-white/10 select-none transform -rotate-45 leading-none">WINNER</div>
                <div className="text-6xl sm:text-8xl font-black text-white/10 select-none transform rotate-12 self-end leading-none">FARREL</div>
              </div>
              
              {/* Right Curtain */}
              <div 
                className="absolute top-0 right-0 bottom-0 w-1/2 bg-neo-pink border-l-4 border-black transition-transform duration-1500 ease-in-out flex flex-col justify-between p-8"
                style={{
                  transform: podiumRevealStage === "revealing" ? "translateX(100%)" : "translateX(0)"
                }}
              >
                <div className="text-6xl sm:text-8xl font-black text-white/10 select-none transform rotate-45 leading-none">AWARD</div>
                <div className="text-6xl sm:text-8xl font-black text-white/10 select-none transform -rotate-12 self-start leading-none">CHAMPION</div>
              </div>

              {/* Start Reveal Card */}
              {podiumRevealStage === "curtain" && (
                <div className="relative z-10 bg-white border-4 border-black shadow-neo-xl p-6 sm:p-8 max-w-md mx-4 text-center transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                  <div className="w-16 h-16 bg-neo-yellow border-4 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-neo">
                    <i className="fas fa-trophy text-2xl text-black animate-bounce-slow"></i>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-black mb-2 uppercase">
                    {lang === "id" ? "PENGHARGAAN" : "AWARDS & HONORS"}
                  </h3>
                  <p className="text-zinc-600 font-bold text-xs sm:text-sm mb-6 max-w-xs mx-auto">
                    {lang === "id" 
                      ? "Buka tirai untuk melihat podium sertifikat prestasi Farrel Diego Akbar secara interaktif!" 
                      : "Reveal Farrel Diego Akbar's achievement certificates interactively!"}
                  </p>
                  <button 
                    onClick={startPodiumReveal}
                    className="neo-btn w-full py-3 bg-neo-yellow text-black uppercase tracking-widest text-xs sm:text-sm font-black"
                  >
                    {lang === "id" ? "MULAI REVEAL" : "START REVEAL"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Cards Stage Layout */}
          <div 
            className="flex flex-col md:flex-row justify-center items-center md:items-end gap-12 md:gap-4 w-full px-4 select-none relative z-10"
            onMouseLeave={() => setHoveredPodium(null)}
          >
            {certificates.map((cert, idx) => {
              const activePodiumIndex = hoveredPodium !== null ? hoveredPodium : 1;
              const isActive = activePodiumIndex === idx;
              const isMobile = windowWidth < 768;
              
              let pedestalHeight = "";
              let pedestalBg = "";
              let pedestalLabel = "";
              let shadowClass = "";
              
              if (idx === 0) {
                pedestalHeight = "h-16";
                pedestalBg = "bg-neo-blue text-white";
                pedestalLabel = "2nd";
                shadowClass = isActive ? "shadow-neo-xl" : "shadow-neo";
              } else if (idx === 1) {
                pedestalHeight = "h-24";
                pedestalBg = "bg-neo-yellow text-black";
                pedestalLabel = "1st";
                shadowClass = isActive ? "shadow-neo-xl" : "shadow-neo";
              } else {
                pedestalHeight = "h-10";
                pedestalBg = "bg-neo-pink text-white";
                pedestalLabel = "3rd";
                shadowClass = isActive ? "shadow-neo-xl" : "shadow-neo";
              }

              const parallaxSpeed = idx === 0 ? 0.04 : idx === 1 ? 0.08 : 0.02;
              const parallaxY = certificatesScrollOffset * parallaxSpeed;
              
              const hoverY = isActive ? (isMobile ? -16 : -24) : 0;
              const hoverX = isActive ? (idx === 0 ? 8 : idx === 2 ? -8 : 0) : 0;
              const activeScale = isActive ? (isMobile ? 1.05 : 1.1) : (isMobile ? 0.95 : 0.88);
              const totalY = hoverY + parallaxY;

              const isRevealed = 
                (idx === 2 && (podiumRevealStage === "reveal3" || podiumRevealStage === "reveal2" || podiumRevealStage === "reveal1")) ||
                (idx === 0 && (podiumRevealStage === "reveal2" || podiumRevealStage === "reveal1")) ||
                (idx === 1 && (podiumRevealStage === "reveal1"));

              let shakeClass = "";
              if (idx === 1) {
                if (podiumRevealStage === "reveal2") {
                  shakeClass = "animate-shake-hard";
                } else if (podiumRevealStage === "reveal3") {
                  shakeClass = "animate-shake-medium";
                } else if (podiumRevealStage === "revealing") {
                  shakeClass = "animate-shake-soft";
                }
              } else if (idx === 0) {
                if (podiumRevealStage === "reveal3") {
                  shakeClass = "animate-shake-medium";
                } else if (podiumRevealStage === "revealing") {
                  shakeClass = "animate-shake-soft";
                }
              } else if (idx === 2) {
                if (podiumRevealStage === "revealing") {
                  shakeClass = "animate-shake-soft";
                }
              }

              return (
                <div 
                  key={cert.id}
                  className={`w-full max-w-[280px] md:w-1/3 flex flex-col items-center justify-end group/col reveal ${
                    idx === 0 ? "reveal-left" : idx === 1 ? "reveal-up" : "reveal-right"
                  }`}
                  style={{ 
                    transitionDelay: idx === 0 ? "150ms" : idx === 1 ? "0ms" : "300ms",
                    willChange: "transform, opacity"
                  }}
                  onMouseEnter={() => setHoveredPodium(idx)}
                >
                  {isRevealed ? (
                    <div
                      onClick={() => setSelectedCert(cert)}
                      className={`bg-white border-4 border-black p-4 cursor-pointer flex flex-col transition-all duration-300 ease-out select-none w-full animate-scale-in ${shadowClass}`}
                      style={{ 
                        transform: `translate3d(${hoverX}px, ${totalY}px, 0) scale(${activeScale})`,
                        transformOrigin: "bottom center",
                        willChange: "transform"
                      }}
                    >
                      <div className="border-2 border-black mb-3 overflow-hidden aspect-[4/3] bg-black relative flex-shrink-0">
                        <SafeImage src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-black uppercase text-[11px] sm:text-xs text-black tracking-tight mb-1 line-clamp-1">
                        {cert.title}
                      </h3>
                      <p className="text-neo-blue text-[9px] font-black uppercase tracking-wider mb-3">
                        {cert.org} ({cert.year})
                      </p>
                      <button className="neo-btn w-full py-1.5 bg-neo-blue text-white uppercase tracking-wider text-[9px] font-black mt-auto">
                        {t("btn-details")}
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`bg-white border-4 border-black p-4 flex flex-col transition-all duration-300 ease-out select-none w-full h-[230px] sm:h-[260px] md:h-[300px] items-center justify-center cursor-default ${shadowClass} ${shakeClass}`}
                      style={{ 
                        transform: `translate3d(${hoverX}px, ${totalY}px, 0) scale(${activeScale})`,
                        transformOrigin: "bottom center",
                        willChange: "transform"
                      }}
                    >
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 border-4 border-black rounded-none flex items-center justify-center mb-4 sm:mb-6 shadow-neo transform ${
                        idx === 0 ? "bg-neo-blue text-white" : idx === 1 ? "bg-neo-yellow text-black" : "bg-neo-pink text-white"
                      }`}>
                        <span className="text-3xl sm:text-4xl font-black select-none animate-bounce-slow">?</span>
                      </div>
                      
                      <div className="bg-black text-white px-3 py-1 border-2 border-black font-black uppercase text-[9px] sm:text-xs tracking-wider">
                        {idx === 0 ? (lang === "id" ? "Peringkat 2" : "2nd Place") : idx === 1 ? (lang === "id" ? "Juara 1!" : "1st Place!") : (lang === "id" ? "Peringkat 3" : "3rd Place")}
                      </div>
                    </div>
                  )}

                  <div className={`hidden md:flex ${pedestalHeight} ${pedestalBg} border-4 border-black shadow-neo w-[90%] mt-4 flex-col items-center justify-center font-mono font-black text-sm tracking-widest transition-transform duration-300 ease-out ${isActive ? "scale-105" : "scale-100"}`}>
                    {pedestalLabel}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Replay Button */}
          {podiumRevealStage === "reveal1" && (
            <div className="flex justify-center mt-12 w-full z-20 relative animate-fade-in">
              <button
                onClick={() => {
                  setPodiumRevealStage("curtain");
                  setIsSpotlightOverlayFaded(false);
                }}
                className="neo-btn px-6 py-2.5 bg-neo-pink text-white font-black uppercase text-xs sm:text-sm tracking-widest flex items-center gap-2 hover:bg-neo-pink/90"
              >
                <i className="fas fa-redo"></i> {lang === "id" ? "REVEAL ULANG" : "REPLAY REVEAL"}
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Certificate Detail Modal */}
      {selectedCert && (
        <div className="modal show flex" onClick={() => setSelectedCert(null)}>
          <div
            className="modal-content border-4 border-black shadow-neo-xl max-w-lg w-[90%] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 border-b-4 border-black pb-4">
              <h3 className="text-lg sm:text-xl font-black text-black uppercase">{t("certificates-modal-title")}</h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-black hover:text-neo-pink text-2xl font-black w-8 h-8 flex items-center justify-center border-2 border-black bg-neo-bg active:translate-y-0.5"
                title="Close modal"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-black max-h-[300px] overflow-hidden aspect-[4/3] bg-black">
                <SafeImage src={selectedCert.image} alt={selectedCert.title} className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-black mb-1 uppercase">{selectedCert.title}</h4>
                <p className="text-neo-blue font-black text-xs uppercase tracking-wider bg-neo-blue/10 inline-block px-2 py-0.5 border-2 border-black mb-4">
                  {selectedCert.org} - {selectedCert.year}
                </p>
                <p className="text-black font-bold text-xs sm:text-sm leading-relaxed text-justify">
                  {selectedCert.desc}
                </p>
              </div>
              <div className="flex gap-4 pt-4 border-t-2 border-black">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="neo-btn flex-1 py-3 bg-neo-pink text-white uppercase font-black text-sm tracking-wider"
                >
                  {t("certificates-modal-close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
