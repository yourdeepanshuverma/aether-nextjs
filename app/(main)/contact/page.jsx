"use client";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/context/ContentContext";

const Contact = () => {
  const { submitContactForm } = useContent();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: "Please fill in all required fields (Name, Email, Message)" });
      return;
    }

    try {
      setStatus({ submitting: true, success: false, error: "" });
      await submitContactForm(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
      setStatus({ submitting: false, success: true, error: "" });
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setStatus({
        submitting: false,
        success: false,
        error: error.message || "Failed to send message. Please try again."
      });
    }
  };

  const addresses = [
    {
      title: "Corporate Office",
      company: "AETHER RFID TECHNOLOGIES PVT LTD.",
      address: "211, 3rd Floor, Okhla Industrial Estate, Phase 3, New Delhi-110020.",
      contact: "+91-7042436155",
      email: "info@aetherrfid.com",
    },
    {
      title: "Production & R&D Center",
      company: "AETHER RFID TECHNOLOGIES PVT LTD.",
      address: "B-185, 2nd Floor, Okhla Industrial Area, Phase 1, New Delhi-110020.",
      contact: "+91-7070543479",
      email: "rd@aetherrfid.com",
    },
    {
      title: "Branch Office",
      company: "AETHER RFID TECHNOLOGIES PVT LTD.",
      address: "164/10, 3rd Floor, Dutta Mart, Near Udayan Club, Kolkata, West Bengal, 700061.",
      contact: "+91-7488196939",
      email: "kolkata@aetherrfid.com",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/assets/abstract-blue.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80"; }}
          />
        </div>
        <div className="relative z-10 text-center px-5">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Get in touch with us for any inquiries, support, or partnership opportunities. 
            We are here to help you with the best RFID & IOT solutions.
          </p>
        </div>
      </section>

      {/* 2. Contact Form Section */}
      <section className="py-20 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[2px] w-20 bg-gray-200"></div>
              <div className="w-3 h-3 rounded-full bg-brand-green"></div>
              <div className="h-[2px] w-20 bg-gray-200"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="123-456-7890"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <textarea 
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your requirements..."
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all resize-none"
                ></textarea>
              </div>

              {status.success && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                  <CheckCircle size={20} className="shrink-0" />
                  <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
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
                className="w-full bg-brand-blue text-white font-bold py-4 rounded-xl hover:bg-brand-blue/90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {status.submitting ? "Sending..." : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>


      {/* 3. Google Map Image Section with Pins */}
      <section className="py-20 bg-brand-blue overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Locations</h2>
          
          <p className="text-white max-w-2xl mx-auto">
            Visit our offices across India. We have a strong presence in Delhi and Kolkata to serve you better.
          </p>
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          {/* Map Background Image */}
          <div className="absolute inset-0 bg-[#e5e3df]">
            <img 
              src="/assets/map-img.png"  
              alt="Map Background" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>

          {/* Interactive Pins Overlay (Representational) */}
          <div className="absolute inset-0">
            {/* New Delhi - Corporate Office Pin */}
            <div className="absolute top-[30%] left-[22%] md:top-[35%] md:left-[28%] group">
              <div className="relative flex flex-col items-center">
                <div className="bg-brand-blue text-white text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 whitespace-nowrap shadow-xl">
                  Corporate Office, Delhi
                </div>
                <div className="w-7 h-7 bg-brand-blue rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg animate-bounce">
                  <MapPin size={14} />
                </div>
              </div>
            </div>

            {/* New Delhi - Production & R&D Center Pin */}
            <div className="absolute top-[45%] left-[28%] md:top-[45%] md:left-[32%] group">
              <div className="relative flex flex-col items-center">
                <div className="bg-brand-orange text-white text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 whitespace-nowrap shadow-xl">
                  Production & R&D Center, Delhi
                </div>
                <div className="w-7 h-7 bg-brand-orange rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg animate-bounce delay-150">
                  <MapPin size={14} />
                </div>
              </div>
            </div>

            {/* Kolkata Pin */}
            <div className="absolute top-[60%] left-[50%] md:top-[60%] md:left-[55%] group">
              <div className="relative flex flex-col items-center">
                <div className="bg-brand-green text-white text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 group-hover:z-50 transition-opacity absolute -top-10 whitespace-nowrap shadow-xl">
                    Branch Office, Kolkata
                </div>
                <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg animate-bounce delay-150">
                  <MapPin size={16} />
                </div>
              </div>
            </div>
            
            {/* Map Overlay Text */}
            <div className="absolute top-0 right-0 md:top-auto md:bottom-6 md:right-6 bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/50">
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Global Operations</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-blue rounded-full"></div>
                  <span className="text-[10px] font-medium text-gray-600">Corporate Office (Delhi)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                  <span className="text-[10px] font-medium text-gray-600">R&D Center (Delhi)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-green rounded-full"></div>
                  <span className="text-[10px] font-medium text-gray-600">Branch Office (Kolkata)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Real Google Map Iframe as an alternative (optional, but requested "image") */}
          {/* To actually show 3 pins on one map, we would need a My Maps URL or API */}
          {/* For now, this visual representation is what was requested */}
        </div>
      </section>
    </div>
  );
};

export default Contact;
