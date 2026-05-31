import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Lang, translate, TranslationKey } from "@/components/translations";

interface ContactSectionProps {
  lang: Lang;
  showToast: (msg: string) => void;
}

export const ContactSection = ({ lang, showToast }: ContactSectionProps) => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [sliderX, setSliderX] = useState(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const sliderStartPos = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const t = (key: TranslationKey) => translate(lang, key);

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
    const rect = sliderRef.current.getBoundingClientRect();
    const handleW = window.innerWidth < 640 ? 80 : 112;
    const maxSlide = rect.width - handleW;

    const newX = clientX - sliderStartPos.current;
    const clamped = Math.max(0, Math.min(maxSlide, newX));
    setSliderX(clamped);

    // If dragged fully to the right, trigger submission
    if (clamped >= maxSlide - 2) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDraggingSlider, sliderX]);

  return (
    <section id="contact" className="py-20 sm:py-32 bg-neo-green border-y-8 border-black scroll-mt-16 overflow-hidden">
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
  );
};
