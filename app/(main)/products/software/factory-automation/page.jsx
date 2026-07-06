"use client";
import Link from "next/link";
import { Factory, Cpu, ShieldCheck, Download, ArrowRight, Cog, BarChart, Zap } from "lucide-react";

const FactoryAutomationSoftware = () => {
  return (
    <div className="bg-[#080808] min-h-screen text-white selection:bg-brand-orange selection:text-black">
      {/* Industrial Dark Hero */}
      <section className="relative py-12 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-brand-orange text-xs font-black uppercase tracking-[0.2em] mb-8">
                Industry 4.0 Core
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-[1.2] mb-10 tracking-none italic">
                FACTORY <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-white to-brand-orange/50">INTELLIGENCE</span>
              </h1>
              <p className="text-xl text-gray-500 mb-12 max-w-lg font-light leading-relaxed">
                A high-performance Manufacturing Execution System (MES). Synchronize your shop floor with your top floor in real-time.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/contact" className="px-12 py-5 bg-brand-orange text-black font-black uppercase italic rounded-full hover:scale-105 transition-transform shadow-2xl shadow-brand-orange/20">
                    Revolutionize My Floor
                </Link>
                <button className="px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                    Technical Architecture
                </button>
              </div>
            </div>
            
            <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[100px] rounded-full"></div>
                <div className="relative z-10 p-1 bg-gradient-to-br from-white/20 to-transparent rounded-[50px]">
                    <div className="bg-[#0a0a0a] p-12 rounded-[48px] border border-white/5">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-8 bg-white/5 rounded-3xl text-center border border-white/10 group hover:border-brand-orange/50 transition-colors">
                                <Cog className="mx-auto mb-4 text-brand-orange animate-[spin_10s_linear_infinite]" size={40} />
                                <div className="text-xs font-black text-gray-500 uppercase">Process OEE</div>
                                <div className="text-3xl font-black italic">94.2%</div>
                            </div>
                            <div className="p-8 bg-white/5 rounded-3xl text-center border border-white/10 group hover:border-brand-orange/50 transition-colors">
                                <Zap className="mx-auto mb-4 text-brand-orange" size={40} />
                                <div className="text-xs font-black text-gray-500 uppercase">Downtime</div>
                                <div className="text-3xl font-black italic text-brand-green">-28%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Nodes */}
      <section className="py-32 max-w-[1400px] mx-auto px-5 lg:px-10">
         <div className="grid md:grid-cols-3 gap-10">
            {[
                { t: "Live Monitoring", d: "Real-time OEE tracking and visualization for every machine on the line.", i: <BarChart /> },
                { t: "Predictive Quality", d: "AI-driven anomaly detection to prevent defects before they happen.", i: <ShieldCheck /> },
                { t: "Supply Integration", d: "Automatic JIT material triggering based on actual production speed.", i: <Factory /> }
            ].map((node, i) => (
                <div key={i} className="group p-12 bg-white/5 border border-white/10 rounded-[40px] hover:bg-brand-orange transition-all duration-500">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-black group-hover:text-brand-orange transition-colors">
                        {node.i}
                    </div>
                    <h3 className="text-3xl font-black mb-6 italic uppercase group-hover:text-black transition-colors">{node.t}</h3>
                    <p className="text-gray-500 leading-relaxed group-hover:text-black/70 transition-colors">{node.d}</p>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default FactoryAutomationSoftware;
