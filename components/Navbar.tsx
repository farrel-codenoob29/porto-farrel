import React, { useState, useEffect, useRef } from "react";
import { Lang, translate, TranslationKey } from "@/components/translations";

interface NavbarProps {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navItems = [
  { id: "home", color: "#FFD600" },
  { id: "about", color: "#FF006E" },
  { id: "projects", color: "#3A86FF" },
  { id: "skills", color: "#00FF66" },
  { id: "certificates", color: "#8338EC" },
  { id: "contact", color: "#FB5607" },
];

export const Navbar = ({
  lang,
  setLang,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
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

  const handleMouseEnter = (sectionId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSection(sectionId);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredSection(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Update sliding indicator style on activeSection/hoveredSection changes
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

  const t = (key: TranslationKey) => translate(lang, key);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-xl sm:text-2xl font-black text-black uppercase tracking-tighter flex items-center gap-2">
            <img src="/img/logo.png" alt="F" className="w-8 h-8 sm:w-10 sm:h-10 object-contain border-2 border-black bg-neo-yellow p-0.5" />
            <span className="bg-neo-yellow px-2 py-0.5 border-2 border-black mr-1">Farrel</span>
            <span className="hidden sm:inline">Diego Akbar</span>
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
                {t(`nav-${item.id}` as TranslationKey)}
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
          className={`lg:hidden mt-4 pb-4 space-y-2 bg-white border-t-2 border-black p-4 shadow-neo ${mobileMenuOpen ? "block" : "hidden"
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
                className={`block py-2 font-black uppercase px-2 transition-colors duration-200 ${isActive ? `${activeBg}` : "text-black hover:bg-gray-100"
                  }`}
              >
                {t(`nav-${item.id}` as TranslationKey)}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
};
