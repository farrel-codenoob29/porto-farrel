import React, { useState, useEffect, useRef } from "react";
import { SafeImage } from "@/components/SafeImage";
import { Lang, translate, TranslationKey } from "@/components/translations";

interface AboutSectionProps {
  lang: Lang;
  showToast: (msg: string) => void;
}

export const AboutSection = ({ lang, showToast }: AboutSectionProps) => {
  // Terminal Simulator State
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; result: React.ReactNode }>>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isTypingSimulated, setIsTypingSimulated] = useState(false);
  const terminalViewportRef = useRef<HTMLDivElement>(null);

  const t = (key: TranslationKey) => translate(lang, key);

  // Initialize terminal greeting based on current language
  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalHistory([
        {
          command: "",
          result: (
            <div className="space-y-1 text-xs select-text text-left">
              <p className="text-zinc-400 font-bold">
                {lang === "id" 
                  ? "Selamat datang di Farrel Diego OS v2.0-LTS (Next.js desktop environment)." 
                  : "Welcome to Farrel Diego OS v2.0-LTS (Next.js desktop environment)."}
              </p>
              <p className="text-zinc-500 font-bold">
                {lang === "id" 
                  ? "* Ketik 'help' untuk daftar perintah simulasi interaktif." 
                  : "* Type 'help' to see the list of interactive simulation commands."}
              </p>
              <p className="text-zinc-500 font-bold">
                {lang === "id" 
                  ? "* Atau gunakan tab Folder di sebelah kiri untuk jalan pintas cepat." 
                  : "* Or use the Folder tabs on the left for quick shortcuts."}
              </p>
            </div>
          ),
        },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, [lang]);

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

  return (
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
        <div className="relative w-full max-w-4xl mx-auto pl-12 lg:pl-14 reveal reveal-up select-none">
          {/* Folder Index Tab Shortcuts */}
          <div className="absolute left-0 top-16 flex flex-col space-y-3 z-20 select-none">
            {/* Tab 1: profilefetch */}
            <button
              onClick={() => startTypingSimulation("profilefetch")}
              disabled={isTypingSimulated}
              className="group relative flex items-center h-12 w-12 hover:w-44 sm:hover:w-48 bg-neo-yellow text-black border-4 border-black rounded-r-xl shadow-neo transition-all duration-300 ease-out select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed justify-start overflow-hidden px-3"
              title="profilefetch"
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-terminal text-base"></i>
              </div>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider ml-3 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[140px] transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
                profilefetch
              </span>
            </button>

            {/* Tab 2: cat knowledge.md */}
            <button
              onClick={() => startTypingSimulation("cat knowledge.md")}
              disabled={isTypingSimulated}
              className="group relative flex items-center h-12 w-12 hover:w-44 sm:hover:w-48 bg-neo-blue text-white border-4 border-black rounded-r-xl shadow-neo transition-all duration-300 ease-out select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed justify-start overflow-hidden px-3"
              title="cat knowledge.md"
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-file-alt text-base"></i>
              </div>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider ml-3 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[140px] transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
                knowledge.md
              </span>
            </button>

            {/* Tab 3: ls skills/ */}
            <button
              onClick={() => startTypingSimulation("ls skills/")}
              disabled={isTypingSimulated}
              className="group relative flex items-center h-12 w-12 hover:w-44 sm:hover:w-48 bg-neo-green text-black border-4 border-black rounded-r-xl shadow-neo transition-all duration-300 ease-out select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed justify-start overflow-hidden px-3"
              title="ls skills/"
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-folder-open text-base"></i>
              </div>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider ml-3 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[140px] transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
                ls skills/
              </span>
            </button>

            {/* Tab 4: ./contact.sh */}
            <button
              onClick={() => startTypingSimulation("./contact.sh")}
              disabled={isTypingSimulated}
              className="group relative flex items-center h-12 w-12 hover:w-44 sm:hover:w-48 bg-neo-orange text-white border-4 border-black rounded-r-xl shadow-neo transition-all duration-300 ease-out select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed justify-start overflow-hidden px-3"
              title="./contact.sh"
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-play text-base"></i>
              </div>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider ml-3 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[140px] transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
                contact.sh
              </span>
            </button>

            {/* Tab 5: clear */}
            <button
              onClick={() => {
                if (!isTypingSimulated) {
                  executeTerminalCommand("clear");
                }
              }}
              disabled={isTypingSimulated}
              className="group relative flex items-center h-12 w-12 hover:w-44 sm:hover:w-48 bg-zinc-200 text-black border-4 border-black rounded-r-xl shadow-neo transition-all duration-300 ease-out select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed justify-start overflow-hidden px-3 hover:bg-zinc-300"
              title={lang === "id" ? "Bersihkan Terminal" : "Clear Terminal"}
            >
              <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-trash-alt text-base"></i>
              </div>
              <span className="font-black text-[10px] sm:text-xs uppercase tracking-wider ml-3 opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[140px] transition-all duration-300 ease-out overflow-hidden whitespace-nowrap">
                {lang === "id" ? "Bersihkan" : "Clear"}
              </span>
            </button>
          </div>

          {/* Terminal Simulator Mock Window */}
          <div className="flex-1 flex flex-col">
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
  );
};
