"use client";
"use client";
"use client";
"use client";
import { Send, MapPin, Mail, Phone } from "lucide-react";

const CTASection = () => {
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
                Let's Build Something <span className="text-black">Extraordinary</span> Together
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

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Nikhil"
                      className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Sisodia"
                      className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="nikhil@sisodia.com"
                    className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                  <textarea 
                    placeholder="Tell us about your project..."
                    rows="4"
                    className="w-full px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-green focus:bg-white focus:ring-4 focus:ring-brand-green/5 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-orange text-white font-semibold py-5 rounded-2xl shadow-lg shadow-[#000000]/25 hover:shadow-[#000000]/40 hover:bg-[#000000]  active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
