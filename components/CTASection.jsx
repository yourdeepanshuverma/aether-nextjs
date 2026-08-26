"use client";

import { useState } from "react";
import { Send, MapPin, Mail, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const CTASection = () => {
  const { submitContactForm } = useContent();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = `${formData.firstName} ${formData.lastName}`.trim();
    if (!name || !formData.email || !formData.message) {
      setStatus({
        submitting: false,
        success: false,
        error: "Please fill in all required fields.",
      });
      return;
    }

    try {
      setStatus({ submitting: true, success: false, error: "" });
      await submitContactForm({
        name,
        email: formData.email,
        phone: "",
        company: "",
        message: formData.message,
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setStatus({ submitting: false, success: true, error: "" });
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: error.message || "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden" id="contact">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="bg-brand-blue rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          {/* Left Side: Content & Image */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <img 
              src="/assets/abstract-blue.jpg" 
              alt="Connect with us" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/50 via-brand-blue/30 to-transparent"></div>
            
            <div className="relative z-10 p-12 flex flex-col justify-center text-white">
              <span className="text-white/80 font-bold tracking-widest uppercase text-sm mb-6 block">Ready to start?</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                Let&apos;s Build Something <span className="text-black">Extraordinary</span> Together
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-lg leading-relaxed">
                Transform your business with our cutting-edge IoT and RFID solutions. Our experts are ready to help you scale.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email us at</p>
                    <p className="font-semibold">info@aetherrfid.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Call us</p>
                    <p className="font-semibold">+91 7042436155</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Address</p>
                    <p className="font-semibold">211, 3rd Floor , Okhla Industrial Estate, Phase 3 New Delhi-110020.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-1/2 bg-white p-12 relative">
            <div className=" mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">Get in Touch</h3>
              <p className="text-gray-500 mb-6">Fill out the form and our team will get back to you within 24 hours.</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Nikhil"
                      required
                      className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Sisodia"
                      className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nikhil@sisodia.com"
                    required
                    className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="4"
                    required
                    className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {status.success && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                    <CheckCircle size={20} className="shrink-0" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {status.error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    <AlertCircle size={20} className="shrink-0" />
                    <span>{status.error}</span>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-brand-orange text-white font-semibold py-5 rounded-2xl shadow-lg shadow-[#000000]/25 hover:shadow-[#000000]/40 hover:bg-[#000000] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {status.submitting ? "Sending..." : "Send Message"}
                  {!status.submitting && (
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
