"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MessageSquare, X, Send, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.39 1 2.55.12.17 1.74 2.66 4.22 3.73.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.32z" />
  </svg>
);

export default function FloatingContactWidget() {
  const { getContent, submitContactForm } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "", // phone or email
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: "",
  });
  const [hasInteracted, setHasInteracted] = useState(false);
  const popupRef = useRef(null);

  // Dynamic phone numbers from context or default
  const footerData = getContent("footer", {
    content: {
      corpContact: "+91-7042436155",
    },
  });

  const rawPhone = footerData?.corpContact || "+91-7042436155";
  const sanitizedDigits = rawPhone.replace(/\D/g, "");
  // WhatsApp international number (default 917042436155)
  const whatsappNumber = sanitizedDigits.length === 10 ? `91${sanitizedDigits}` : (sanitizedDigits || "917042436155");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Aether RFID, I would like to enquire about your RFID & IoT solutions."
  )}`;
  const phoneCallUrl = `tel:${rawPhone.replace(/\s+/g, "")}`;
  const emailUrl = "mailto:info@aetherrfid.com?subject=Enquiry%20from%20Website";

  // Close popup if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.contact.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please fill in all fields to submit your enquiry.",
      });
      return;
    }

    try {
      setStatus({ submitting: true, success: false, error: "" });
      
      const isEmail = formData.contact.includes("@");
      await submitContactForm({
        name: formData.name.trim(),
        email: isEmail ? formData.contact.trim() : `phone_${formData.contact.trim()}@aetherinquiry.com`,
        phone: isEmail ? "" : formData.contact.trim(),
        company: "Website Quick Enquiry",
        message: `${formData.message.trim()} (Direct Contact: ${formData.contact.trim()})`,
      });

      setStatus({
        submitting: false,
        success: true,
        error: "",
      });

      setFormData({
        name: "",
        contact: "",
        message: "",
      });

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
        setIsOpen(false);
      }, 4000);
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || "Failed to submit enquiry. Please call or WhatsApp us.",
      });
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 select-none print:hidden">
      {/* Quick Enquiry Card Modal */}
      {isOpen && (
        <div
          ref={popupRef}
          className="w-[calc(100vw-2.5rem)] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 mb-2"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-brand-blue to-[#244277] p-5 text-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles size={18} className="text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Quick Enquiry</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] text-blue-100 font-medium">We usually reply quickly</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-colors text-white"
                aria-label="Close Enquiry Dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Instant Contact Action Chips */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsAppIcon size={16} />
                <span>WhatsApp</span>
              </a>

              <a
                href={phoneCallUrl}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone size={15} />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Card Body: Direct Quick Message Form */}
          <div className="p-5 max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div className="text-xs text-gray-500 font-medium pb-1">
                Leave a quick note and our solution specialist will contact you:
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Phone or Email *
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9876543210 or name@company.com"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Requirement / Question *
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about RFID tags, hardware, or software requirements..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                ></textarea>
              </div>

              {status.success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl animate-in fade-in">
                  <CheckCircle size={16} className="shrink-0" />
                  <span>Enquiry received! Our team will get back to you shortly.</span>
                </div>
              )}

              {status.error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.submitting}
                className="w-full bg-brand-blue hover:bg-brand-blue/90 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-brand-blue/20 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status.submitting ? (
                  <span>Sending Enquiry...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Quick Enquiry</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom info link */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <a
                href={emailUrl}
                className="hover:text-brand-blue transition-colors flex items-center gap-1"
              >
                <Mail size={12} /> info@aetherrfid.com
              </a>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="font-semibold text-brand-blue hover:underline"
              >
                Full Contact Page →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons Group */}
      <div className="flex items-center gap-3">
        {/* 1. WhatsApp Button */}
        <div className="relative group">
          {/* Tooltip / Pill on Desktop */}
          <span className="hidden md:inline-block pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
            Chat on WhatsApp
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-green-500/40 transition-all duration-300 relative group"
          >
            {/* Soft pulse animation ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none group-hover:hidden"></span>
            
            <WhatsAppIcon size={28} />
          </a>
        </div>

        {/* 2. Contact / Quick Enquiry Toggle Button */}
        <div className="relative group">
          {/* Tooltip on Desktop */}
          <span className="hidden md:inline-block pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-xs font-semibold py-1.5 px-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
            {isOpen ? "Close Enquiry" : "Quick Enquiry & Contact"}
          </span>

          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              setHasInteracted(true);
            }}
            aria-label={isOpen ? "Close Contact" : "Open Quick Contact & Enquiry"}
            className={`w-14 h-14 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 ${
              isOpen
                ? "bg-gray-800 hover:bg-gray-900 rotate-90 shadow-gray-700/40"
                : "bg-brand-blue hover:bg-[#254780] hover:shadow-blue-500/40 hover:scale-105"
            }`}
          >
            {isOpen ? (
              <X size={26} />
            ) : (
              <div className="relative flex items-center justify-center">
                <MessageSquare size={24} />
                {/* Small Phone badge on the corner */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-orange text-white rounded-full flex items-center justify-center border-2 border-brand-blue text-[9px]">
                  <Phone size={8} />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
