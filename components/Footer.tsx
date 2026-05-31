import React from "react";
import { Lang } from "@/components/translations";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="py-12 bg-black text-white border-t-8 border-black select-none">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="mb-2 md:mb-0">
            <a href="#" className="text-xl sm:text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
              <img src="/img/logo.png" alt="F" className="w-8 h-8 sm:w-10 sm:h-10 object-contain border-2 border-white bg-neo-yellow p-0.5" />
              <span className="bg-neo-yellow text-black px-2 py-0.5 border-2 border-white mr-1">Farrel</span>
              <span className="hidden sm:inline">Diego Akbar</span>
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
            © {new Date().getFullYear()} Farrel Diego Akbar. {lang === "id" ? "Hak Cipta Dilindungi." : "All Rights Reserved."}
          </div>
        </div>
      </div>
    </footer>
  );
}
