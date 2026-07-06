"use client";
import Link from "next/link";
import { Wifi, Signal, ShieldCheck, Download, ArrowRight, Radio, Cpu, Network } from "lucide-react";

const LoRaWANSensors = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen text-white selection:bg-brand-green selection:text-black">
      {/* Wireless Mesh Hero */}
      <section className="relative py-14 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10 text-center">
            <div className="inline-block px-4 py-2 bg-brand-green/10 border border-brand-green/20 rounded-full text-brand-green text-sm font-bold tracking-widest uppercase mb-8">
               LPWAN Connectivity Experts
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-10 tracking-[1.2] leading-none">
              LORA<span className="text-brand-green">WAN</span> <br/>  
              <span className="text-4xl md:text-7xl block mt-4 font-light text-gray-400">& Wireless Sensors</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Extending your network's reach by kilometers, not meters. Low-power, long-range sensing for the most remote and isolated industrial assets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="px-12 py-5 bg-brand-green text-black font-black rounded-full hover:scale-110 transition-transform shadow-2xl shadow-brand-green/20">
                  Deploy Network
                </Link>
                <button className="px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                  Product Guide
                </button>
            </div>
        </div>
      </section>

      {/* Sensor Cards Section */}
      <section className="py-32 bg-[#ffffff] max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12">
            {[
                { 
                    title: "LoRaWAN Gateway", 
                    desc: "The heart of your network. Support for 1000+ nodes with a line-of-sight range of up to 15km.", 
                    icon: <Signal className="text-brand-blue" size={40} />,
                    specs: ["Industrial Outdoor/Indoor", "PoE Support", "4G Backhaul"]
                },
                { 
                    title: "Smart Sensors", 
                    desc: "From temperature and humidity to CO2 and vibration. Ultra-low power nodes that last 10+ years on a single battery.", 
                    icon: <Wifi className="text-brand-blue" size={40} />,
                    specs: ["IP67 Ruggedized", "Instant Wake-up", "OTA Updates"]
                }
            ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[60px] hover:border-brand-blue/40 transition-colors group">
                    <div className="mb-8 p-6 bg-white/5 rounded-[32px] w-fit group-hover:bg-brand-blue/10 transition-colors">
                        {item.icon}
                    </div>
                    <h3 className="text-4xl text-brand-blue font-bold mb-6">{item.title}</h3>
                    <p className="text-gray-900 text-lg mb-8 leading-relaxed">{item.desc}</p>
                    <ul className="space-y-4">
                        {item.specs.map((s, j) => (
                            <li key={j} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                                <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      </section>

      {/* Technology Focus */}
      <section className="py-32 bg-brand-green text-black overflow-hidden relative">
          <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 blur-[150px] rounded-full"></div>
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10 grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                  <h2 className="text-5xl font-black mb-8 italic uppercase leading-none">
                      Why <br /> LoRaWAN?
                  </h2>
                  <div className="space-y-8">
                      <div className="flex gap-6">
                          <Radio size={40} />
                          <div>
                              <h4 className="text-xl font-black">LONG RANGE</h4>
                              <p className="font-medium text-black/70">Penetrate deep into buildings or across vast rural landscapes.</p>
                          </div>
                      </div>
                      <div className="flex gap-6">
                          <Cpu size={40} />
                          <div>
                              <h4 className="text-xl font-black">LOW POWER</h4>
                              <p className="font-medium text-black/70">Nodes operate for a decade without battery replacement.</p>
                          </div>
                      </div>
                      <div className="flex gap-6">
                          <Network size={40} />
                          <div>
                              <h4 className="text-xl font-black">SCALABLE</h4>
                              <p className="font-medium text-black/70">Easily add thousands of sensors to a single base station.</p>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="bg-black text-white p-12 rounded-[60px] shadow-2xl">
                   <h3 className="text-3xl font-bold mb-8">System Architecture</h3>
                   <div className="space-y-8">
                       {[
                           { step: "01", t: "Endpoints", d: "Sensors capture data and transmit via LoRa." },
                           { step: "02", t: "Gateways", d: "Receive packets and forward to Network Server." },
                           { step: "03", t: "Cloud App", d: "Visualize data and trigger automated workflows." }
                       ].map((s, i) => (
                           <div key={i} className="flex gap-6 border-b border-white/10 pb-6 last:border-0">
                               <span className="text-brand-green font-black">{s.step}</span>
                               <div>
                                   <div className="font-bold">{s.t}</div>
                                   <p className="text-gray-400 text-sm">{s.d}</p>
                               </div>
                           </div>
                       ))}
                   </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default LoRaWANSensors;
