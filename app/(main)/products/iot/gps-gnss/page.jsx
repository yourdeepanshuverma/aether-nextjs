"use client";
import Link from "next/link";
import { MapPin, Navigation, Shield, Download, ArrowRight, Satellite, Zap, Globe } from "lucide-react";

const GPSDevices = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dynamic Map-Style Hero */}
      <section className="relative min-h-[80vh] flex items-center py-10 bg-[#0f172a] text-white overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-400/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 font-bold text-sm uppercase mb-8">
              <Globe size={18} /> Global Positioning Excellence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
              Precision <span className="text-blue-500 italic">GNSS</span> <br />
              Fleet Tracking
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
              Real-time accuracy with multi-constellation support (GPS, GLONASS, Galileo, BeiDou). Never lose sight of your most valuable assets.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3">
                Get a Quote <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[60px] shadow-2xl overflow-hidden group">
               <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
               <div className="grid grid-cols-2 gap-8 relative z-10">
                  <div className="space-y-8">
                    <div className="aspect-square rounded-3xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform">
                      <img 
                src="/assets/gps-device.jpg" 
                alt="GPS Device" 
                className="relative z-10 w-full h-auto object-contain rounded-3xl mix-blend-screen opacity-90 group-hover:scale-110 transition-transform duration-700"
              />
                        {/* <MapPin size={48} /> */}
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                        <div className="text-3xl font-bold">1.5m</div>
                        <div className="text-[10px] text-gray-500 uppercase font-black">Position Accuracy</div>
                    </div>
                  </div>
                  <div className="space-y-8 mt-12">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                        <div className="text-3xl font-bold text-blue-500">4G</div>
                        <div className="text-[10px] text-gray-500 uppercase font-black">Fast Connectivity</div>
                    </div>
                    <div className="aspect-square rounded-3xl flex items-center justify-center text-blue-600 -rotate-6 group-hover:rotate-0 transition-transform">
                        <img 
                src="/assets/gnss-device.jpg" 
                alt="GNSS Device" 
                className="relative z-10 w-full h-auto object-contain rounded-3xl mix-blend-screen opacity-90 group-hover:scale-110 transition-transform duration-700"
              />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-32 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Multi-GNSS", desc: "Simultaneous signal reception from 4 satellite constellations for maximum reliability.", icon: <Satellite className="text-blue-500" /> },
            { title: "IP67 Rated", desc: "Dust-tight and waterproof housing built for extreme weather and maritime conditions.", icon: <Shield className="text-blue-500" /> },
            { title: "Smart Power", desc: "Advanced sleep modes and motion sensing to extend battery life up to 3 years.", icon: <Zap className="text-blue-500" /> }
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
               <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GPSDevices;
