import React, { useState, useEffect, useRef } from "react";
import { SafeImage } from "@/components/SafeImage";
import { Lang, translate, TranslationKey } from "@/components/translations";

interface ProjectsSectionProps {
  lang: Lang;
  showToast: (msg: string) => void;
}

const renderTagIcon = (tag: { name: string; icon: string }) => {
  const nameLower = tag.name.toLowerCase();
  
  if (nameLower === "typescript") {
    return (
      <img
        src="https://cdn.simpleicons.org/typescript/ffffff"
        alt="TypeScript"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "tailwindcss") {
    return (
      <img
        src="https://cdn.simpleicons.org/tailwindcss/000000"
        alt="TailwindCSS"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "mysql") {
    return (
      <img
        src="https://cdn.simpleicons.org/mysql/ffffff"
        alt="MySQL"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "go" || nameLower === "golang") {
    return (
      <img
        src="https://cdn.simpleicons.org/go/000000"
        alt="Go"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "postgresql" || nameLower === "postgres") {
    return (
      <img
        src="https://cdn.simpleicons.org/postgresql/ffffff"
        alt="PostgreSQL"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "shadcn/ui" || nameLower === "shadcn" || nameLower === "shadcnui") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5 md:w-7 md:h-7 object-contain">
        <line x1="16.5" y1="4.5" x2="10.5" y2="19.5" />
        <line x1="12" y1="4.5" x2="6" y2="19.5" />
      </svg>
    );
  }
  if (nameLower === "tensorflow") {
    return (
      <img
        src="https://cdn.simpleicons.org/tensorflow/ffffff"
        alt="TensorFlow"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "numpy") {
    return (
      <img
        src="https://cdn.simpleicons.org/numpy/ffffff"
        alt="NumPy"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "opencv") {
    return (
      <img
        src="https://cdn.simpleicons.org/opencv/ffffff"
        alt="OpenCV"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "keras") {
    return (
      <img
        src="https://cdn.simpleicons.org/keras/ffffff"
        alt="Keras"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "scikit-learn" || nameLower === "scikitlearn") {
    return (
      <img
        src="https://cdn.simpleicons.org/scikitlearn/ffffff"
        alt="Scikit-Learn"
        className="w-full h-full object-contain"
      />
    );
  }
  if (nameLower === "mediapipe") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5 md:w-7 md:h-7 object-contain">
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
        <line x1="12" y1="7" x2="5.5" y2="10.5" />
        <line x1="12" y1="7" x2="18.5" y2="10.5" />
        <line x1="5.5" y1="13.5" x2="12" y2="17" />
        <line x1="18.5" y1="13.5" x2="12" y2="17" />
      </svg>
    );
  }
  if (nameLower === "pygame") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-7 md:h-7 object-contain">
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18.5" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (nameLower === "pyttsx3") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-5 md:w-7 md:h-7 object-contain">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
        <path d="M15.5 8.5a4 4 0 0 1 0 7" />
        <path d="M18.5 5.5a8 8 0 0 1 0 13" />
      </svg>
    );
  }
  return <i className={`${tag.icon} text-sm md:text-xl`}></i>;
};

interface Library {
  name: string;
  icon: string;
  color: string;
  url: string;
}

interface Tag {
  name: string;
  icon: string;
  color: string;
  url: string;
  libraries?: Library[];
}

interface RepoUrlItem {
  labelId: string;
  labelEn: string;
  url: string;
}

interface Project {
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  image: string;
  tags: Tag[];
  repoUrl?: string;
  repoUrls?: RepoUrlItem[];
}

const projects: Project[] = [
  {
    titleId: "SignFlow",
    titleEn: "SignFlow",
    descId: "SignFlow adalah aplikasi penerjemah bahasa isyarat berbasis AI secara real-time. Program ini dirancang untuk mendobrak batasan komunikasi dan membantu teman-teman tunarungu serta tunawicara berinteraksi dengan lebih mudah dan inklusif.",
    descEn: "SignFlow is a real-time AI sign language translator. This program is designed to break down communication barriers and empower seamless, inclusive interactions for the deaf and speech-impaired community.",
    image: "/img/projects-preview/signflow.png",
    tags: [
      {
        name: "Python",
        icon: "fab fa-python",
        color: "bg-[#3776AB] text-white",
        url: "https://www.python.org/",
        libraries: [
          { name: "TensorFlow", icon: "svg", color: "bg-[#FF6F00] text-white", url: "https://www.tensorflow.org/" },
          { name: "OpenCV", icon: "svg", color: "bg-[#5C3EE8] text-white", url: "https://opencv.org/" },
          { name: "NumPy", icon: "svg", color: "bg-[#013243] text-white", url: "https://numpy.org/" },
          { name: "MediaPipe", icon: "svg", color: "bg-[#007FFF] text-white", url: "https://google.github.io/mediapipe/" },
          { name: "Pyttsx3", icon: "svg", color: "bg-[#34495E] text-white", url: "https://pypi.org/project/pyttsx3/" },
          { name: "Scikit-Learn", icon: "svg", color: "bg-[#F89939] text-white", url: "https://scikit-learn.org/" },
          { name: "Keras", icon: "svg", color: "bg-[#D00000] text-white", url: "https://keras.io/" },
        ]
      },
    ],
    repoUrl: "https://github.com/farrel-codenoob29/HandGestureAI",
  },
  {
    titleId: "Amerta AI",
    titleEn: "Amerta AI",
    descId: "Amerta AI adalah asisten bisnis cerdas yang membantu pengusaha menyederhanakan operasional melalui pencatatan keuangan terintegrasi, manajemen stok, dan analisis AI untuk keputusan yang lebih tepat.",
    descEn: "Amerta AI is an AI-powered business assistant that streamlines operations for entrepreneurs through seamless financial tracking, inventory management, and actionable AI insights.",
    image: "/img/projects-preview/amerta.png",
    tags: [
      { name: "Laravel", icon: "fab fa-laravel", color: "bg-[#FF2D20] text-white", url: "https://laravel.com/" },
      { name: "JavaScript", icon: "fab fa-js", color: "bg-[#F7DF1E] text-black", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TailwindCSS", icon: "svg", color: "bg-[#38BDF8] text-black", url: "https://tailwindcss.com/" },
      { name: "MySQL", icon: "svg", color: "bg-[#00758F] text-white", url: "https://www.mysql.com/" },
    ],
    repoUrl: "https://github.com/farrel-codenoob29/amerta-ai",
  },
  {
    titleId: "Sistem Monitor Otomatis LibreNMS",
    titleEn: "Automatic Monitoring System LibreNMS",
    descId: "LibreNMS Report Automator adalah platform yang menyederhanakan pengelolaan infrastruktur jaringan skala besar dengan melacak status perangkat secara real-time dari LibreNMS dan menghasilkan laporan harian PDF secara otomatis.",
    descEn: "LibreNMS Report Automator is a network platform that streamlines large-scale infrastructure management by tracking real-time device status from LibreNMS and generating automated daily PDF reports.",
    image: "/img/projects-preview/libre.png",
    tags: [
      { name: "Laravel", icon: "fab fa-laravel", color: "bg-[#FF2D20] text-white", url: "https://laravel.com/" },
      { name: "JavaScript", icon: "fab fa-js", color: "bg-[#F7DF1E] text-black", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TailwindCSS", icon: "svg", color: "bg-[#38BDF8] text-black", url: "https://tailwindcss.com/" },
      { name: "MySQL", icon: "svg", color: "bg-[#00758F] text-white", url: "https://www.mysql.com/" },
    ],
    repoUrl: "https://github.com/farrel-codenoob29/librenms_automation_system",
  },
  {
    titleId: "Website Pengaduan Aspirasi Sekolah",
    titleEn: "School Aspirations Complaint Website",
    descId: "Layanan Pengaduan Siswa adalah platform aman bagi siswa untuk menyampaikan keluhan dan aspirasi, yang dilengkapi dasbor admin untuk menindaklanjuti setiap masukan demi terciptanya lingkungan sekolah yang transparan dan responsif.",
    descEn: "The Student Grievance & Aspiration Portal is a secure platform for students to submit complaints and ideas, featuring an admin dashboard to process feedback and foster a transparent, responsive school environment.",
    image: "/img/projects-preview/pengaduan.png",
    tags: [
      { name: "React", icon: "fab fa-react", color: "bg-[#61DAFB] text-black", url: "https://react.dev/" },
      { name: "TailwindCSS", icon: "svg", color: "bg-[#38BDF8] text-black", url: "https://tailwindcss.com/" },
      { name: "Golang", icon: "svg", color: "bg-[#00ADD8] text-black", url: "https://go.dev/" },
      { name: "PostgreSQL", icon: "svg", color: "bg-[#336791] text-white", url: "https://www.postgresql.org/" },
    ],
    repoUrls: [
      { labelId: "Frontend", labelEn: "Frontend", url: "https://github.com/farrel-codenoob29/Frontend-pengaduan-UKK" },
      { labelId: "Backend", labelEn: "Backend", url: "https://github.com/farrel-codenoob29/Backend-Pengaduan-UKK" },
    ],
  },
  {
    titleId: "Komponen UI Website",
    titleEn: "Website UI Components",
    descId: "Komponen UI Website adalah pustaka komponen modular terinspirasi shadcn/ui yang dibangun dengan Laravel dan Tailwind CSS, dirancang untuk membantu developer membuat antarmuka web modern dengan jauh lebih cepat.",
    descEn: "Website UI Components is a modular UI library inspired by shadcn/ui, built with Laravel and Tailwind CSS to help developers rapidly create modern and responsive web interfaces.",
    image: "/img/projects-preview/uicom.png",
    tags: [
      { name: "Laravel", icon: "fab fa-laravel", color: "bg-[#FF2D20] text-white", url: "https://laravel.com/" },
      { name: "TailwindCSS", icon: "svg", color: "bg-[#38BDF8] text-black", url: "https://tailwindcss.com/" },
      { name: "shadcn/ui", icon: "svg", color: "bg-[#000000] text-white", url: "https://ui.shadcn.com/" },
    ],
    repoUrl: "https://github.com/farrel-codenoob29/ui-component",
  },
  {
    titleId: "Website Pengelolaan Tiket Pesawat",
    titleEn: "Airline Ticket Management Website",
    descId: "TiketPesawat adalah platform pemesanan penerbangan yang dibangun dengan arsitektur terstruktur (Separation of Concerns), memudahkan pengguna mengeksplorasi destinasi sekaligus mengelola data jadwal, maskapai, dan bandara secara efisien.",
    descEn: "TiketPesawat is a flight booking platform built with a Separation of Concerns (SoC) architecture, allowing users to explore destinations while efficiently managing complex flight, airline, and airport data.",
    image: "/img/projects-preview/pesawat.png",
    tags: [
      { name: "Laravel", icon: "fab fa-laravel", color: "bg-[#FF2D20] text-white", url: "https://laravel.com/" },
      { name: "TailwindCSS", icon: "svg", color: "bg-[#38BDF8] text-black", url: "https://tailwindcss.com/" },
      { name: "MySQL", icon: "svg", color: "bg-[#00758F] text-white", url: "https://www.mysql.com/" },
    ],
    repoUrl: "https://github.com/farrel-codenoob29/airline-ticket-management",
  },
  {
    titleId: "Ninja Game",
    titleEn: "Ninja Game",
    descId: "Game Ninja adalah permainan platformer 2D berbasis Python di mana pemain menggunakan pergerakan dinamis untuk bertahan hidup dan melawan musuh. Game ini dilengkapi sistem progressive scaling, sehingga tingkat kesulitan musuh dan rintangan akan terus meningkat seiring berjalannya waktu.",
    descEn: "Ninja Game is a Python-based 2D platformer where players use dynamic movement mechanics to survive and battle enemies. It features a progressive scaling system, continuously increasing the difficulty of obstacles and enemies over time.",
    image: "/img/projects-preview/ninja.png",
    tags: [
      {
        name: "Python",
        icon: "fab fa-python",
        color: "bg-[#3776AB] text-white",
        url: "https://www.python.org/",
        libraries: [
          { name: "Pygame", icon: "svg", color: "bg-[#B91C1C] text-white", url: "https://www.pygame.org/" },
        ]
      },
    ],
    repoUrl: "https://github.com/farrel-codenoob29/ninja_game",
  },
];

export const ProjectsSection = ({ lang, showToast: _showToast }: ProjectsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<Array<{ y: number; dir: "left" | "right" | null }>>(
    Array(7).fill({ y: 0, dir: null })
  );
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasDraggedCard = useRef(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);
  const [activeImageLightbox, setActiveImageLightbox] = useState<string | null>(null);

  const remainingCount = cardOffsets.filter((o) => o.dir === null).length;
  const t = (key: TranslationKey) => translate(lang, key);

  // Close split dropdowns if clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownIndex(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (activeIndex >= 7) return;
    setIsDraggingCard(true);
    hasDraggedCard.current = false;
    dragStartPos.current = { x: clientX - dragOffset.x, y: clientY - dragOffset.y };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDraggingCard) return;
    const newX = clientX - dragStartPos.current.x;
    const newY = clientY - dragStartPos.current.y;
    if (Math.abs(newX) > 5 || Math.abs(newY) > 5) {
      hasDraggedCard.current = true;
    }
    setDragOffset({ x: newX, y: newY * 0.4 });
  };

  const handleDragEnd = () => {
    if (!isDraggingCard) return;
    setIsDraggingCard(false);

    const threshold = 120;
    if (dragOffset.x > threshold) {
      throwCard(activeIndex, "right");
    } else if (dragOffset.x < -threshold) {
      throwCard(activeIndex, "left");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const throwCard = (index: number, direction: "left" | "right") => {
    setCardOffsets((prev) => {
      const updated = [...prev];
      updated[index] = { y: dragOffset.y, dir: direction };
      return updated;
    });
    setDragOffset({ x: 0, y: 0 });
    setActiveIndex(index + 1);
  };

  const resetStack = () => {
    setDragOffset({ x: 0, y: 0 });
    setActiveIndex(0);

    for (let i = 6; i >= 0; i--) {
      setTimeout(() => {
        setCardOffsets((prev) => {
          const updated = [...prev];
          updated[i] = { y: 0, dir: null };
          return updated;
        });
      }, (7 - i) * 100);
    }
  };

  // Card deck event listener window-level registration
  useEffect(() => {
    if (!isDraggingCard) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      if (e.cancelable) e.preventDefault();
      handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleTouchEnd = () => {
      handleDragEnd();
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
  }, [isDraggingCard, dragOffset, activeIndex]);

  const getCardStyle = (index: number) => {
    const offset = cardOffsets[index];

    if (offset?.dir !== null) {
      const dirMultiplier = offset?.dir === "left" ? -1 : 1;
      return {
        transform: `translate(${dirMultiplier * 120}vw, ${offset?.y ?? 0}px) rotate(${dirMultiplier * 45}deg)`,
        opacity: 0,
        transition: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.2), opacity 0.6s",
        zIndex: 50,
        pointerEvents: "none" as const,
      };
    }

    let activeStackIndex = 0;
    for (let i = 0; i < index; i++) {
      if (cardOffsets[i]?.dir === null) {
        activeStackIndex++;
      }
    }

    const maxVisible = 3;
    if (activeStackIndex >= maxVisible) {
      return { display: "none" };
    }

    let rotate = 0;
    let translateY = 0;
    let translateX = 0;

    if (activeStackIndex === 0) {
      rotate = (dragOffset.x / 15) * 1.5;
      translateX = dragOffset.x;
      translateY = dragOffset.y;
    } else if (activeStackIndex === 1) {
      rotate = 4;
      translateY = 8;
      translateX = 4;
    } else if (activeStackIndex === 2) {
      rotate = -3;
      translateY = 16;
      translateX = -4;
    }

    const isDragging = activeStackIndex === 0 && isDraggingCard;

    return {
      transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
      transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1), opacity 0.3s",
      zIndex: 30 - activeStackIndex,
      opacity: 1,
      pointerEvents: activeStackIndex === 0 ? ("auto" as const) : ("none" as const),
    };
  };

  return (
    <section id="projects" className="py-20 sm:py-32 border-y-8 border-black bg-neo-blue relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center mb-12 text-center reveal reveal-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            <span className="bg-neo-yellow text-black px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform -rotate-1 hover:rotate-1 transition-transform duration-300 cursor-default">
              {t("projects-title")}
            </span>
          </h2>
          <div className="bg-black/30 border-2 border-black text-white font-mono text-[10px] sm:text-xs px-4 py-1.5 tracking-wider uppercase">
            {lang === "id"
              ? "🕹️ Geser kartu ke samping atau klik tombol untuk membuang kartu proyek!"
              : "🕹️ Swipe cards sideways or use buttons below to discard project cards!"}
          </div>
        </div>

        <div className="max-w-md md:max-w-4xl mx-auto w-full reveal reveal-scale">
          <div className="bg-zinc-900 border-[6px] border-black shadow-neo-xl p-4 relative rounded-none flex flex-col">
            <div className="w-full flex justify-between items-center text-[10px] text-zinc-400 font-mono border-b-2 border-zinc-800 pb-2 mb-2 select-none">
              <span className="text-neo-pink font-black tracking-widest animate-pulse">● INSERT COIN</span>
              <span className="font-bold">FARREL&apos;S PROJECTS</span>
              <span className="text-neo-green font-black">P1 SCORE: {remainingCount.toString().padStart(2, "0")} / 07</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 w-full items-stretch border-2 border-black rounded-sm overflow-hidden">
              <div className="col-span-12 md:col-span-8 p-4 flex items-center justify-center bg-black/10 min-h-[420px] md:min-h-[440px]">
                <div className="relative w-full aspect-[3/4] md:aspect-[16/10] max-w-[320px] sm:max-w-[340px] md:max-w-none md:w-full h-[400px] md:h-[420px] flex items-center justify-center">
                  {projects.map((proj, idx) => {
                    const isTop = idx === activeIndex;
                    const style = getCardStyle(idx);

                    return (
                      <div
                        key={idx}
                        style={style}
                        className={`absolute w-full h-[400px] md:h-[420px] bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] p-4 flex flex-col justify-between select-none ${
                          isTop ? "cursor-grab active:cursor-grabbing" : ""
                        }`}
                        onMouseDown={(e) => {
                          if (isTop) handleDragStart(e.clientX, e.clientY);
                        }}
                        onTouchStart={(e) => {
                          if (isTop && e.touches.length > 0) {
                            handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
                          }
                        }}
                      >
                        <div className="flex flex-col h-full w-full justify-between">
                          <div className="flex justify-between items-center bg-black text-white px-2 py-1 text-[8px] font-mono tracking-wider mb-2 select-none border border-black uppercase w-full">
                            <span>DECK NO: {(idx + 1).toString().padStart(2, "0")} / 07</span>
                            <span className="text-neo-yellow font-black">SIDE A</span>
                          </div>

                          <div className="flex-1 flex flex-col gap-2.5">
                            <div
                              className="border-2 border-black overflow-hidden bg-black relative flex-shrink-0 select-none h-28 sm:h-32 md:h-36 w-full cursor-zoom-in group/img"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (hasDraggedCard.current) return;
                                setActiveImageLightbox(proj.image);
                              }}
                            >
                              <SafeImage
                                src={proj.image}
                                alt={lang === "id" ? proj.titleId : proj.titleEn}
                                className="w-full h-full object-cover pointer-events-none group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                              <div className="absolute top-2 right-2 bg-black/60 text-white p-1.5 border border-black hover:bg-black transition-colors rounded-none opacity-0 group-hover/img:opacity-100 pointer-events-none flex items-center justify-center">
                                <i className="fas fa-expand-arrows-alt text-xs"></i>
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between text-left select-text h-full">
                              <div className="flex flex-col">
                                <h3 className="text-xs sm:text-sm font-black text-black uppercase tracking-tight line-clamp-1 border-b-2 border-black pb-1 mb-1">
                                  {lang === "id" ? proj.titleId : proj.titleEn}
                                </h3>
                                <p className="text-[9px] sm:text-[10px] text-black/90 font-bold leading-normal text-justify line-clamp-2 md:line-clamp-3">
                                  {lang === "id" ? proj.descId : proj.descEn}
                                </p>
                              </div>

                              <div className="space-y-2 mt-auto select-none">
                                <div className="flex flex-wrap gap-2 mb-1">
                                  {proj.tags.map((tag: Tag, tIdx) => {
                                    const hasLibraries = !!tag.libraries;
                                    return (
                                      <div key={tIdx} className={hasLibraries ? "relative flex items-center group/python-tag" : "relative"}>
                                        <a
                                          href={tag.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`relative group w-8 h-8 md:w-11 md:h-11 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_0px_#000] transition-all duration-150 cursor-pointer rounded-none ${tag.color}`}
                                          onClick={(e) => e.stopPropagation()}
                                          onMouseDown={(e) => e.stopPropagation()}
                                          onTouchStart={(e) => e.stopPropagation()}
                                        >
                                          <div className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center select-none transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">
                                            {renderTagIcon(tag)}
                                          </div>
                                          <div className="absolute bottom-full mb-2 left-0 opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 flex flex-col items-start z-[60]">
                                            <div className="bg-neo-yellow text-black text-[9px] font-mono py-1 px-2 border-2 border-black whitespace-nowrap shadow-[2px_2px_0px_0px_#000] font-black uppercase">
                                              {tag.name} ↗
                                            </div>
                                            <div className="w-1.5 h-1.5 bg-neo-yellow transform rotate-45 -mt-1 ml-3 md:ml-4 border-r-2 border-b-2 border-black"></div>
                                          </div>
                                        </a>

                                        {hasLibraries && tag.libraries && (
                                          <div className="flex items-center gap-2 transition-all duration-500 ease-out max-w-0 overflow-hidden group-hover/python-tag:max-w-[500px] group-hover/python-tag:ml-2">
                                            {tag.libraries.map((lib: Library, lIdx: number) => (
                                              <a
                                                key={lIdx}
                                                href={lib.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`relative group/lib-item w-8 h-8 md:w-11 md:h-11 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_0px_#000] transition-all duration-300 ease-out opacity-0 scale-50 -translate-x-4 group-hover/python-tag:opacity-100 group-hover/python-tag:scale-100 group-hover/python-tag:translate-x-0 pointer-events-none group-hover/python-tag:pointer-events-auto rounded-none ${lib.color}`}
                                                style={{ transitionDelay: `${lIdx * 50}ms` }}
                                                onClick={(e) => e.stopPropagation()}
                                                onMouseDown={(e) => e.stopPropagation()}
                                                onTouchStart={(e) => e.stopPropagation()}
                                              >
                                                <div className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center select-none transform group-hover/lib-item:scale-110 group-hover/lib-item:rotate-6 transition-transform duration-200">
                                                  {renderTagIcon(lib)}
                                                </div>
                                                <div className="absolute bottom-full mb-2 left-0 opacity-0 scale-90 pointer-events-none group-hover/lib-item:opacity-100 group-hover/lib-item:scale-100 transition-all duration-200 flex flex-col items-start z-[60]">
                                                  <div className="bg-black text-white text-[9px] font-mono py-1 px-2 border border-white/60 whitespace-nowrap shadow-[2px_2px_0px_0px_rgba(255,255,255,0.25)] font-bold uppercase">
                                                    <span className="text-neo-green font-black">[LIB]</span> {lib.name} ↗
                                                  </div>
                                                  <div className="w-1.5 h-1.5 bg-black transform rotate-45 -mt-1 ml-3 md:ml-4 border-r border-b border-white/20"></div>
                                                </div>
                                              </a>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                {proj.repoUrls ? (
                                  <div className="relative w-full">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDropdownIndex(activeDropdownIndex === idx ? null : idx);
                                      }}
                                      onMouseDown={(e) => e.stopPropagation()}
                                      onTouchStart={(e) => e.stopPropagation()}
                                      className="neo-btn w-full py-2 bg-neo-yellow text-center text-[10px] font-black uppercase tracking-wider text-black border-2 border-black hover:bg-neo-pink hover:text-white transition-colors flex items-center justify-center gap-1.5"
                                    >
                                      <i className="fab fa-github"></i> {t("btn-source")}
                                      <i className={`fas fa-chevron-${activeDropdownIndex === idx ? "up" : "down"} text-[8px]`}></i>
                                    </button>
                                    
                                    {activeDropdownIndex === idx && (
                                      <div
                                        className="absolute bottom-full mb-2 left-0 right-0 bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] z-[60] flex flex-col divide-y-2 divide-black text-left"
                                        onClick={(e) => e.stopPropagation()}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onTouchStart={(e) => e.stopPropagation()}
                                      >
                                        {proj.repoUrls.map((repo, rIdx) => (
                                          <a
                                            key={rIdx}
                                            href={repo.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveDropdownIndex(null);
                                            }}
                                            onMouseDown={(e) => e.stopPropagation()}
                                            onTouchStart={(e) => e.stopPropagation()}
                                            className="px-3 py-2 bg-white text-black hover:bg-neo-pink hover:text-white transition-colors flex justify-between items-center font-mono font-black text-[9px] uppercase tracking-wider"
                                          >
                                            <span>{lang === "id" ? repo.labelId : repo.labelEn}</span>
                                            <i className="fas fa-external-link-alt text-[8px]"></i>
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <a
                                    href={proj.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="neo-btn w-full block py-2 bg-neo-yellow text-center text-[10px] font-black uppercase tracking-wider text-black border-2 border-black hover:bg-neo-pink hover:text-white transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onTouchStart={(e) => e.stopPropagation()}
                                  >
                                    <i className="fab fa-github mr-1"></i> {t("btn-source")}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {activeIndex >= 7 && (
                    <div className="absolute inset-0 bg-black border-4 border-white flex flex-col items-center justify-center p-6 text-center z-40 animate-scale-in">
                      <div className="text-red-500 font-mono font-black text-2xl tracking-widest uppercase mb-2">
                        GAME OVER
                      </div>
                      <div className="text-white font-mono text-xs uppercase tracking-wider mb-6">
                        {lang === "id" ? "SELAIN PROYEK HABIS!" : "ALL CARDS DISCARDED!"}
                      </div>
                      
                      <button
                        onClick={resetStack}
                        className="neo-btn px-6 py-4 bg-neo-green text-black border-4 border-white text-xs font-black uppercase tracking-widest shadow-[0px_0px_15px_rgba(0,255,102,0.6)] hover:bg-white transition-all active:translate-y-1 animate-pulse"
                      >
                        🪙 {lang === "id" ? "MASUKKAN KOIN" : "INSERT COIN"}
                      </button>
                      
                      <p className="text-zinc-600 font-mono text-[9px] mt-6 uppercase select-none">
                        press start to reset deck
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 bg-zinc-800 border-t-4 md:border-t-0 md:border-l-4 border-black p-3.5 md:p-6 flex md:flex-col justify-between md:justify-center items-center md:gap-8 rounded-none select-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="text-[8px] md:text-[10px] text-zinc-500 font-mono font-black uppercase">D-PAD</div>
                  <div className="grid grid-cols-3 gap-0.5 w-14 h-14 md:w-16 md:h-16 relative bg-black p-1 border border-zinc-700">
                    <div className="bg-zinc-800 border border-zinc-900 col-start-2 rounded-t-sm" />
                    <button 
                      onClick={() => activeIndex < 7 && throwCard(activeIndex, "left")}
                      className="bg-zinc-600 border-2 border-black hover:bg-zinc-400 active:bg-zinc-700 col-start-1 row-start-2 rounded-l-sm"
                      title="Discard Left"
                    />
                    <div className="bg-zinc-700 col-start-2 row-start-2" />
                    <button 
                      onClick={() => activeIndex < 7 && throwCard(activeIndex, "right")}
                      className="bg-zinc-600 border-2 border-black hover:bg-zinc-400 active:bg-zinc-700 col-start-3 row-start-2 rounded-r-sm"
                      title="Discard Right"
                    />
                    <div className="bg-zinc-800 border border-zinc-900 col-start-2 row-start-3 rounded-b-sm" />
                  </div>
                </div>

                <div className="bg-black/80 border border-zinc-700 px-3 py-2 md:py-4 flex flex-col justify-center items-center text-center w-28 md:w-full rounded-sm select-none">
                  <div className="text-[7px] md:text-[9px] text-zinc-500 font-mono font-black uppercase">REMAINING</div>
                  <div className="text-neo-yellow font-mono text-base md:text-xl font-black leading-none mt-1 animate-pulse">
                    {remainingCount.toString().padStart(2, "0")} / 07
                  </div>
                </div>

                <div className="flex md:flex-row gap-2 md:gap-4">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => activeIndex < 7 && throwCard(activeIndex, "left")}
                      disabled={activeIndex >= 7}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center text-white font-black text-xs hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Discard card"
                    >
                      A
                    </button>
                    <span className="text-[7px] md:text-[8px] text-zinc-500 font-mono font-black">THROW</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={resetStack}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neo-yellow border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center text-black font-black text-xs hover:bg-yellow-400"
                      title="Reset cards"
                    >
                      B
                    </button>
                    <span className="text-[7px] md:text-[8px] text-zinc-500 font-mono font-black">RESET</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Image Lightbox Overlay Modal (Moved Inside ProjectsSection) */}
      {activeImageLightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4 md:p-8 select-none"
          onClick={() => setActiveImageLightbox(null)}
        >
          <button
            onClick={() => setActiveImageLightbox(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-neo-pink text-white border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center font-black text-2xl hover:bg-white hover:text-black transition-all cursor-pointer z-[210]"
          >
            ×
          </button>
          
          <div 
            className="relative max-w-5xl max-h-[85vh] border-[6px] border-black bg-zinc-900 shadow-neo-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImageLightbox}
              alt="Fullscreen Preview"
              className="max-w-full max-h-[80vh] object-contain block pointer-events-auto"
            />
            <div className="bg-black text-white text-[10px] font-mono p-2 text-center border-t-4 border-black uppercase select-none">
              {lang === "id" ? "Tekan tombol '×' atau klik di luar untuk menutup" : "Press '×' button or click outside to close"}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
