"use client";
import Link from "next/link";
import {
  Layout,
  BarChart,
  ShoppingBag,
  ShieldCheck,
  Download,
  ArrowRight,
  Zap,
  RefreshCw,
} from "lucide-react";

const RetailAutomation = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen selection:bg-brand-orange selection:text-white">
      {/* Modern Soft Hero */}
      <section className="relative py-12 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-brand-orange text-sm font-bold mb-8">
                <ShoppingBag size={18} /> The Future of Commerce
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Intelligent <br />
                <span className="text-brand-orange">Retail Automation</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light">
                Eliminate checkout friction and inventory blind spots. Our
                retail suite transforms physical stores into data-driven,
                customer-centric environments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-brand-orange transition-all shadow-xl shadow-slate-200"
                >
                  Request Demo
                </Link>
                <Link
                  href="/case-studies"
                  className="px-10 py-5 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  Case Studies
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white backdrop-blur-2xl border border-white/10 p-8 rounded-[60px] shadow-2xl overflow-hidden group">
                {/* <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div> */}
                <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] rounded-full"></div>
                <div className="relative z-10">
                  <div className="space-y-8">
                    <div className="rounded-3xl flex items-center justify-center shadow-2xl">
                      <img
                        src="/assets/retail-hero-item.jpg"
                        alt="GPS Device"
                        className="relative z-10 w-full h-auto object-contain rounded-3xl mix-blend-screen opacity-90 group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* <MapPin size={48} /> */}
                    </div>
                    {/* <div className="p-6 bg-white/5 rounded-3xl border border-orange-500 shadow-lg text-center">
                      <div className="text-3xl font-bold">35%</div>
                      <div className="text-[10px] text-gray-500 uppercase font-black">
                        Inventory Accuracy
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="space-y-8 mt-12">
                    <div className="p-6 bg-white/5 rounded-3xl border border-orange-500 shadow-lg text-center">
                      <div className="text-3xl font-bold text-blue-500">0s</div>
                      <div className="text-[10px] text-gray-500 uppercase font-black">
                        Wait Times
                      </div>
                    </div>
                    <div className="aspect-square rounded-3xl flex items-center justify-center shadow-2xl -rotate-6 group-hover:rotate-0 transition-transform">
                      <img
                        src="/assets/gnss-device.jpg"
                        alt="GNSS Device"
                        className="relative z-10 w-full h-auto object-contain rounded-3xl mix-blend-screen opacity-90 group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="relative">
               <div className="absolute inset-0 bg-brand-orange/5 blur-[100px] rounded-full"></div>
               <div className="relative z-10 bg-white p-4 rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-8 rounded-[32px] text-center">
                        <BarChart className="text-brand-orange mx-auto mb-4" size={40} />
                        <div className="text-2xl font-black text-slate-900">35%</div>
                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Inventory Accuracy</div>
                     </div>
                     <div className="bg-slate-50 p-8 rounded-[32px] text-center">
                        <RefreshCw className="text-brand-green mx-auto mb-4" size={40} />
                        <div className="text-2xl font-black text-slate-900">0s</div>
                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Wait Times</div>
                     </div>
                  </div>
               </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-32 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Omnichannel Excellence
          </h2>
          <p className="text-slate-500 max-w-2xl text-lg mx-auto">
            Seamlessly bridge the gap between your digital presence and physical
            storefront.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              t: "Smart Shelves",
              d: "Real-time stock monitoring with automated replenishment alerts.",
              i: <Layout className="text-brand-orange" />,
            },
            {
              t: "Frictionless POS",
              d: "RFID-powered checkout systems that scan entire baskets instantly.",
              i: <Zap className="text-brand-orange" />,
            },
            {
              t: "Loss Prevention",
              d: "Intelligent security integration that reduces shrinkage without staff friction.",
              i: <ShieldCheck className="text-brand-orange" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-12 rounded-[40px] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8">
                {item.i}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {item.t}
              </h3>
              <p className="text-slate-500 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RetailAutomation;
