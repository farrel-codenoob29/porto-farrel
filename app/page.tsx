"use client";

import React, { useState, useEffect, useRef } from "react";

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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedCert, setSelectedCert] = useState<{
    title: string;
    org: string;
    year: string;
    image: string;
    desc: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  // Terminal Simulator State
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; result: React.ReactNode }>>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isTypingSimulated, setIsTypingSimulated] = useState(false);
  const terminalViewportRef = useRef<HTMLDivElement>(null);

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
                  src="/img/profil.jpg"
                  alt="Farrel Diego Akbar"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            </div>
            {/* Developer Specs */}
            <div className="sm:col-span-8 space-y-1.5 text-xs sm:text-[13px] text-zinc-300">
              <div className="text-neo-orange font-black text-sm sm:text-base">farrel@ubuntu-desktop</div>
              <div className="text-zinc-500 font-bold">---------------------</div>
              <div><span className="text-neo-pink font-bold">OS:</span> Farrel-OS v29.0.108 (Developer Edition)</div>
              <div><span className="text-neo-pink font-bold">Host:</span> Farrel Diego Akbar</div>
              <div><span className="text-neo-pink font-bold">Role:</span> Junior Full Stack Developer</div>
              <div><span className="text-neo-pink font-bold">Education:</span> SMK Rekayasa Perangkat Lunak</div>
              <div><span className="text-neo-pink font-bold">Location:</span> Balikpapan, Indonesia</div>
              <div><span className="text-neo-pink font-bold">Shell:</span> bash 5.2.15</div>
              <div><span className="text-neo-pink font-bold">WM:</span> Next.js (Neobrutalism)</div>
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
              <span>{lang === "id" ? "[ KEAHLIAN / TEKNOLOGI ]" : "[ CORE SKILLS / TECH ]"}</span>
              <span className="text-[9px] text-zinc-500 font-normal">6 categories</span>
            </div>
            
            <div className="space-y-3.5 pt-1 text-[10px] text-white">
              {/* Category: Programming Languages */}
              <div className="space-y-1">
                <div className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <span>💻</span>
                  <span>{lang === "id" ? "Bahasa Pemrograman" : "Programming Languages"}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#777BB4] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">PHP</span>
                  <span className="bg-[#0175C2] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">DART</span>
                  <span className="bg-[#3776AB] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">PYTHON</span>
                  <span className="bg-[#68217A] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">C#</span>
                  <span className="bg-[#F7DF1E] text-black px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">JavaScript</span>
                  <span className="bg-[#3178C6] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">TypeScript</span>
                  <span className="bg-[#00ADD8] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">GO</span>
                </div>
              </div>

              {/* Category: Frameworks */}
              <div className="space-y-1">
                <div className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <span>🧱</span>
                  <span>Frameworks</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#FF2D20] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Laravel</span>
                  <span className="bg-[#02569B] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Flutter</span>
                  <span className="bg-[#61DAFB] text-black px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">React</span>
                  <span className="bg-black text-white px-1.5 py-0.5 font-black border border-zinc-700 shadow-[1px_1px_0px_0px_#000] uppercase">Next</span>
                  <span className="bg-[#00ADD8] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Gin</span>
                </div>
              </div>

              {/* Category: Databases */}
              <div className="space-y-1">
                <div className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <span>🗄️</span>
                  <span>Databases</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#4479A1] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">MySQL</span>
                  <span className="bg-[#CC292B] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Microsoft SQL Server</span>
                  <span className="bg-[#FFCA28] text-black px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Firebase</span>
                  <span className="bg-[#336791] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">PostgreSQL</span>
                </div>
              </div>

              {/* Category: API */}
              <div className="space-y-1">
                <div className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <span>🌐</span>
                  <span>API</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#007ACC] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">REST API</span>
                  <span className="bg-[#E34F26] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">SOAP API</span>
                  <span className="bg-[#E10098] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">GraphQL</span>
                  <span className="bg-black text-white px-1.5 py-0.5 font-black border border-zinc-700 shadow-[1px_1px_0px_0px_#000] uppercase">WebSockets</span>
                </div>
              </div>

              {/* Category: DevOps & CI/CD */}
              <div className="space-y-1">
                <div className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <span>🚀</span>
                  <span>DevOps & CI/CD</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#1485B8] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Jenkins</span>
                  <span className="bg-[#F47A20] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Grafana</span>
                  <span className="bg-[#E6522C] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Prometheus</span>
                  <span className="bg-[#E2703A] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Proxmox</span>
                </div>
              </div>

              {/* Category: Tools & Design */}
              <div className="space-y-1">
                <div className="text-zinc-400 font-bold uppercase text-[9px] tracking-wider flex items-center gap-1">
                  <span>🛠️</span>
                  <span>Tools & Design</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#FF6C37] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Postman</span>
                  <span className="bg-[#F24E1E] px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Figma</span>
                  <span className="bg-[#00C4CC] text-black px-1.5 py-0.5 font-black border border-black shadow-[1px_1px_0px_0px_#000] uppercase">Canva</span>
                </div>
              </div>
            </div>

            <p className="text-[9px] text-zinc-500 italic mt-2.5 pt-1.5 border-t border-zinc-800/40">
              * {lang === "id" ? "Scroll ke bawah untuk melihat panel keahlian." : "Scroll down to see the skills panel."}
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
                <span className="text-white font-bold underline break-all">farreldiegoakbar@gmail.com</span>
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
                href="https://wa.me/6281234567890?text=Halo%20Farrel%20Diego%20Akbar"
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

    // Responsive carousel width sizing
    const handleResize = () => {
      setItemsPerView(window.innerWidth <= 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

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
      window.removeEventListener("resize", handleResize);
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

  // Carousel actions
  const moveCarousel = (direction: number) => {
    const totalProjects = 13;
    setCarouselIndex((prev) => {
      let nextIndex = prev + direction;
      const maxIndex = totalProjects - itemsPerView;
      if (nextIndex > maxIndex) {
        return 0;
      } else if (nextIndex < 0) {
        return maxIndex;
      }
      return nextIndex;
    });
  };

  // Project List
  const projects = [
    {
      titleKey: "proj-gilmar-title",
      descKey: "proj-gilmar-desc",
      image: "/img/gilmaridea.png",
      tags: [
        { name: "Next.js", icon: "fas fa-bolt", color: "bg-black text-white" },
        { name: "Supabase", icon: "fas fa-database", color: "bg-neo-green text-black" },
      ],
      liveUrl: "https://gilmaridea.stiepancasetia.ac.id/",
      isPrivate: true,
    },
    {
      titleKey: "proj-donghua-title",
      descKey: "proj-donghua-desc",
      image: "/image/donghuawatch.png",
      tags: [
        { name: "React.js", icon: "fab fa-react", color: "bg-[#61DAFB] text-black" },
        { name: "Supabase", icon: "fas fa-bolt", color: "bg-neo-green text-black" },
        { name: "CSS3", icon: "fab fa-css3-alt", color: "bg-[#1572B6] text-white" },
      ],
      liveUrl: "https://donghuawatch.vercel.app/",
      isPrivate: true,
    },
    {
      titleKey: "proj-siperu-title",
      descKey: "proj-siperu-desc",
      image: "/img/siperu.png",
      tags: [
        { name: "Laravel", icon: "fab fa-laravel", color: "bg-[#FF2D20] text-white" },
        { name: "Tailwind CSS", icon: "fas fa-wind", color: "bg-[#06B6D4] text-white" },
        { name: "MySQL", icon: "fas fa-database", color: "bg-[#4479A1] text-white" },
      ],
      liveUrl: "https://siperu.stiepancasetia.ac.id/",
      isPrivate: true,
    },
    {
      titleKey: "proj-komik-title",
      descKey: "proj-komik-desc",
      image: "/img/komik.png",
      tags: [
        { name: "React.js", icon: "fab fa-react", color: "bg-[#61DAFB] text-black" },
        { name: "Supabase", icon: "fas fa-bolt", color: "bg-neo-green text-black" },
      ],
      liveUrl: "https://www.donghuawatch.cloud/komik",
      isPrivate: true,
    },
    {
      titleKey: "proj-api-title",
      descKey: "proj-api-desc",
      image: "/image/donghuawatchapi.png",
      tags: [
        { name: "Node.js", icon: "fab fa-node-js", color: "bg-[#339933] text-white" },
        { name: "Express", icon: "fas fa-server", color: "bg-neo-blue text-white" },
        { name: "Scraping", icon: "fas fa-spider", color: "bg-[#FF6600] text-white" },
      ],
      liveUrl: "https://donghuawatchapi.vercel.app/",
      isPrivate: true,
    },
    {
      titleKey: "proj-sip-title",
      descKey: "proj-sip-desc",
      image: "/img/sip.png",
      tags: [
        { name: "HTML5", icon: "fab fa-html5", color: "bg-[#E34F26] text-white" },
        { name: "Tailwind CSS", icon: "fas fa-wind", color: "bg-[#06B6D4] text-white" },
      ],
      liveUrl: "https://sip.stiepancasetia.ac.id/",
      isPrivate: true,
    },
    {
      titleKey: "proj-lppm-title",
      descKey: "proj-lppm-desc",
      image: "/img/lppm.png",
      tags: [{ name: "WordPress", icon: "fab fa-wordpress", color: "bg-[#21759B] text-white" }],
      liveUrl: "https://lppm.stiepancasetia.ac.id/",
      isPrivate: true,
    },
    {
      titleKey: "proj-obe-title",
      descKey: "proj-obe-desc",
      image: "/image/project.png",
      tags: [
        { name: "Laravel", icon: "fab fa-laravel", color: "bg-[#FF2D20] text-white" },
        { name: "Tailwind CSS", icon: "fas fa-wind", color: "bg-[#06B6D4] text-white" },
        { name: "MySQL", icon: "fas fa-database", color: "bg-[#4479A1] text-white" },
      ],
      liveUrl: "https://obepoliban.vps-poliban.my.id/",
      repoUrl: "https://github.com/MuhammadFikriiii/baru_kurikulum_OBE",
    },
    {
      titleKey: "proj-bot-title",
      descKey: "proj-bot-desc",
      image: "/img/chatbot.png",
      tags: [
        { name: "Next.js", icon: "fas fa-bolt", color: "bg-black text-white" },
        { name: "Gemini API", icon: "fas fa-brain", color: "bg-neo-purple text-white" },
      ],
      liveUrl: "https://fikri-bot.vercel.app/",
      repoUrl: "https://github.com/MuhammadFikriiii/FikBot",
    },
    {
      titleKey: "proj-sima-title",
      descKey: "proj-sima-desc",
      image: "/image/sima.jpg",
      tags: [
        { name: "Laravel", icon: "fab fa-laravel", color: "bg-[#FF2D20] text-white" },
        { name: "Tailwind CSS", icon: "fas fa-wind", color: "bg-[#06B6D4] text-white" },
        { name: "MySQL", icon: "fas fa-database", color: "bg-[#4479A1] text-white" },
      ],
      repoUrl: "https://github.com/MuhammadFikriiii/sistem-informasi-manajemen-arsip",
      isPrivate: true,
    },
    {
      titleKey: "proj-game-title",
      descKey: "proj-game-desc",
      image: "/image/ulartangga.png",
      tags: [
        { name: "HTML5", icon: "fab fa-html5", color: "bg-[#E34F26] text-white" },
        { name: "JavaScript", icon: "fab fa-js", color: "bg-[#F7DF1E] text-black" },
        { name: "CSS3", icon: "fab fa-css3-alt", color: "bg-[#1572B6] text-white" },
      ],
      liveUrl: "https://muhammadfikriiii.github.io/Snakes-and-Ladders./",
      repoUrl: "https://github.com/MuhammadFikriiii/Snakes-and-Ladders.",
    },
    {
      titleKey: "proj-upscale-title",
      descKey: "proj-upscale-desc",
      image: "/image/upscale.png",
      tags: [
        { name: "Next.js", icon: "fas fa-bolt", color: "bg-black text-white" },
        { name: "AI/ML", icon: "fas fa-brain", color: "bg-neo-purple text-white" },
      ],
      liveUrl: "https://muhammadfikriiii.github.io/UpscaleGambar/",
      repoUrl: "https://github.com/MuhammadFikriiii/UpscaleGambar",
    },
    {
      titleKey: "proj-cisco-title",
      descKey: "proj-cisco-desc",
      image: "/image/project1.png",
      tags: [
        { name: "Cisco", icon: "fas fa-network-wired", color: "bg-[#1BA0D7] text-white" },
        { name: "VLAN", icon: "fas fa-project-diagram", color: "bg-neo-blue text-white" },
      ],
      liveUrl: "https://drive.google.com/drive/u/0/folders/12u0mo5TJ_B59r6mcU_ZM1LNpqIP7H-yz",
      isPrivate: true,
    },
  ];

  // Certificates list
  const certificates = [
    {
      id: 1,
      title: "Cisco CCNA Certificate",
      org: "Cisco Networking Academy",
      year: "2024",
      image: "/image/ccn.png",
      desc: "Sertifikasi networking profesional tingkat madya yang memvalidasi kompetensi di bidang perutean (routing), pensaklaran (switching), keamanan IP, serta administrasi infrastruktur jaringan berskala korporasi menggunakan perangkat Cisco.",
    },
    {
      id: 2,
      title: "Web Development Specialist",
      org: "Udemy Certified",
      year: "2024",
      image: "/image/jscoi.png",
      desc: "Sertifikasi keahlian komprehensif dalam arsitektur web modern. Memvalidasi kemampuan membangun aplikasi web terstruktur dari awal menggunakan HTML5, CSS3, JavaScript, framework modern (React/Next.js), database SQL/NoSQL, serta teknik integrasi RESTful API.",
    },
    {
      id: 3,
      title: "Belajar Dasar-dasar AI",
      org: "Dicoding Indonesia",
      year: "2024",
      image: "/image/dicodingbackend.png",
      desc: "Sertifikasi penyelesaian program pembelajaran kecerdasan buatan dari Dicoding. Fokus pada fondasi Machine Learning, Deep Learning, integrasi API AI generatif (seperti Gemini API), dan penerapan AI untuk automasi sistem web.",
    },
    {
      id: 4,
      title: "Database Design & SQL Administration",
      org: "Oracle Academy",
      year: "2024",
      image: "/image/filterdata.png",
      desc: "Sertifikasi spesialisasi administrasi database dari Oracle Academy. Memvalidasi keahlian perancangan diagram hubungan entitas (ERD), normalisasi data, manipulasi data tingkat lanjut menggunakan kueri SQL, dan optimasi performa server database.",
    },
    {
      id: 5,
      title: "BNSP Sertifikasi Programmer",
      org: "Lembaga Sertifikasi BNSP",
      year: "2025",
      image: "/img/sertifikat 1.jpeg",
      desc: "Sertifikasi kompetensi nasional Indonesia untuk Skema Kerja Programmer dari Badan Nasional Sertifikasi Profesi. Menguji kelayakan teknis pengkodean program terstruktur, penerapan standar keamanan web, pengujian algoritma, dan manajemen repositori kode secara formal.",
    },
    {
      id: 6,
      title: "Pemrograman Web Interaktif dengan React",
      org: "Dicoding Indonesia",
      year: "2024",
      image: "/img/sertifikat 2.jpeg",
      desc: "Sertifikasi resmi pengembangan aplikasi front-end berstandar industri. Memvalidasi penguasaan konsep React.js, arsitektur berbasis komponen (component-driven architecture), state management (Redux/Context), rendering siklus hidup komponen, dan routing dinamis.",
    },
  ];

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful delivery
    showToast(lang === "id" ? "✓ Pesan berhasil terkirim (Simulasi)!" : "✓ Message sent successfully (Simulated)!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              href="https://wa.me/6281234567890?text=Halo%20Farrel%20Diego%20Akbar"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn px-8 py-4 text-sm sm:text-lg uppercase tracking-bold bg-neo-green text-black w-full sm:w-auto"
            >
              <i className="fab fa-whatsapp mr-2 text-xl"></i>
              <span>{t("hero-whatsapp")}</span>
            </a>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-14 h-14 bg-neo-purple flex items-center justify-center text-white"
                title="GitHub"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a
                href="https://instagram.com"
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
      <section id="about" className="py-20 sm:py-32 scroll-mt-16 hacker-grid-bg border-b-8 border-black overflow-hidden relative">
        {/* Decorative Grid corner indicators */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-neo-green opacity-40 hidden md:block" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-neo-green opacity-40 hidden md:block" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-neo-green opacity-40 hidden md:block" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-neo-green opacity-40 hidden md:block" />

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

      {/* Projects Section with Carousel */}
      <section id="projects" className="py-20 sm:py-32 border-y-8 border-black bg-neo-blue">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left reveal reveal-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">
              <span className="bg-neo-yellow text-black px-8 py-3 border-4 border-black shadow-neo-lg inline-block transform -rotate-1 hover:rotate-1 transition-transform duration-300 cursor-default">
                {t("projects-title")}
              </span>
            </h2>
            <div className="flex gap-4">
              <button
                className="carousel-button-static prev"
                id="prevBtn"
                onClick={() => moveCarousel(-1)}
                title="Previous Project"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                className="carousel-button-static next"
                id="nextBtn"
                onClick={() => moveCarousel(1)}
                title="Next Project"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Projects Carousel Container */}
          <div className="carousel-container relative reveal reveal-scale delay-100">
            <div
              className="carousel-inner"
              style={{
                transform: `translateX(-${carouselIndex * (100 / itemsPerView)}%)`,
                transition: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
              }}
            >
              {projects.map((proj, idx) => (
                <div key={idx} className="carousel-item">
                  <div className="project-card rounded-none overflow-hidden bg-white border-4 border-black h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden bg-black border-b-4 border-black flex-shrink-0">
                      <SafeImage src={proj.image} alt={t(proj.titleKey as any)} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg sm:text-xl font-black mb-3 text-black uppercase tracking-tight">
                        {t(proj.titleKey as any)}
                      </h3>
                      <p className="text-black font-bold mb-6 text-xs sm:text-sm text-justify leading-relaxed flex-1">
                        {t(proj.descKey as any)}
                      </p>

                      {/* Tech Badge Icons */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.tags.map((tag, tIdx) => (
                          <div
                            key={tIdx}
                            className={`flex items-center gap-1.5 px-2.5 py-1 border-2 border-black text-xs font-black uppercase ${tag.color}`}
                          >
                            <i className={tag.icon}></i>
                            <span>{tag.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* Project Links */}
                      <div className="flex gap-4 mt-auto">
                        {proj.repoUrl ? (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn flex-1 py-2 bg-neo-yellow text-center text-xs tracking-wider uppercase font-black"
                          >
                            {t("btn-source")}
                          </a>
                        ) : (
                          <button
                            onClick={() =>
                              showToast(
                                lang === "id"
                                  ? "🔒 Repository proyek ini bersifat privat"
                                  : "🔒 This project repository is private"
                              )
                            }
                            className="neo-btn flex-1 py-2 bg-neo-yellow text-center text-xs tracking-wider uppercase font-black"
                          >
                            {t("btn-source")}
                          </button>
                        )}

                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn flex-1 py-2 bg-neo-green text-center text-xs tracking-wider uppercase font-black"
                          >
                            {proj.isPrivate && proj.titleKey === "proj-cisco-title" ? t("btn-file") : t("btn-code2")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

        {/* Marquee Banner */}
        <div className="skills-marquee-container border-y-4 border-black bg-neo-yellow mt-4 select-none">
          <div className="skills-marquee">
            {[
              { name: "HTML5", icon: "fab fa-html5", color: "hover:bg-[#E34F26]" },
              { name: "CSS3", icon: "fab fa-css3-alt", color: "hover:bg-[#1572B6]" },
              { name: "JavaScript", icon: "fab fa-js", color: "hover:bg-[#F7DF1E]" },
              { name: "Tailwind CSS", icon: "fas fa-wind", color: "hover:bg-[#06B6D4]" },
              { name: "React.js", icon: "fab fa-react", color: "hover:bg-[#61DAFB]" },
              { name: "Next.js", icon: "fas fa-bolt", color: "hover:bg-black" },
              { name: "PHP", icon: "fab fa-php", color: "hover:bg-[#777BB4]" },
              { name: "Laravel", icon: "fab fa-laravel", color: "hover:bg-[#FF2D20]" },
              { name: "MySQL", icon: "fas fa-database", color: "hover:bg-[#4479A1]" },
              { name: "WordPress", icon: "fab fa-wordpress", color: "hover:bg-[#21759B]" },
              { name: "Cisco Networking", icon: "fas fa-network-wired", color: "hover:bg-[#1BA0D7]" },
              { name: "Figma UI/UX", icon: "fab fa-figma", color: "hover:bg-[#F24E1E]" },
              { name: "GitHub Workspace", icon: "fab fa-github", color: "hover:bg-[#6e5494]" },
              { name: "Vercel Deployments", icon: "fas fa-rocket", color: "hover:bg-gray-600" },
              { name: "Postman Testing", icon: "fas fa-envelope", color: "hover:bg-[#FF6C37]" },
            ].map((skill, sIdx) => (
              <div
                key={sIdx}
                className={`skills-marquee-item group transition-all duration-300 cursor-default ${skill.color}`}
              >
                <div className="text-4xl mb-3 text-black group-hover:text-white transition-colors duration-300">
                  <i className={skill.icon}></i>
                </div>
                <div className="font-black text-xs sm:text-sm uppercase tracking-wider group-hover:text-white transition-colors">
                  {skill.name}
                </div>
              </div>
            ))}
            {/* Loop clone */}
            {[
              { name: "HTML5", icon: "fab fa-html5", color: "hover:bg-[#E34F26]" },
              { name: "CSS3", icon: "fab fa-css3-alt", color: "hover:bg-[#1572B6]" },
              { name: "JavaScript", icon: "fab fa-js", color: "hover:bg-[#F7DF1E]" },
              { name: "Tailwind CSS", icon: "fas fa-wind", color: "hover:bg-[#06B6D4]" },
              { name: "React.js", icon: "fab fa-react", color: "hover:bg-[#61DAFB]" },
              { name: "Next.js", icon: "fas fa-bolt", color: "hover:bg-black" },
              { name: "PHP", icon: "fab fa-php", color: "hover:bg-[#777BB4]" },
              { name: "Laravel", icon: "fab fa-laravel", color: "hover:bg-[#FF2D20]" },
              { name: "MySQL", icon: "fas fa-database", color: "hover:bg-[#4479A1]" },
              { name: "WordPress", icon: "fab fa-wordpress", color: "hover:bg-[#21759B]" },
              { name: "Cisco Networking", icon: "fas fa-network-wired", color: "hover:bg-[#1BA0D7]" },
              { name: "Figma UI/UX", icon: "fab fa-figma", color: "hover:bg-[#F24E1E]" },
              { name: "GitHub Workspace", icon: "fab fa-github", color: "hover:bg-[#6e5494]" },
              { name: "Vercel Deployments", icon: "fas fa-rocket", color: "hover:bg-gray-600" },
              { name: "Postman Testing", icon: "fas fa-envelope", color: "hover:bg-[#FF6C37]" },
            ].map((skill, sIdx) => (
              <div
                key={`clone-${sIdx}`}
                className={`skills-marquee-item group transition-all duration-300 cursor-default ${skill.color}`}
              >
                <div className="text-4xl mb-3 text-black group-hover:text-white transition-colors duration-300">
                  <i className={skill.icon}></i>
                </div>
                <div className="font-black text-xs sm:text-sm uppercase tracking-wider group-hover:text-white transition-colors">
                  {skill.name}
                </div>
              </div>
            ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-white border-4 border-black shadow-neo-lg p-5 hover:transform hover:-translate-y-2 transition-all duration-200 cursor-pointer reveal reveal-up flex flex-col"
              >
                <div className="border-2 border-black mb-4 overflow-hidden aspect-[4/3] bg-black relative flex-shrink-0">
                  <SafeImage src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black uppercase text-sm sm:text-base text-black tracking-tight mb-2 line-clamp-1">
                  {cert.title}
                </h3>
                <p className="text-neo-blue text-xs font-black uppercase tracking-wider mb-4">
                  {cert.org} ({cert.year})
                </p>
                <button className="neo-btn w-full py-2 bg-neo-blue text-white uppercase tracking-wider text-xs font-black mt-auto">
                  {t("btn-details")}
                </button>
              </div>
            ))}
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

                <div className="flex items-start p-6 bg-white border-4 border-black shadow-neo">
                  <div className="w-12 h-12 border-2 border-black bg-neo-blue flex items-center justify-center mr-4 flex-shrink-0 text-white text-lg">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black mb-1 uppercase">{t("contact-email-title")}</h4>
                    <p className="text-black font-black text-sm uppercase break-all">farreldiegoakbar@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-white border-4 border-black shadow-neo">
                  <div className="w-12 h-12 border-2 border-black bg-neo-yellow flex items-center justify-center mr-4 flex-shrink-0 text-black text-lg">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black mb-1 uppercase">{t("contact-phone-title")}</h4>
                    <p className="text-black font-black text-sm uppercase">+62 812 3456 7890</p>
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
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-4 bg-white border-4 border-black font-black focus:outline-none shadow-neo transition-all duration-200 text-black"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="name" className="floating-label absolute left-4 top-4 text-gray-500 font-black uppercase text-xs">
                    {t("form-name")}
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-4 bg-white border-4 border-black font-black focus:outline-none shadow-neo transition-all duration-200 text-black"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="email" className="floating-label absolute left-4 top-4 text-gray-500 font-black uppercase text-xs">
                    {t("form-email")}
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-4 bg-white border-4 border-black font-black focus:outline-none shadow-neo transition-all duration-200 text-black"
                    placeholder=" "
                    required
                  />
                  <label htmlFor="subject" className="floating-label absolute left-4 top-4 text-gray-500 font-black uppercase text-xs">
                    {t("form-subject")}
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="form-input w-full px-4 py-4 bg-white border-4 border-black font-black focus:outline-none shadow-neo transition-all duration-200 text-black"
                    placeholder=" "
                    required
                  ></textarea>
                  <label htmlFor="message" className="floating-label absolute left-4 top-4 text-gray-500 font-black uppercase text-xs">
                    {t("form-message")}
                  </label>
                </div>

                <button
                  type="submit"
                  className="neo-btn w-full py-4 bg-black text-white text-base sm:text-lg uppercase tracking-widest font-black"
                >
                  <i className="fas fa-paper-plane mr-2"></i> {t("contact-message-title")}
                </button>
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
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-12 h-12 bg-neo-blue flex items-center justify-center text-white footer-social-btn"
                title="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-12 h-12 bg-neo-purple flex items-center justify-center text-white footer-social-btn"
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn w-12 h-12 bg-neo-pink flex items-center justify-center text-white footer-social-btn"
                title="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="https://wa.me/6281234567890"
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
    </div>
  );
}
