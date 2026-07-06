"use client";
import Link from "next/link";
import { Database, LineChart, ShieldCheck, Download, ArrowRight, Zap, Clock, HardDrive } from "lucide-react";

const DataLoggers = () => {
  const specs = [
    { label: "Storage", value: "Up to 32GB" },
    { label: "Battery Life", value: "5+ Years" },
    { label: "Connectivity", value: "LoRaWAN / NB-IoT" },
    { label: "Protection", value: "IP68 Waterproof" }
  ];

  return (
    <div className="bg-[#040707] min-h-screen text-white selection:bg-brand-orange selection:text-white">
      {/* Neo-Industrial Hero */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-orange/10 blur-[120px] rounded-full"></div>
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-tighter mb-6">
                <Clock size={14} /> Real-Time Monitoring
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-8 leading-none italic">
                DATA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-white">LOGGERS</span>
              </h1>
              <p className="text-gray-400 text-xl mb-10 max-w-lg font-light leading-relaxed">
                Precision environmental monitoring solutions. Capture, store, and analyze critical data in the most demanding industrial environments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="px-8 py-4 bg-brand-orange text-black font-black uppercase italic hover:scale-105 transition-transform">
                  Inquire Now
                </Link>
                <Link href="/contact" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">
                  Technical Specs
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[40px]">
              <div className="aspect-3/2 bg-gradient-to-br from-white/5 to-transparent rounded-[40px] border border-white/10 p-8 flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-brand-orange/5 group-hover:scale-110 transition-transform duration-700"></div>
                {/* <HardDrive size={200} className="text-brand-orange/20 group-hover:text-brand-orange/40 transition-colors duration-500" /> */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                src="/assets/data-logger.jpg" 
                alt="Data Logger" 
                className="relative z-10 w-full h-auto object-contain rounded-3xl mix-blend-screen opacity-90 group-hover:scale-110 transition-transform duration-700"
              />
                   <div className="w-32 h-32 bg-brand-orange blur-[60px] opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Specs Grid */}
      <section className="py-20 bg-white/5 border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, i) => (
            <div key={i} className="text-center lg:text-left">
              <div className="text-brand-orange text-sm font-bold uppercase mb-2">{spec.label}</div>
              <div className="text-3xl font-light italic">{spec.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-32 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Edge Analytics", icon: <LineChart />, desc: "Process data at the source to reduce latency and bandwidth usage." },
            { title: "Military Grade", icon: <ShieldCheck />, desc: "Ruggedized housing designed for extreme temperatures and pressure." },
            { title: "Instant Sync", icon: <Zap />, desc: "Cloud integration with automatic failover and local buffer storage." }
          ].map((f, i) => (
            <div key={i} className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 bg-brand-orange/20 flex items-center justify-center rounded-lg text-brand-orange mb-6">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DataLoggers;
