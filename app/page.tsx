"use client";

import React, { useState, useEffect } from "react";
import { Lang } from "@/components/translations";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<Lang>("id");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hydration fix & Init
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Set up reveal observer and active section scroll listener
  useEffect(() => {
    if (!mounted) return;

    // Scroll reveal observer (Intersection Observer)
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

  // Toast utility helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    // Automatically clear toast after 3 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neo-bg text-black flex items-center justify-center font-sans">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-neo-pink text-white border-4 border-black shadow-neo px-8 py-4 font-black uppercase tracking-wider text-center animate-slide-down-rope">
          {toastMessage}
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Content Sections */}
      <HeroSection lang={lang} />
      
      <AboutSection lang={lang} showToast={showToast} />
      
      <ProjectsSection lang={lang} showToast={showToast} />
      
      <SkillsSection lang={lang} />
      
      <CertificatesSection lang={lang} />
      
      <ContactSection lang={lang} showToast={showToast} />

      {/* Global Footer */}
      <Footer lang={lang} />
    </div>
  );
}
