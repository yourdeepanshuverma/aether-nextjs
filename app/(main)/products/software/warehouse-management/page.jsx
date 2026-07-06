"use client";
import Link from "next/link";
import { Box, Layers, ShieldCheck, Download, ArrowRight, ClipboardCheck, BarChart, Zap } from "lucide-react";

const WarehouseManagement = () => {
  return (
    <div className="bg-slate-50 min-h-screen selection:bg-brand-blue selection:text-white">
      {/* Heavy Industrial Hero */}
      <section className="relative py-12 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-brand-blue text-sm font-black uppercase mb-8">
                <Box size={18} /> High-Velocity Logistics
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[0.85] tracking-tighter">
                SMART <br />
                <span className="text-brand-blue">WAREHOUSE</span> <br />
                ENGINE.
              </h1>
              <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-light">
                Our WMS eliminates human error and optimizes spatial utilization. From receiving to dispatch, every movement is calculated for maximum speed.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="/contact" className="px-12 py-5 bg-brand-blue text-white font-black rounded-xl hover:scale-105 transition-transform shadow-2xl shadow-brand-blue/20">
                    Optimize My Facility
                </Link>
                <button className="px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                    Solution Overview
                </button>
              </div>
            </div>
            
            <div className="relative">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-xl">
                            <Layers className="text-brand-blue mb-4" size={32} />
                            <h4 className="font-black text-lg">Multi-Tier</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase">Inventory Control</p>
                        </div>
                        <div className="p-8 bg-brand-blue rounded-[32px] text-white">
                            <ClipboardCheck className="mb-4" size={32} />
                            <h4 className="font-black text-lg">99.9%</h4>
                            <p className="text-xs text-white/60 font-bold uppercase">Order Accuracy</p>
                        </div>
                    </div>
                    <div className="space-y-6 mt-12">
                        <div className="p-8 bg-slate-900 rounded-[32px] text-white">
                            <BarChart className="text-brand-orange mb-4" size={32} />
                            <h4 className="font-black text-lg">Live Analytics</h4>
                            <p className="text-xs text-white/40 font-bold uppercase">Throughput Tracking</p>
                        </div>
                        <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-xl">
                            <Zap className="text-brand-green mb-4" size={32} />
                            <h4 className="font-black text-lg">Instant</h4>
                            <p className="text-xs text-slate-400 font-bold uppercase">Dispatch Sync</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Grid */}
      <section className="py-32 max-w-[1400px] mx-auto px-5 lg:px-10">
         <div className="grid md:grid-cols-3 gap-12">
            {[
                { t: "Inbound Management", d: "Automated receiving with instant barcode/RFID validation and bin assignment.", i: <Box /> },
                { t: "Dynamic Picking", d: "AI-optimized picking routes that reduce travel time by up to 40%.", i: <Layers /> },
                { t: "Cross-Docking", d: "Streamline dispatch by moving products directly from receiving to shipping.", i: <Zap /> }
            ].map((item, i) => (
                <div key={i} className="group p-10 bg-white border border-slate-200 rounded-[40px] hover:border-brand-blue transition-colors">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                        {item.i}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 italic uppercase">{item.t}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.d}</p>
                </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default WarehouseManagement;
