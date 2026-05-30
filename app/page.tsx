"use client";

import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";


// Translations Dictionary
const translations = {
  id: {
    "nav-home": "Home",
    "nav-about": "Tentang",
    "nav-projects": "Proyek",
    "nav-skills": "Keahlian",
    "nav-github": "Github",
    "nav-certificates": "Sertifikat",
    "nav-testimonial": "Testimonial",
    "nav-contact": "Kontak",
    "hero-greeting": "Halo, Saya",
    "hero-view-work": "Lihat Karya Saya",
    "hero-whatsapp": "Chat di WhatsApp",
    "about-title": "Tentang Saya",
    "about-subtitle": "Pengembang Web Profesional",
    "about-desc": "Saya Farrel Diego Akbar, lulusan Sekolah Menengah Kejuruan Jurusan Rekayasa Perangkat Lunak dari Indonesia. Saya berspesialisasi dalam membangun antarmuka digital yang interaktif dan memelihara sistem backend yang tangguh. Sebagai Junior Full Stack Developer, saya menggabungkan keahlian logika server modern dan desain web responsif untuk memberikan solusi komprehensif. Saya menyukai pemecahan masalah kreatif dan terus mengikuti perkembangan teknologi terbaru.",
    "about-hire": "Hubungi Saya",
    "projects-title": "Proyek Saya",
    "btn-details": "Detail",
    "btn-source": "Source Code",
    "btn-code2": "Kunjungi",
    "btn-file": "File Jaringan",
    "contact-info-title": "Informasi Kontak",
    "contact-location-title": "Lokasi",
    "contact-email-title": "Email",
    "contact-phone-title": "Telepon",
    "contact-message-title": "Kirim Pesan",
    "form-name": "Nama Anda",
    "form-email": "Email Anda",
    "form-subject": "Subjek",
    "form-message": "Pesan Anda",
    "github_title": "Statistik GitHub",
    "github_repos": "Total Repo",
    "github_stars": "Bintang",
    "github_contrib": "Kontribusi",
    "github_followers": "Pengikut",
    "github_received": "Diterima di proyek",
    "github_lastyear": "(sampai kini)",
    "github_followers_desc": "Pengikut GitHub",
    "certificates-modal-title": "Detail Sertifikat",
    "certificates-modal-close": "Tutup",
    "testimonial-title": "Apa Kata Klien",
    "stat-happy-clients": "Klien Puas",
    "stat-success-rate": "Tingkat Keberhasilan %",
    "stat-projects": "Proyek Selesai",
    "stat-rating": "Rating Rata-rata",
    "github-less": "Sedikit",
    "github-more": "Banyak",
    "footer-rights": "Hak cipta dilindungi.",
    // Project Titles & Descriptions
    "proj-gilmar-title": "GILMAR IDEA",
    "proj-gilmar-desc": "Web berita digital yang menyajikan informasi terkini bagi mahasiswa STIE Pancasetia.",
    "proj-donghua-title": "DONGHUAWATCH",
    "proj-donghua-desc": "Situs streaming Donghua dengan subtitle Indonesia yang cepat dan responsif.",
    "proj-siperu-title": "SIPERU",
    "proj-siperu-desc": "Sistem Informasi Peminjaman Ruangan untuk mengelola reservasi fasilitas kampus secara otomatis.",
    "proj-komik-title": "DONGHUAWATCH KOMIK",
    "proj-komik-desc": "Platform baca komik online dengan koleksi lengkap dan antarmuka yang ramah pengguna.",
    "proj-api-title": "DONGHUAWATCH API",
    "proj-api-desc": "RESTful API untuk mengambil data streaming Donghua dengan fitur pencarian dan caching.",
    "proj-sip-title": "SIP STIE PANCASETIA",
    "proj-sip-desc": "Sistem Informasi Terpadu STIE Pancasetia untuk manajemen data akademik yang efisien.",
    "proj-lppm-title": "LPPM STIE PANCASETIA",
    "proj-lppm-desc": "Portal resmi Lembaga Penelitian dan Pengabdian kepada Masyarakat STIE Pancasetia.",
    "proj-obe-title": "SISTEM KURIKULUM OBE",
    "proj-obe-desc": "Sistem Informasi Desain Kurikulum OBE Poliban mendukung penyelarasan standar kurikulum.",
    "proj-bot-title": "AI CHATBOT (FARBOT)",
    "proj-bot-desc": "Chatbot bertenaga AI yang dirancang untuk berinteraksi alami menggunakan Gemini API.",
    "proj-sima-title": "SIM-A BPKPAD ARSIP",
    "proj-sima-desc": "Sistem manajemen arsip elektronik untuk BPKPAD mengoptimalkan penyimpanan dokumen.",
    "proj-game-title": "PERMAINAN ULAR TANGGA",
    "proj-game-desc": "Game papan klasik berbasis web dengan fitur interaktif untuk dua pemain.",
    "proj-upscale-title": "AI IMAGE UPSCALER",
    "proj-upscale-desc": "Aplikasi web AI untuk upscale gambar hingga 4x menggunakan neural network Real-ESRGAN.",
    "proj-cisco-title": "DESAIN LAN CISCO",
    "proj-cisco-desc": "Desain jaringan Cisco Packet Tracer untuk optimasi korporat dengan VLAN dan routing.",
  },
  en: {
    "nav-home": "Home",
    "nav-about": "About",
    "nav-projects": "Projects",
    "nav-skills": "Skills",
    "nav-github": "Github",
    "nav-certificates": "Certificates",
    "nav-testimonial": "Testimonial",
    "nav-contact": "Contact",
    "hero-greeting": "Hello, I'm",
    "hero-view-work": "View My Work",
    "hero-whatsapp": "Chat on WhatsApp",
    "about-title": "About Me",
    "about-subtitle": "Professional Web Developer",
    "about-desc": "I am Farrel Diego Akbar, a vocational high school graduate majoring in Software Engineering from Indonesia. I specialize in building interactive digital interfaces and maintaining robust backend systems. As a Junior Full Stack Developer, I combine expertise in modern server logic and responsive web design to deliver comprehensive solutions. I am passionate about creative problem-solving and staying up-to-date with the latest technological trends.",
    "about-hire": "Hire Me",
    "projects-title": "My Projects",
    "btn-details": "Details",
    "btn-source": "Source Code",
    "btn-code2": "Visit Site",
    "btn-file": "Network File",
    "contact-info-title": "Contact Information",
    "contact-location-title": "Location",
    "contact-email-title": "Email",
    "contact-phone-title": "Phone",
    "contact-message-title": "Send Me a Message",
    "form-name": "Your Name",
    "form-email": "Your Email",
    "form-subject": "Subject",
    "form-message": "Your Message",
    "github_title": "GitHub Statistics",
    "github_repos": "Total Repo",
    "github_stars": "Stars",
    "github_contrib": "Contributions",
    "github_followers": "Followers",
    "github_received": "Received on projects",
    "github_lastyear": "(until now)",
    "github_followers_desc": "GitHub followers",
    "certificates-modal-title": "Certificate Details",
    "certificates-modal-close": "Close",
    "testimonial-title": "What Clients Say",
    "stat-happy-clients": "Happy Clients",
    "stat-success-rate": "Success Rate %",
    "stat-projects": "Projects Completed",
    "stat-rating": "Average Rating",
    "github-less": "Less",
    "github-more": "More",
    "footer-rights": "All rights reserved.",
    // Project Titles & Descriptions
    "proj-gilmar-title": "GILMAR IDEA",
    "proj-gilmar-desc": "Digital news website providing the latest information for STIE Pancasetia students.",
    "proj-donghua-title": "DONGHUAWATCH",
    "proj-donghua-desc": "Donghua streaming website with fast and responsive Indonesian subtitles.",
    "proj-siperu-title": "SIPERU",
    "proj-siperu-desc": "Room Booking Information System for automated campus facility reservation management.",
    "proj-komik-title": "DONGHUAWATCH COMIK",
    "proj-komik-desc": "Online comic reading platform with a complete collection and user-friendly interface.",
    "proj-api-title": "DONGHUAWATCH API",
    "proj-api-desc": "RESTful API to fetch Donghua streaming data with efficient search and caching features.",
    "proj-sip-title": "SIP STIE PANCASETIA",
    "proj-sip-desc": "STIE Pancasetia Integrated Information System for efficient academic data management.",
    "proj-lppm-title": "LPPM STIE PANCASETIA",
    "proj-lppm-desc": "Official portal of STIE Pancasetia Research and Community Service Institute.",
    "proj-obe-title": "OBE CURRICULUM SYSTEM",
    "proj-obe-desc": "OBE Curriculum Design Information System developed for Poliban to support curriculum alignment.",
    "proj-bot-title": "AI CHATBOT (FARBOT)",
    "proj-bot-desc": "Intelligent AI-powered chatbot designed to interact naturally using the Gemini API.",
    "proj-sima-title": "SIM-A BPKPAD ARCHIVE",
    "proj-sima-desc": "Electronic archive management system for BPKPAD optimizing document storage and security.",
    "proj-game-title": "SNAKES AND LADDERS GAME",
    "proj-game-desc": "Web-based classic board game with interactive features, allowing two players to play.",
    "proj-upscale-title": "AI IMAGE UPSCALER",
    "proj-upscale-desc": "Web application with AI to upscale images up to 4x using Real-ESRGAN neural network.",
    "proj-cisco-title": "CISCO LAN DESIGN",
    "proj-cisco-desc": "Network design using Cisco Packet Tracer for corporate optimization with VLAN and routing.",
  }
};

// Safe Image Component to handle missing visual resources
const SafeImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`bg-neo-blue/20 flex flex-col items-center justify-center border-b-4 border-black p-4 text-center font-black ${className}`}>
        <i className="fas fa-laptop-code text-4xl sm:text-5xl text-black/50 mb-2"></i>
        <span className="text-xs uppercase tracking-tight text-black/70 px-2 line-clamp-2">{alt}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

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


const navItems = [
  { id: "home", color: "#FFD600" },
  { id: "about", color: "#FF006E" },
  { id: "projects", color: "#3A86FF" },
  { id: "skills", color: "#00FF66" },
  { id: "certificates", color: "#8338EC" },
  { id: "contact", color: "#FB5607" },
];

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

export default function Home() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [typedTitle, setTypedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [profileAngle, setProfileAngle] = useState(-3);
  const [profileHoverOffset, setProfileHoverOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardOffsets, setCardOffsets] = useState<Array<{ y: number; dir: "left" | "right" | null }>>(
    Array(7).fill({ y: 0, dir: null })
  );
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const [selectedCert, setSelectedCert] = useState<{
    title: string;
    org: string;
    year: string;
    image: string;
    desc: string;
  } | null>(null);
  const [hoveredPodium, setHoveredPodium] = useState<number | null>(null);
  const [certificatesScrollOffset, setCertificatesScrollOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [sliderX, setSliderX] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderStartPos = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeImageLightbox, setActiveImageLightbox] = useState<string | null>(null);
  const hasDraggedCard = useRef(false);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Terminal Simulator State
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; result: React.ReactNode }>>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isTypingSimulated, setIsTypingSimulated] = useState(false);
  const terminalViewportRef = useRef<HTMLDivElement>(null);

  // Vending Machine States & Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const dragNodeIdRef = useRef<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [dragNodeId, setDragNodeId] = useState<string | null>(null);
  const [activeButton, setActiveButton] = useState<"frontend" | "backend" | "devops" | null>(null);

  const vendingItemsRef = useRef<VendingItem[]>([]);
  const [vendingItemsState, setVendingItemsState] = useState<VendingItem[]>([]);

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



  const renderNodeIcon = (id: string, textWhite?: boolean) => {
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

  // Close active dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownIndex(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Calculate remaining count based on how many cards are currently on screen (dir is null)
  const remainingCount = cardOffsets.filter((o) => o.dir === null).length;

  // Initialize terminal greeting based on current language
  useEffect(() => {
    if (mounted) {
      setTerminalHistory([
        {
          command: "system --init",
          result: (
            <div className="space-y-1.5 text-zinc-300 font-mono text-xs select-text text-left">
              <div>Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-1004-aws x86_64)</div>
              <div className="text-zinc-500 font-bold"> * Documentation:  https://help.ubuntu.com</div>
              <div className="text-zinc-500 font-bold"> * Management:     https://landscape.canonical.com</div>
              <div className="text-zinc-500 font-bold"> * Support:        https://ubuntu.com/pro</div>
              <div className="mt-2 text-zinc-400 font-bold">
                {lang === "id" 
                  ? "Ketik 'help' atau klik tombol shortcut di sebelah kiri untuk berinteraksi." 
                  : "Type 'help' or click the shortcut buttons on the left to interact."}
              </div>
            </div>
          ),
        },
      ]);
    }
  }, [lang, mounted]);

  // Auto-scroll terminal viewport
  useEffect(() => {
    if (terminalViewportRef.current) {
      terminalViewportRef.current.scrollTop = terminalViewportRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const executeTerminalCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let result: React.ReactNode = null;
    const lowerCmd = trimmed.toLowerCase();

    if (lowerCmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    }

    switch (lowerCmd) {
      case "help":
        result = (
          <div className="space-y-1.5 text-neo-yellow font-mono text-xs select-text text-left">
            <p className="font-black">{lang === "id" ? "Perintah yang didukung (Ubuntu-aligned):" : "Supported commands (Ubuntu-aligned):"}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-1 font-mono text-[11px] text-white">
              <div><span className="text-neo-green font-bold">profilefetch</span> - {lang === "id" ? "Tampilkan spek pribadi & OS (neofetch)" : "Show personal specs & OS details (neofetch)"}</div>
              <div><span className="text-neo-green font-bold">cat knowledge.md</span> - {lang === "id" ? "Lihat riwayat akademik" : "Read academic history"}</div>
              <div><span className="text-neo-green font-bold">ls skills/</span> - {lang === "id" ? "Tampilkan daftar keahlian" : "List programming skills"}</div>
              <div><span className="text-neo-green font-bold">./contact.sh</span> - {lang === "id" ? "Jalankan skrip kontak" : "Execute contact options"}</div>
              <div><span className="text-neo-green font-bold">clear</span> - {lang === "id" ? "Bersihkan riwayat layar" : "Clear the screen history"}</div>
            </div>
          </div>
        );
        break;
      case "whoami":
      case "profilefetch":
        result = (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-4 bg-[#2C001E]/40 border-2 border-black rounded mt-2 font-mono text-left select-text items-center">
            {/* Profile Picture instead of ASCII art */}
            <div className="sm:col-span-4 flex justify-center items-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 border-4 border-black bg-black overflow-hidden relative shadow-[4px_4px_0px_0px_#E95420]">
                <SafeImage
                  src="/img/muka_parel.jpeg"
                  alt="Farrel Diego Akbar"
                  className="w-full h-full object-cover contrast-125"
                />
              </div>
            </div>
            {/* Developer Specs */}
            <div className="sm:col-span-8 space-y-1.5 text-xs sm:text-[13px] text-zinc-300">
              <div className="text-neo-orange font-black text-sm sm:text-base">farrel@ubuntu-desktop</div>
              <div className="text-zinc-500 font-bold">---------------------</div>
              <div><span className="text-neo-pink font-bold">OS:</span> Ubuntu 24.04 LTS</div>
              <div><span className="text-neo-pink font-bold">Host:</span> Farrel Diego Akbar</div>
              <div><span className="text-neo-pink font-bold">Role:</span> Junior Full Stack Developer</div>
              <div><span className="text-neo-pink font-bold">Education:</span> Mahasiswa Informatika Institut Teknologi Kalimantan</div>
              <div><span className="text-neo-pink font-bold">Location:</span> Balikpapan, Indonesia</div>
              <div><span className="text-neo-pink font-bold">Shell:</span> bash 5.2.15</div>
              <div><span className="text-neo-pink font-bold">WM:</span> Next.js</div>
            </div>
            {/* Full biography description statement */}
            <div className="sm:col-span-12 border-t border-zinc-800 pt-3 text-zinc-300 leading-relaxed text-justify text-xs mt-2">
              <span className="text-neo-green font-bold">[BIO]: </span>{t("about-desc")}
            </div>
          </div>
        );
        break;
      case "cat knowledge.md":
      case "cat knowledge.txt":
        result = (
          <div className="p-4 bg-[#2C001E]/40 border-2 border-black rounded text-[11px] space-y-3 mt-2 max-w-xl font-mono select-text text-left">
            <div className="text-neo-blue font-black border-b border-zinc-800 pb-1.5 uppercase flex items-center justify-between">
              <span>[ knowledge.md ]</span>
              <span className="text-[9px] text-zinc-500 font-normal">UTF-8 / Markdown</span>
            </div>
            <div className="space-y-4 pt-1">
              {lang === "id" ? (
                <ul className="space-y-3 pl-4 list-disc text-zinc-300">
                  <li>
                    <span className="text-white font-bold">Pengembangan web dasar</span> menggunakan HTML, CSS, dan JavaScript (saat ini sedang mempelajari React sebagai langkah awal ke teknologi frontend modern)
                  </li>
                  <li>
                    <span className="text-white font-bold">Pengembangan backend</span> dengan PHP dan Laravel
                  </li>
                  <li>
                    <span className="text-white font-bold">Optimasi sistem</span> seperti caching, database fallback, DDDM (Database Driven Dynamic Menu), dan integrasi WebSocket real-time
                  </li>
                  <li>
                    <span className="text-white font-bold">Pengembangan aplikasi mobile</span> dengan Flutter & Dart
                  </li>
                  <li>
                    <span className="text-white font-bold">Dasar AI & Machine Learning</span>, termasuk membuat model AI saya sendiri hanya menggunakan Python
                  </li>
                  <li className="list-none -ml-4 text-neo-orange font-bold mt-2">
                    & semoga akan lebih banyak lagi di masa depan!
                  </li>
                </ul>
              ) : (
                <ul className="space-y-3 pl-4 list-disc text-zinc-300">
                  <li>
                    <span className="text-white font-bold">Basic web development</span> using HTML, CSS, and JavaScript (currently learning React as my first step into modern frontend tech)
                  </li>
                  <li>
                    <span className="text-white font-bold">Backend development</span> with PHP and Laravel
                  </li>
                  <li>
                    <span className="text-white font-bold">System optimizations</span> such as caching, database fallbacks, DDDM (Database Driven Dynamic Menu), and real-time WebSocket integration
                  </li>
                  <li>
                    <span className="text-white font-bold">Mobile app development</span> with Flutter & Dart
                  </li>
                  <li>
                    <span className="text-white font-bold">Fundamental AI & Machine Learning</span>, including creating my own AI models using only Python
                  </li>
                  <li className="list-none -ml-4 text-neo-orange font-bold mt-2">
                    & hopefully much more in the future!
                  </li>
                </ul>
              )}
            </div>
          </div>
        );
        break;
      case "ls":
      case "ls skills/":
        result = (
          <div className="p-4 bg-[#2C001E]/40 border-2 border-black rounded mt-2 space-y-3 max-w-xl font-mono select-text text-left">
            <div className="text-neo-green font-black border-b border-zinc-800 pb-1.5 uppercase flex items-center justify-between">
              <span>{lang === "id" ? "[ TINGKAT KEAHLIAN / ROLES ]" : "[ SKILL LEVEL / ROLES ]"}</span>
              <span className="text-[9px] text-zinc-500 font-normal">3 roles</span>
            </div>
            
            <div className="space-y-4 pt-2">
              {/* Front End Developer */}
              <div className="p-3 bg-[#2C001E]/20 border-2 border-black shadow-[3px_3px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded">
                <div className="space-y-0.5">
                  <div className="text-white font-black text-xs sm:text-sm uppercase flex items-center gap-1.5">
                    <span className="text-neo-blue">●</span> Front End Developer
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono">
                    React, Next.js, JavaScript, Tailwind CSS
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-2.5 py-1 border border-zinc-800 rounded flex-shrink-0 self-start sm:self-auto">
                  <div className="flex gap-1 text-[10px]">
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star-half-alt text-neo-yellow"></i>
                    <i className="far fa-star text-zinc-600"></i>
                  </div>
                  <span className="text-neo-yellow text-[10px] font-black">3.5/5</span>
                </div>
              </div>

              {/* Back End Developer (HIGHLIGHTED!) */}
              <div className="p-4 bg-[#E95420] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden rounded-none">
                {/* Ubuntu tag badge */}
                <div className="absolute top-0 right-0 bg-black text-neo-green font-black text-[8px] px-2.5 py-0.5 uppercase tracking-widest border-b-2 border-l-2 border-black">
                  {lang === "id" ? "FOKUS UTAMA" : "PRIMARY FOCUS"}
                </div>
                <div className="space-y-0.5">
                  <div className="text-black font-black text-sm sm:text-base uppercase flex items-center gap-1.5">
                    <span className="animate-pulse text-black">●</span> Back End Developer
                  </div>
                  <div className="text-[9px] text-black/80 font-bold font-mono">
                    PHP, Laravel, Python, TypeScript, Go, C#
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black px-2.5 py-1 border-2 border-black rounded flex-shrink-0 self-start sm:self-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]">
                  <div className="flex gap-1 text-[10px]">
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star-half-alt text-neo-yellow"></i>
                  </div>
                  <span className="text-neo-green text-[10px] font-black">4.5/5</span>
                </div>
              </div>

              {/* UI/UX Designer */}
              <div className="p-3 bg-[#2C001E]/20 border-2 border-black shadow-[3px_3px_0px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded">
                <div className="space-y-0.5">
                  <div className="text-white font-black text-xs sm:text-sm uppercase flex items-center gap-1.5">
                    <span className="text-neo-pink">●</span> UI/UX Designer
                  </div>
                  <div className="text-[9px] text-zinc-400 font-mono">
                    Figma, Canva, Wireframing, Prototyping
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-black/30 px-2.5 py-1 border border-zinc-800 rounded flex-shrink-0 self-start sm:self-auto">
                  <div className="flex gap-1 text-[10px]">
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="fas fa-star text-neo-yellow"></i>
                    <i className="far fa-star text-zinc-600"></i>
                    <i className="far fa-star text-zinc-600"></i>
                    <i className="far fa-star text-zinc-600"></i>
                  </div>
                  <span className="text-neo-yellow text-[10px] font-black">2.0/5</span>
                </div>
              </div>
            </div>

            <p className="text-[9px] text-zinc-500 italic mt-2.5 pt-1.5 border-t border-zinc-800/40">
              * {lang === "id" ? "Scroll ke bawah untuk melihat panel keahlian lengkap." : "Scroll down to see the full skills panel."}
            </p>
          </div>
        );
        break;
      case "./contact.sh":
      case "run contact.sh":
      case "sh contact.sh":
        result = (
          <div className="p-3 bg-[#2C001E]/40 border-2 border-black rounded text-[11px] space-y-2.5 mt-2 max-w-md font-mono select-text text-left">
            <div className="text-neo-orange font-black border-b border-zinc-800 pb-1 uppercase flex items-center justify-between">
              <span>[ contact.sh ]</span>
              <span className="text-[9px] text-neo-green font-black animate-pulse">● RUNNING</span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-1.5 bg-black border border-zinc-800">
                <span className="text-neo-pink font-black text-[10px]">LOCATION:</span>
                <span className="text-white font-bold">BALIKPAPAN, INDONESIA</span>
              </div>
              
              <div 
                className="flex items-center justify-between p-1.5 bg-black border border-zinc-800 cursor-pointer hover:bg-neo-blue hover:text-white transition-colors group"
                onClick={() => {
                  navigator.clipboard.writeText("farreldiegoakbar@gmail.com");
                  showToast(lang === "id" ? "✓ Email disalin ke clipboard!" : "✓ Email copied to clipboard!");
                }}
                title="Copy Email"
              >
                <span className="text-neo-blue group-hover:text-white font-black text-[10px]">EMAIL:</span>
                <span className="text-white font-bold underline break-all">farreldiego29@gmail.com</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href="#contact"
                className="neo-btn flex-1 py-1.5 bg-white text-black hover:bg-neo-pink text-[9px] font-black uppercase text-center border-2 border-black"
              >
                <i className="fas fa-paper-plane mr-1"></i> {t("about-hire")}
              </a>
              <a
                href="https://wa.me/6282155235200?text=Halo%20Bang"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn flex-1 py-1.5 bg-neo-green text-black text-[9px] font-black uppercase text-center border-2 border-black"
              >
                <i className="fab fa-whatsapp mr-1"></i> WhatsApp
              </a>
            </div>
          </div>
        );
        break;
      default:
        result = (
          <div className="text-red-500 font-mono text-xs mt-1 text-left">
            {lang === "id" 
              ? `Perintah tidak dikenal: '${trimmed}'. Ketik 'help' untuk daftar perintah.`
              : `Unknown command: '${trimmed}'. Type 'help' for available commands.`}
          </div>
        );
    }

    setTerminalHistory((prev) => [...prev, { command: trimmed, result }]);
    setTerminalInput("");
  };

  const startTypingSimulation = (cmd: string) => {
    if (isTypingSimulated) return;
    setIsTypingSimulated(true);
    setTerminalInput("");

    let currentLength = 0;
    const interval = setInterval(() => {
      currentLength++;
      setTerminalInput(cmd.slice(0, currentLength));
      if (currentLength >= cmd.length) {
        clearInterval(interval);
        setTimeout(() => {
          executeTerminalCommand(cmd);
          setIsTypingSimulated(false);
        }, 150);
      }
    }, 50);
  };

  // Refs for sliding nav active indicator
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
    height: 0,
    top: 0,
    opacity: 0,
    backgroundColor: "transparent",
  });

  const t = (key: keyof typeof translations["id"]) => {
    return translations[lang][key] || translations["en"][key] || key;
  };

  const handleMouseEnter = (sectionId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSection(sectionId);
    }, 150); // 150ms delay to debounce rapid swiping
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredSection(null);
  };

  // Clean up hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Hydration fix & Init
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set up observers and event listeners once fully mounted in DOM
  useEffect(() => {
    if (!mounted) return;

    // Scroll reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    // Scroll active link listener
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "certificates", "contact"];
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
    };
  }, [mounted]);

  // Update sliding indicator style on scroll, resize, or hover
  useEffect(() => {
    const updateIndicator = () => {
      const targetSection = hoveredSection || activeSection;
      const activeElement = navRefs.current[targetSection];
      if (activeElement) {
        const item = navItems.find((n) => n.id === targetSection);
        const bgColor = item ? item.color : "#FFD600";
        setIndicatorStyle({
          left: `${activeElement.offsetLeft}px`,
          width: `${activeElement.offsetWidth}px`,
          height: `${activeElement.offsetHeight}px`,
          top: `${activeElement.offsetTop}px`,
          opacity: 1,
          backgroundColor: bgColor,
        });
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    const timeout = setTimeout(updateIndicator, 100);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(timeout);
    };
  }, [activeSection, hoveredSection]);

  // Job title typing effect trigger
  useEffect(() => {
    if (!mounted) return;
    const textToType = lang === "id" ? "Programmer & Pengembang" : "Programmer & Developer";
    let currentLength = 0;
    setTypedTitle("");
    setIsTyping(true);
    const timer = setInterval(() => {
      currentLength++;
      setTypedTitle(textToType.slice(0, currentLength));
      if (currentLength >= textToType.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 75);
    return () => clearInterval(timer);
  }, [lang, mounted]);
 
  // Track window width on resize for isMobile check
  useEffect(() => {
    if (mounted) {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [mounted]);

  // Scroll parallax for certificates section
  useEffect(() => {
    if (!mounted) return;

    const handleParallaxScroll = () => {
      const el = document.getElementById("certificates");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Distance from center of viewport
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const diff = sectionCenter - viewportCenter;

        // Clamp scroll offset to prevent excessive shifts
        const clamped = Math.max(-400, Math.min(400, diff));
        setCertificatesScrollOffset(clamped);
      }
    };

    window.addEventListener("scroll", handleParallaxScroll, { passive: true });
    // Trigger once initially
    handleParallaxScroll();

    return () => {
      window.removeEventListener("scroll", handleParallaxScroll);
    };
  }, [mounted]);

  // Card stack handlers
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
    // Limit vertical drag for swiping stability
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

    // Staggered flyback reset
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
  }, [isDraggingCard, dragOffset, activeIndex]);

  // Slider Drag window-level registration
  useEffect(() => {
    if (!isDraggingSlider) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleSliderMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      handleSliderMove(e.touches[0].clientX);
    };

    const handleMouseUp = () => {
      handleSliderEnd();
    };

    const handleTouchEnd = () => {
      handleSliderEnd();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDraggingSlider, sliderX]);

  const getCardStyle = (index: number) => {
    const offset = cardOffsets[index];

    // Discarded / Thrown cards
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

    // If card is NOT thrown, determine its position in the active stack.
    let activeStackIndex = 0;
    for (let i = 0; i < index; i++) {
      if (cardOffsets[i]?.dir === null) {
        activeStackIndex++;
      }
    }

    // Stack display limits (render top 3 active cards visually, others hidden/none)
    const maxVisible = 3;
    if (activeStackIndex >= maxVisible) {
      return { display: "none" };
    }

    // Default stacked layout
    let rotate = 0;
    let translateY = 0;
    let translateX = 0;

    if (activeStackIndex === 0) {
      // Top card moves with user drag
      rotate = (dragOffset.x / 15) * 1.5; // subtle tilt on drag
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

  if (!mounted) {
    return <div className="min-h-screen bg-neo-bg text-black flex items-center justify-center font-sans">Loading...</div>;
  }

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 7 Retro game projects
  const projects = [
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
      descId: "Amerta AI adalah asisten bisnis pintar berbasis kecerdasan buatan (AI) yang dirancang untuk para pengusaha. Baik untuk bisnis yang baru merintis maupun yang sudah berkembang, Amerta menyederhanakan operasional Anda melalui pencatatan keuangan terintegrasi, manajemen stok barang, dan analisis data cerdas (AI insights) untuk mendukung keputusan bisnis yang lebih baik.",
      descEn: "Amerta AI is an intelligent, AI-powered business assistant tailored for entrepreneurs and business owners. Whether you are launching a startup or scaling an established enterprise, Amerta streamlines your operations with seamless financial tracking, inventory management, and actionable AI insights to drive smarter business decisions.",
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
      descId: "LibreNMS Report Automator adalah platform manajemen jaringan yang mengotomatisasi pemantauan data dari LibreNMS. Sistem ini dirancang khusus untuk menyederhanakan pengelolaan infrastruktur perangkat keras berskala besar—seperti router dan server—dengan melacak status perangkat secara real-time dan menghasilkan laporan harian otomatis berformat PDF secara efisien.",
      descEn: "LibreNMS Report Automator is a network management platform that automates device monitoring from LibreNMS. Tailored to streamline the administration of large-scale hardware infrastructures—such as routers and servers—this system tracks real-time device status and efficiently generates automated daily PDF reports for effortless network oversight.",
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
      descId: "Layanan Pengaduan Siswa adalah platform interaktif yang memudahkan siswa untuk menyampaikan laporan, keluhan, maupun aspirasi secara aman. Sistem ini terintegrasi dengan dasbor admin untuk meninjau dan menindaklanjuti setiap masukan, bertujuan untuk menciptakan lingkungan sekolah yang lebih transparan, responsif, dan nyaman bagi semua pihak.",
      descEn: "Student Grievance & Aspiration Portal is an interactive platform designed to help students safely submit reports, complaints, and ideas. Equipped with a dedicated admin dashboard for reviewing and processing submissions, this system aims to foster a more transparent, responsive, and supportive school environment for everyone.",
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
      descId: "Komponen UI Website adalah pustaka komponen UI yang terinspirasi dari gaya desain shadcn/ui, dikembangkan secara khusus menggunakan Laravel dan Tailwind CSS. Projek ini menyediakan koleksi komponen modular yang siap pakai dan mudah disesuaikan—mulai dari navbar, sidebar, hingga dropdown—untuk membantu developer membangun antarmuka web yang modern dan responsif dengan jauh lebih cepat.",
      descEn: "Website UI Components is a UI component library inspired by the design philosophy of shadcn/ui, built specifically with Laravel and Tailwind CSS. It offers a collection of highly customizable, ready-to-use modular components—including navbars, sidebars, and dropdowns—designed to help developers rapidly build modern and responsive web interfaces.",
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
      descId: "TiketPesawat adalah platform pemesanan penerbangan komprehensif yang terinspirasi dari aplikasi travel terkemuka. Dirancang dengan arsitektur kode yang rapi dan terstruktur (Separation of Concerns), website ini tidak hanya memudahkan pengguna mengeksplorasi destinasi wisata impian, tetapi juga mengelola informasi kompleks terkait jadwal pesawat, maskapai, dan operasional bandara secara efisien.",
      descEn: "TiketPesawat is a comprehensive flight booking platform inspired by leading travel applications. Developed with a clean and structured architecture (Separation of Concerns), this website provides an intuitive interface for users to explore dream destinations while efficiently managing complex data across flight schedules, airlines, and airports.",
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
      descId: "Game Ninja adalah permainan platformer 2D yang dikembangkan sepenuhnya menggunakan bahasa pemrograman Python. Pemain mengendalikan seorang ninja dengan mekanik pergerakan dinamis—berjalan, melompat, dan menunduk—untuk bertahan hidup dan melawan sekumpulan ninja jahat. Menawarkan sistem progressive scaling, tingkat kesulitan musuh dan rintangan akan terus meningkat seiring berjalannya permainan, memberikan tantangan yang tiada henti.",
      descEn: "Ninja Game is an action-packed 2D platformer game built entirely with Python. Players control a ninja equipped with dynamic movement mechanics—including running, jumping, and crouching—to survive and battle rogue, evil ninjas. Featuring a progressive scaling system, the difficulty of enemies and obstacles increases the longer you play, delivering an endlessly challenging gameplay experience.",
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

  // Certificates list
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

  // Form submission handler
  const handleFormSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSendingEmail) return false;

    // Validate inputs
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      showToast(lang === "id" ? "⚠ Mohon lengkapi semua bidang isian form!" : "⚠ Please fill out all form fields!");
      return false;
    }

    setIsSendingEmail(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_2n4ltaa";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_7kny2k3";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "-Lt7n87Y-ycodAbt-";

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      showToast(lang === "id" ? "✓ Pesan berhasil dikirim ke email!" : "✓ Message successfully sent to email!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSendingEmail(false);
      return true;
    } catch (error) {
      console.error("Failed to send email via EmailJS:", error);
      showToast(lang === "id" ? "❌ Gagal mengirim pesan. Silakan coba lagi nanti." : "❌ Failed to send message. Please try again later.");
      setIsSendingEmail(false);
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isSendingEmail) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Slider Drag Handlers
  const handleSliderStart = (clientX: number) => {
    if (isSendingEmail) return;
    setIsDraggingSlider(true);
    sliderStartPos.current = clientX - sliderX;
  };

  const handleSliderMove = (clientX: number) => {
    if (!isDraggingSlider || !sliderRef.current || isSendingEmail) return;
    const containerWidth = sliderRef.current.clientWidth;
    const isMobileSize = windowWidth < 640;
    const handleWidth = isMobileSize ? 80 : 112;
    const maxRange = containerWidth - handleWidth - 8;

    let newX = clientX - sliderStartPos.current;
    newX = Math.max(0, Math.min(maxRange, newX));
    setSliderX(newX);

    if (newX >= maxRange - 2) {
      setIsDraggingSlider(false);
      setSliderX(0);
      handleFormSubmit();
    }
  };

  const handleSliderEnd = () => {
    if (!isDraggingSlider || isSendingEmail) return;
    setIsDraggingSlider(false);
    setSliderX(0);
  };

  return (
    <div className="relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-neo-pink text-white border-4 border-black shadow-neo px-8 py-4 font-black uppercase tracking-wider text-center animate-slide-down-rope">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl sm:text-2xl font-black text-black uppercase tracking-tighter flex items-center">
              <span className="bg-neo-yellow px-2 py-0.5 border-2 border-black mr-1">Farrel</span> Diego Akbar
            </a>

            {/* Navigation Desktop */}
            <nav 
              className="relative hidden lg:flex items-center gap-1"
              onMouseLeave={handleMouseLeave}
            >
              {/* Sliding dynamic background block */}
              <div
                className="absolute transition-all duration-300 ease-out z-0"
                style={indicatorStyle}
              />
              {navItems.map((item) => (
                <a
                  key={item.id}
                  ref={(el) => {
                    navRefs.current[item.id] = el;
                  }}
                  href={`#${item.id}`}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  className="relative z-10 px-4 py-2 text-sm lg:text-base font-black text-black uppercase transition-colors duration-300 select-none"
                >
                  {t(`nav-${item.id}` as any)}
                </a>
              ))}
            </nav>

            {/* Language & Menu Actions */}
            <div className="flex items-center gap-4">
              <button
                id="lang-toggle"
                onClick={() => setLang((prev) => (prev === "id" ? "en" : "id"))}
                className="neo-btn px-4 py-2 bg-neo-purple text-white text-xs sm:text-sm tracking-widest font-black uppercase"
              >
                <span>{lang === "id" ? "EN" : "ID"}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden text-black focus:outline-none w-10 h-10 border-2 border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_#000000] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_0px_#000000]"
              >
                <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-lg sm:text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden mt-4 pb-4 space-y-2 bg-white border-t-2 border-black p-4 shadow-neo ${
              mobileMenuOpen ? "block" : "hidden"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              let activeBg = "bg-neo-yellow";
              if (item.id === "about") activeBg = "bg-neo-pink text-white";
              else if (item.id === "projects") activeBg = "bg-neo-blue text-white";
              else if (item.id === "skills") activeBg = "bg-neo-green text-black";
              else if (item.id === "certificates") activeBg = "bg-neo-purple text-white";
              else if (item.id === "contact") activeBg = "bg-neo-orange text-white";

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 font-black uppercase px-2 transition-colors duration-200 ${
                    isActive ? `${activeBg}` : "text-black hover:bg-gray-100"
                  }`}
                >
                  {t(`nav-${item.id}` as any)}
                </a>
              );
            })}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 border-b-8 border-black bg-neo-yellow"
      >
        {/* Dot pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

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
            {t("hero-greeting")}
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
              className="neo-btn px-8 py-4 text-sm sm:text-lg uppercase tracking-bold bg-neo-blue text-white w-full sm:w-auto"
            >
              {t("hero-view-work")}
            </a>
            <a
              href="https://wa.me/6282155235200?text=Halo%20Ayo%20Mutualan"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn px-8 py-4 text-sm sm:text-lg uppercase tracking-bold bg-neo-green text-black w-full sm:w-auto"
            >
              <i className="fab fa-whatsapp mr-2 text-xl"></i>
              <span>{t("hero-whatsapp")}</span>
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

      {/* About Section (Ubuntu Terminal Theme) */}
      <section id="about" className="py-20 sm:py-32 scroll-mt-16 white-grid-bg border-b-8 border-black overflow-hidden relative">
        {/* Decorative Grid corner indicators */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-black opacity-30 hidden md:block" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-black opacity-30 hidden md:block" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-black opacity-30 hidden md:block" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-black opacity-30 hidden md:block" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-16 text-center uppercase tracking-tighter reveal reveal-up">
            <span className="bg-neo-pink text-white px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform -rotate-1 hover:rotate-1 transition-transform duration-300 cursor-default">
              {t("about-title")}
            </span>
          </h2>

          {/* Ubuntu Terminal Console Window Screen (Rendered Directly) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch reveal reveal-up">
            {/* Command buttons shortcuts bar on the Left */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
              <div className="bg-white border-4 border-black p-4 shadow-neo flex flex-col space-y-3">
                <div className="text-xs font-black uppercase text-zinc-500 tracking-wider mb-1 text-left select-none">
                  {lang === "id" ? "Pilih Perintah Shortcut :" : "Select Shortcut Command:"}
                </div>
                
                <button
                  onClick={() => startTypingSimulation("profilefetch")}
                  disabled={isTypingSimulated}
                  className="neo-btn px-4 py-3 bg-neo-yellow text-black border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-between font-black uppercase text-xs sm:text-sm text-left"
                >
                  <span>profilefetch</span>
                  <i className="fas fa-terminal group-hover:translate-x-1 transition-transform"></i>
                </button>
                
                <button
                  onClick={() => startTypingSimulation("cat knowledge.md")}
                  disabled={isTypingSimulated}
                  className="neo-btn px-4 py-3 bg-neo-blue text-white border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-between font-black uppercase text-xs sm:text-sm text-left"
                >
                  <span>cat knowledge.md</span>
                  <i className="fas fa-file-alt group-hover:translate-x-1 transition-transform"></i>
                </button>
                
                <button
                  onClick={() => startTypingSimulation("ls skills/")}
                  disabled={isTypingSimulated}
                  className="neo-btn px-4 py-3 bg-neo-green text-black border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-between font-black uppercase text-xs sm:text-sm text-left"
                >
                  <span>ls skills/</span>
                  <i className="fas fa-folder-open group-hover:translate-x-1 transition-transform"></i>
                </button>
                
                <button
                  onClick={() => startTypingSimulation("./contact.sh")}
                  disabled={isTypingSimulated}
                  className="neo-btn px-4 py-3 bg-neo-orange text-white border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-between font-black uppercase text-xs sm:text-sm text-left"
                >
                  <span>./contact.sh</span>
                  <i className="fas fa-play group-hover:translate-x-1 transition-transform"></i>
                </button>
                
                <button
                  onClick={() => {
                    if (!isTypingSimulated) {
                      executeTerminalCommand("clear");
                    }
                  }}
                  disabled={isTypingSimulated}
                  className="neo-btn px-4 py-2 bg-zinc-100 text-black font-black uppercase text-xs text-center border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 mt-2"
                >
                  {lang === "id" ? "Bersihkan Terminal" : "Clear Terminal"}
                </button>
              </div>
            </div>

            {/* Terminal Simulator Mock Window on the Right */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="bg-[#300A24] border-4 border-black shadow-neo-lg rounded-none flex-1 flex flex-col min-h-[380px] sm:min-h-[440px]">
                {/* Ubuntu Terminal header bar */}
                <div className="bg-[#2c001e] border-b-4 border-black px-4 py-3 flex items-center justify-between select-none">
                  {/* Yaru controls with interactive reset/clear actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        if (!isTypingSimulated) executeTerminalCommand("clear");
                      }}
                      className="w-3.5 h-3.5 rounded-full bg-[#E95420] border-2 border-black flex items-center justify-center text-[8px] font-black text-black hover:bg-red-600 transition-colors cursor-pointer"
                      title="Clear screen history"
                    >
                      ×
                    </button>
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 border-2 border-black" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-black" />
                  </div>
                  {/* Active Path Label */}
                  <div className="text-zinc-400 font-mono text-xs uppercase tracking-wider font-bold">
                    farrel@ubuntu-desktop: ~/portfolio
                  </div>
                  {/* Console indicator */}
                  <div className="text-[10px] text-neo-orange font-mono border border-neo-orange px-1.5 py-0.5 rounded font-black tracking-widest animate-pulse">
                    UBUNTU
                  </div>
                </div>

                {/* Viewport Console logs */}
                <div 
                  ref={terminalViewportRef}
                  className="flex-1 p-4 overflow-y-auto text-left font-mono space-y-4 max-h-[320px] sm:max-h-[360px] terminal-scrollbar select-text"
                >
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      {item.command && (
                        <div className="flex items-center text-neo-green font-bold text-xs select-none">
                          <span className="text-zinc-500 mr-2">farrel@ubuntu-desktop:~$</span>
                          <span className="text-white">{item.command}</span>
                        </div>
                      )}
                      <div className="text-zinc-200 mt-1 select-text">
                        {item.result}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Interactive Prompt Form */}
                <div className="bg-[#1C0515] border-t-2 border-zinc-900 p-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isTypingSimulated) return;
                      executeTerminalCommand(terminalInput);
                    }}
                    className="flex items-center text-xs font-mono"
                  >
                    <span className="text-zinc-500 font-bold mr-2 select-none">farrel@ubuntu-desktop:~$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => {
                        if (!isTypingSimulated) {
                          setTerminalInput(e.target.value);
                        }
                      }}
                      disabled={isTypingSimulated}
                      className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-zinc-700 disabled:text-zinc-500"
                      placeholder={isTypingSimulated ? "" : lang === "id" ? "Coba ketik 'help' & tekan enter..." : "try type 'help' & press enter..."}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                    <span className="animate-terminal-blink bg-neo-orange w-2 h-4 ml-1 inline-block select-none" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Card Stack */}
      <section id="projects" className="py-20 sm:py-32 border-y-8 border-black bg-neo-blue relative overflow-hidden">
        {/* Retro scanlines effect overlay */}
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

          {/* Retro Arcade Machine Screen Container */}
          <div className="max-w-md md:max-w-4xl mx-auto w-full reveal reveal-scale">
            <div className="bg-zinc-900 border-[6px] border-black shadow-neo-xl p-4 relative rounded-none flex flex-col">
              {/* Arcade top screen decals */}
              <div className="w-full flex justify-between items-center text-[10px] text-zinc-400 font-mono border-b-2 border-zinc-800 pb-2 mb-2 select-none">
                <span className="text-neo-pink font-black tracking-widest animate-pulse">● INSERT COIN</span>
                <span className="font-bold">FARREL'S PROJECTS</span>
                <span className="text-neo-green font-black">P1 SCORE: {remainingCount.toString().padStart(2, "0")} / 07</span>
              </div>

              {/* Split Body Container */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0 w-full items-stretch border-2 border-black rounded-sm overflow-hidden">
                {/* Screen / Stack Area */}
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
                            {/* Top bar header */}
                            <div className="flex justify-between items-center bg-black text-white px-2 py-1 text-[8px] font-mono tracking-wider mb-2 select-none border border-black uppercase w-full">
                              <span>DECK NO: {(idx + 1).toString().padStart(2, "0")} / 07</span>
                              <span className="text-neo-yellow font-black">SIDE A</span>
                            </div>

                            {/* Vertical Stack Content (Landscape Image & Details) */}
                            <div className="flex-1 flex flex-col gap-2.5">
                              {/* Visual Image container (Always Landscape) */}
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
                                {/* Zoom Icon Overlay Indicator */}
                                <div className="absolute top-2 right-2 bg-black/60 text-white p-1.5 border border-black hover:bg-black transition-colors rounded-none opacity-0 group-hover/img:opacity-100 pointer-events-none flex items-center justify-center">
                                  <i className="fas fa-expand-arrows-alt text-xs"></i>
                                </div>
                              </div>

                              {/* Title & Desc & Action */}
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
                                  {/* Tech tags */}
                                  <div className="flex flex-wrap gap-2 mb-1">
                                    {proj.tags.map((tag, tIdx) => {
                                      const hasLibraries = !!(tag as any).libraries;
                                      return (
                                        <div key={tIdx} className={hasLibraries ? "relative flex items-center group/python-tag" : "relative"}>
                                          <a
                                            href={tag.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`relative group w-8 h-8 md:w-11 md:h-11 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_0px_#000] transition-all duration-150 cursor-pointer rounded-none ${tag.color}`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                            }}
                                            onMouseDown={(e) => {
                                              e.stopPropagation();
                                            }}
                                            onTouchStart={(e) => {
                                              e.stopPropagation();
                                            }}
                                          >
                                            <div className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center select-none transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">
                                              {renderTagIcon(tag)}
                                            </div>
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 left-0 opacity-0 scale-90 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 flex flex-col items-start z-[60]">
                                              <div className="bg-neo-yellow text-black text-[9px] font-mono py-1 px-2 border-2 border-black whitespace-nowrap shadow-[2px_2px_0px_0px_#000] font-black uppercase">
                                                {tag.name} ↗
                                              </div>
                                              <div className="w-1.5 h-1.5 bg-neo-yellow transform rotate-45 -mt-1 ml-3 md:ml-4 border-r-2 border-b-2 border-black"></div>
                                            </div>
                                          </a>

                                          {/* Sub-libraries expanded list */}
                                          {hasLibraries && (tag as any).libraries && (
                                            <div className="flex items-center gap-2 transition-all duration-500 ease-out max-w-0 overflow-hidden group-hover/python-tag:max-w-[500px] group-hover/python-tag:ml-2">
                                              {(tag as any).libraries.map((lib: any, lIdx: number) => (
                                                <a
                                                  key={lIdx}
                                                  href={lib.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className={`relative group/lib-item w-8 h-8 md:w-11 md:h-11 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-[1px_1px_0px_0px_#000] transition-all duration-300 ease-out opacity-0 scale-50 -translate-x-4 group-hover/python-tag:opacity-100 group-hover/python-tag:scale-100 group-hover/python-tag:translate-x-0 pointer-events-none group-hover/python-tag:pointer-events-auto rounded-none ${lib.color}`}
                                                  style={{ transitionDelay: `${lIdx * 50}ms` }}
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                  }}
                                                  onMouseDown={(e) => {
                                                    e.stopPropagation();
                                                  }}
                                                  onTouchStart={(e) => {
                                                    e.stopPropagation();
                                                  }}
                                                >
                                                  <div className="w-5 h-5 md:w-7 md:h-7 flex items-center justify-center select-none transform group-hover/lib-item:scale-110 group-hover/lib-item:rotate-6 transition-transform duration-200">
                                                    {renderTagIcon(lib)}
                                                  </div>

                                                  {/* Tooltip */}
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

                                  {/* Source code button */}
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
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                      onMouseDown={(e) => {
                                        e.stopPropagation();
                                      }}
                                      onTouchStart={(e) => {
                                        e.stopPropagation();
                                      }}
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

                    {/* Game Over Screen overlay */}
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

                {/* Arcade Controller Console Desk / Sidebar */}
                <div className="col-span-12 md:col-span-4 bg-zinc-800 border-t-4 md:border-t-0 md:border-l-4 border-black p-3.5 md:p-6 flex md:flex-col justify-between md:justify-center items-center md:gap-8 rounded-none select-none">
                  {/* Visual D-Pad */}
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

                  {/* Status Indicator Screen */}
                  <div className="bg-black/80 border border-zinc-700 px-3 py-2 md:py-4 flex flex-col justify-center items-center text-center w-28 md:w-full rounded-sm select-none">
                    <div className="text-[7px] md:text-[9px] text-zinc-500 font-mono font-black uppercase">REMAINING</div>
                    <div className="text-neo-yellow font-mono text-base md:text-xl font-black leading-none mt-1 animate-pulse">
                      {remainingCount.toString().padStart(2, "0")} / 07
                    </div>
                  </div>

                  {/* Controller Action buttons */}
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
      </section>

      {/* Skills Marquee Banner */}
      <section id="skills" className="py-20 bg-white overflow-hidden scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-12 text-center uppercase tracking-tighter reveal reveal-up">
            <span className="bg-neo-green text-black px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform rotate-1 hover:-rotate-1 transition-transform duration-300 cursor-default">
              {t("nav-skills")}
            </span>
          </h2>
        </div>

        {/* Interactive Vending Machine Illustration */}
        <div className="max-w-4xl mx-auto px-4 reveal reveal-up select-none">
          <div className="bg-[#8338EC] border-[6px] border-black shadow-neo-xl p-4 sm:p-6 relative rounded-none flex flex-col items-stretch select-none">
            {/* Machine Header Banner */}
            <div className="bg-black text-white font-mono border-b-4 border-black p-3 mb-4 select-none text-center">
              <div className="text-lg sm:text-2xl font-black tracking-widest animate-pulse">👾 Farrel's Tech Stack 👾</div>
              <div className="text-[9px] sm:text-xs text-neo-green font-bold tracking-wider mt-1 uppercase">
                {lang === "id" ? "MASUKKAN KOIN & TEKAN TOMBOL UNTUK MENGAMBIL SKILL!" : "INSERT COIN & PRESS BUTTON TO COLLECT SKILLS"}
              </div>
            </div>

            {/* Display Screen Box (Glass Window) */}
            <div
              ref={containerRef}
              className="w-full h-[360px] sm:h-[450px] border-4 border-black bg-zinc-900 relative overflow-hidden shadow-inner select-none mb-6"
              style={{
                backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.35) 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px"
              }}
            >
              {/* Inner screen glass glare reflection overlays */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-black/20 z-30" />
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] z-30" />

              {/* Empty display screen text instructions helper */}
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

              {/* Falling Capsule Cards Layer */}
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
                  {renderNodeIcon(item.id.split("-")[0], item.textWhite)}

                  {/* HTML Hover Tooltip */}
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

            {/* Control Panel Deck Console */}
            <div className="bg-zinc-800 border-4 border-black p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-zinc-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-center mb-3 font-bold select-none">
                🎮 CONTROL PANEL - DROP CATEGORIES 🎮
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Frontend & Design */}
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

                {/* Backend & Database */}
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

                {/* DevOps & API */}
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

            {/* Bottom Retriever slots Decals */}
            <div className="flex justify-between items-stretch gap-6 h-20">
              {/* Prize Slot tray dispenser */}
              <div className="flex-1 bg-zinc-950 border-4 border-black shadow-inner relative flex items-center justify-center">
                <div className="w-4/5 h-[80%] bg-zinc-900 border-2 border-zinc-800 rounded-sm flex items-center justify-center text-[9px] font-mono text-zinc-600 font-bold select-none uppercase">
                  Prize Slot
                </div>
                {/* Grab / Clear button when items exist */}
                {vendingItemsState.length > 0 && (
                  <button
                    onClick={() => {
                      // Don't trigger again if already popping
                      if (vendingItemsRef.current.some(it => it.isPopping)) return;
                      
                      vendingItemsRef.current = vendingItemsRef.current.map((item) => ({
                        ...item,
                        isPopping: true,
                      }));
                      setVendingItemsState([...vendingItemsRef.current]);

                      // Clear items after pop-out animation (350ms)
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

              {/* Coin Slot entry interface */}
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

      {/* Certificates Section */}
      <section id="certificates" className="py-20 sm:py-32 bg-neo-yellow border-y-8 border-black scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-16 text-center uppercase tracking-tighter reveal reveal-up">
            <span className="bg-white text-black px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform -rotate-1 hover:rotate-1 transition-transform duration-300 cursor-default">
              {t("nav-certificates")}
            </span>
          </h2>

          <div 
            className="flex flex-col md:flex-row justify-center items-center md:items-end gap-12 md:gap-4 max-w-5xl mx-auto py-12 px-4 select-none"
            onMouseLeave={() => setHoveredPodium(null)}
          >
            {certificates.map((cert, idx) => {
              const activePodiumIndex = hoveredPodium !== null ? hoveredPodium : 1;
              const isActive = activePodiumIndex === idx;
              const isMobile = windowWidth < 768;
              
              // Pedestal settings
              let pedestalHeight = "";
              let pedestalBg = "";
              let pedestalLabel = "";
              let shadowClass = "";
              
              if (idx === 0) {
                // Left Card (Podium 2)
                pedestalHeight = "h-16";
                pedestalBg = "bg-neo-blue text-white";
                pedestalLabel = "2nd";
                shadowClass = isActive ? "shadow-neo-xl" : "shadow-neo";
              } else if (idx === 1) {
                // Center Card (Podium 1)
                pedestalHeight = "h-24";
                pedestalBg = "bg-neo-yellow text-black";
                pedestalLabel = "1st";
                shadowClass = isActive ? "shadow-neo-xl" : "shadow-neo";
              } else {
                // Right Card (Podium 3)
                pedestalHeight = "h-10";
                pedestalBg = "bg-neo-pink text-white";
                pedestalLabel = "3rd";
                shadowClass = isActive ? "shadow-neo-xl" : "shadow-neo";
              }

              // Parallax calculation
              const parallaxSpeed = idx === 0 ? 0.04 : idx === 1 ? 0.08 : 0.02;
              const parallaxY = certificatesScrollOffset * parallaxSpeed;
              
              // Hover calculation
              const hoverY = isActive ? (isMobile ? -16 : -24) : 0;
              const hoverX = isActive ? (idx === 0 ? 8 : idx === 2 ? -8 : 0) : 0;
              const activeScale = isActive ? (isMobile ? 1.05 : 1.1) : (isMobile ? 0.95 : 0.88);
              const totalY = hoverY + parallaxY;

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
                  {/* Certificate Card */}
                  <div
                    onClick={() => setSelectedCert(cert)}
                    className={`bg-white border-4 border-black p-4 cursor-pointer flex flex-col transition-all duration-300 ease-out select-none w-full ${shadowClass}`}
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

                  {/* Pedestal */}
                  <div className={`hidden md:flex ${pedestalHeight} ${pedestalBg} border-4 border-black shadow-neo w-[90%] mt-4 flex-col items-center justify-center font-mono font-black text-sm tracking-widest transition-transform duration-300 ease-out ${isActive ? "scale-105" : "scale-100"}`}>
                    {pedestalLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 bg-neo-green border-y-8 border-black scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-16 text-center uppercase tracking-tighter reveal reveal-up">
            <span className="bg-white text-black px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform -rotate-1 hover:rotate-1 transition-transform duration-300 cursor-default">
              {t("nav-contact")}
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Details */}
            <div className="reveal reveal-left">
              <h3 className="text-xl sm:text-2xl font-black mb-8 uppercase tracking-tight text-black">
                {t("contact-info-title")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-start p-6 bg-white border-4 border-black shadow-neo">
                  <div className="w-12 h-12 border-2 border-black bg-neo-pink flex items-center justify-center mr-4 flex-shrink-0 text-white text-lg">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black mb-1 uppercase">{t("contact-location-title")}</h4>
                    <p className="text-black font-black text-sm uppercase">Balikpapan, Indonesia</p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    navigator.clipboard.writeText("farreldiego29@gmail.com");
                    showToast(lang === "id" ? "✓ Email disalin ke clipboard!" : "✓ Email copied to clipboard!");
                  }}
                  className="flex items-start p-6 bg-white border-4 border-black shadow-neo cursor-pointer hover:bg-zinc-50 hover:-translate-y-1 active:translate-y-0 active:shadow-neo transition-all duration-150 relative group"
                >
                  <div className="w-12 h-12 border-2 border-black bg-neo-blue flex items-center justify-center mr-4 flex-shrink-0 text-white text-lg">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm sm:text-base font-black mb-1 uppercase">{t("contact-email-title")}</h4>
                      <span className="text-[8px] sm:text-[9px] text-zinc-500 font-mono font-bold tracking-wider uppercase border border-zinc-300 px-1 bg-zinc-100 rounded-none group-hover:bg-neo-yellow group-hover:text-black transition-colors">
                        {lang === "id" ? "Klik untuk salin" : "Click to copy"}
                      </span>
                    </div>
                    <p className="text-black font-black text-sm break-all">farreldiego29@gmail.com</p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    navigator.clipboard.writeText("+6282155235200");
                    showToast(lang === "id" ? "✓ Nomor telepon disalin ke clipboard!" : "✓ Phone number copied to clipboard!");
                  }}
                  className="flex items-start p-6 bg-white border-4 border-black shadow-neo cursor-pointer hover:bg-zinc-50 hover:-translate-y-1 active:translate-y-0 active:shadow-neo transition-all duration-150 relative group"
                >
                  <div className="w-12 h-12 border-2 border-black bg-neo-yellow flex items-center justify-center mr-4 flex-shrink-0 text-black text-lg">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm sm:text-base font-black mb-1 uppercase">{t("contact-phone-title")}</h4>
                      <span className="text-[8px] sm:text-[9px] text-zinc-500 font-mono font-bold tracking-wider uppercase border border-zinc-300 px-1 bg-zinc-100 rounded-none group-hover:bg-neo-yellow group-hover:text-black transition-colors">
                        {lang === "id" ? "Klik untuk salin" : "Click to copy"}
                      </span>
                    </div>
                    <p className="text-black font-black text-sm uppercase">+62 821 5523 5200</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Send Form */}
            <div className="reveal reveal-right delay-100">
              <h3 className="text-xl sm:text-2xl font-black mb-8 uppercase tracking-tight text-black">
                {t("contact-message-title")}
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex flex-col items-start gap-1.5 text-left w-full">
                  <label htmlFor="name" className="text-black font-black uppercase text-xs tracking-wider select-none">
                    {t("form-name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder={lang === "id" ? "Masukkan nama Anda..." : "Enter your name..."}
                    className={`form-input w-full px-4 py-4 border-4 border-black font-black focus:outline-none transition-all duration-300 text-black ${
                      isSendingEmail
                        ? "bg-zinc-100 opacity-50 cursor-not-allowed shadow-[2px_2px_0px_0px_#000]"
                        : focusedInput === "name" 
                          ? "bg-neo-yellow scale-[1.02] shadow-[8px_8px_0px_0px_#000] sm:shadow-[12px_12px_0px_0px_#000] z-10" 
                          : focusedInput !== null 
                            ? "bg-white opacity-50 scale-[0.98] shadow-[2px_2px_0px_0px_#000]" 
                            : "bg-white opacity-100 scale-100 shadow-neo"
                    }`}
                    required
                    disabled={isSendingEmail}
                  />
                </div>

                <div className="flex flex-col items-start gap-1.5 text-left w-full">
                  <label htmlFor="email" className="text-black font-black uppercase text-xs tracking-wider select-none">
                    {t("form-email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder={lang === "id" ? "Masukkan email Anda..." : "Enter your email..."}
                    className={`form-input w-full px-4 py-4 border-4 border-black font-black focus:outline-none transition-all duration-300 text-black ${
                      isSendingEmail
                        ? "bg-zinc-100 opacity-50 cursor-not-allowed shadow-[2px_2px_0px_0px_#000]"
                        : focusedInput === "email" 
                          ? "bg-neo-pink scale-[1.02] shadow-[8px_8px_0px_0px_#000] sm:shadow-[12px_12px_0px_0px_#000] z-10" 
                          : focusedInput !== null 
                            ? "bg-white opacity-50 scale-[0.98] shadow-[2px_2px_0px_0px_#000]" 
                            : "bg-white opacity-100 scale-100 shadow-neo"
                    }`}
                    required
                    disabled={isSendingEmail}
                  />
                </div>

                <div className="flex flex-col items-start gap-1.5 text-left w-full">
                  <label htmlFor="subject" className="text-black font-black uppercase text-xs tracking-wider select-none">
                    {t("form-subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput("subject")}
                    onBlur={() => setFocusedInput(null)}
                    placeholder={lang === "id" ? "Masukkan subjek pesan..." : "Enter message subject..."}
                    className={`form-input w-full px-4 py-4 border-4 border-black font-black focus:outline-none transition-all duration-300 text-black ${
                      isSendingEmail
                        ? "bg-zinc-100 opacity-50 cursor-not-allowed shadow-[2px_2px_0px_0px_#000]"
                        : focusedInput === "subject" 
                          ? "bg-neo-yellow scale-[1.02] shadow-[8px_8px_0px_0px_#000] sm:shadow-[12px_12px_0px_0px_#000] z-10" 
                          : focusedInput !== null 
                            ? "bg-white opacity-50 scale-[0.98] shadow-[2px_2px_0px_0px_#000]" 
                            : "bg-white opacity-100 scale-100 shadow-neo"
                    }`}
                    required
                    disabled={isSendingEmail}
                  />
                </div>

                <div className="flex flex-col items-start gap-1.5 text-left w-full">
                  <label htmlFor="message" className="text-black font-black uppercase text-xs tracking-wider select-none">
                    {t("form-message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput("message")}
                    onBlur={() => setFocusedInput(null)}
                    rows={5}
                    placeholder={lang === "id" ? "Tulis pesan Anda disini..." : "Write your message here..."}
                    className={`form-input w-full px-4 py-4 border-4 border-black font-black focus:outline-none transition-all duration-300 text-black ${
                      isSendingEmail
                        ? "bg-zinc-100 opacity-50 cursor-not-allowed shadow-[2px_2px_0px_0px_#000]"
                        : focusedInput === "message" 
                          ? "bg-neo-pink scale-[1.02] shadow-[8px_8px_0px_0px_#000] sm:shadow-[12px_12px_0px_0px_#000] z-10" 
                          : focusedInput !== null 
                            ? "bg-white opacity-50 scale-[0.98] shadow-[2px_2px_0px_0px_#000]" 
                            : "bg-white opacity-100 scale-100 shadow-neo"
                    }`}
                    required
                    disabled={isSendingEmail}
                  ></textarea>
                </div>

                {/* Neobrutalist Slide to Send Slider */}
                <div 
                  ref={sliderRef}
                  className={`relative w-full h-16 sm:h-20 border-4 border-black shadow-neo flex items-center justify-start select-none overflow-hidden transition-all duration-300 ${
                    isSendingEmail ? "bg-zinc-800" : "bg-zinc-950"
                  }`}
                >
                  <div 
                    className={`absolute left-0 top-0 bottom-0 border-r-2 border-black/20 transition-all ${
                      isSendingEmail ? "bg-neo-yellow/30 w-full animate-pulse" : "bg-neo-green/30"
                    }`}
                    style={isSendingEmail ? {} : { width: `${sliderX}px` }}
                  />

                  <div
                    onMouseDown={(e) => handleSliderStart(e.clientX)}
                    onTouchStart={(e) => {
                      if (e.touches.length > 0) handleSliderStart(e.touches[0].clientX);
                    }}
                    className={`absolute top-0 bottom-0 w-20 sm:w-28 border-r-4 border-black flex items-center justify-center text-black shadow-[2px_0px_5px_rgba(0,0,0,0.15)] transition-all ${
                      isSendingEmail
                        ? "bg-neo-yellow cursor-not-allowed left-1/2 -translate-x-1/2 scale-95 animate-pulse"
                        : "bg-neo-green cursor-grab active:cursor-grabbing"
                    }`}
                    style={
                      isSendingEmail 
                        ? { transform: "none" } 
                        : { 
                            transform: `translate3d(${sliderX}px, 0, 0)`,
                            transition: isDraggingSlider ? "none" : "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                          }
                    }
                  >
                    {isSendingEmail ? (
                      <div className="flex flex-col items-center select-none pointer-events-none">
                        <i className="fas fa-spinner animate-spin text-xs sm:text-sm mb-0.5"></i>
                        <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider">{lang === "id" ? "KIRIM..." : "SENDING..."}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center select-none pointer-events-none">
                        <i className="fas fa-paper-plane text-xs sm:text-sm animate-pulse mb-0.5"></i>
                        <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider">{lang === "id" ? "GESER" : "DRAG"}</span>
                      </div>
                    )}
                  </div>

                  <div className={`w-full text-center font-mono font-black text-[9px] sm:text-xs tracking-widest uppercase pointer-events-none select-none z-0 pr-4 sm:pr-8 transition-colors duration-300 ${
                    isSendingEmail ? "text-neo-yellow pl-4" : "text-white/40 pl-20 sm:pl-28"
                  }`}>
                    {isSendingEmail 
                      ? (lang === "id" ? "SEDANG MENGIRIM PESAN..." : "SENDING MESSAGE...")
                      : (lang === "id" ? "Geser ke kanan untuk mengirim >>>" : "Slide to right to send >>>")}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white border-t-8 border-black select-none">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="mb-2 md:mb-0">
              <a href="#" className="text-xl sm:text-2xl font-black uppercase tracking-tighter flex items-center">
                <span className="bg-neo-yellow text-black px-2 py-0.5 border-2 border-white mr-1">Farrel</span> Diego Akbar
              </a>
            </div>

            <div className="flex space-x-6 mb-2 md:mb-0">
              <a
                href="https://github.com/farrel-codenoob29"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-12 h-12 bg-neo-blue flex items-center justify-center text-white footer-social-btn"
                title="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="http://linkedin.com/in/farrel-diego-512595345/?_l=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-12 h-12 bg-neo-purple flex items-center justify-center text-white footer-social-btn"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a
                href="https://www.instagram.com/religoo_29/"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-12 h-12 bg-neo-pink flex items-center justify-center text-white footer-social-btn"
                title="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="https://wa.me/6282155235200"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-12 h-12 bg-neo-green flex items-center justify-center text-black footer-social-btn"
                title="WhatsApp"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
            </div>

            <div className="text-white/80 font-black uppercase text-xs">
              © {new Date().getFullYear()} Farrel Diego Akbar.
            </div>
          </div>
        </div>
      </footer>

      {/* Dynamic Image Lightbox Overlay Modal */}
      {activeImageLightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex flex-col items-center justify-center p-4 md:p-8 select-none"
          onClick={() => setActiveImageLightbox(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImageLightbox(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-neo-pink text-white border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-[1px_1px_0px_0px_#000] flex items-center justify-center font-black text-2xl hover:bg-white hover:text-black transition-all cursor-pointer z-[210]"
          >
            ×
          </button>
          
          {/* Lightbox Image Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] border-[6px] border-black bg-zinc-900 shadow-neo-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image box itself
          >
            <img
              src={activeImageLightbox}
              alt="Fullscreen Preview"
              className="max-w-full max-h-[80vh] object-contain block pointer-events-auto"
            />
            {/* Image caption/helper */}
            <div className="bg-black text-white text-[10px] font-mono p-2 text-center border-t-4 border-black uppercase select-none">
              {lang === "id" ? "Tekan tombol '×' atau klik di luar untuk menutup" : "Press '×' button or click outside to close"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
