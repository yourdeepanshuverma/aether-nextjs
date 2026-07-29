"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Tag, 
  ShoppingBag, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Check, 
  BarChart3, 
  Settings2, 
  Cpu, 
  LayoutDashboard, 
  Database,
  Truck,
  FileCheck
} from "lucide-react";

const RetailIndustry = () => {
  const [activeTab, setActiveTab] = useState(0);

  const workflowSteps = [
    {
      title: "Source Tagging",
      subtitle: "Manufacturing & Sourcing",
      icon: Tag,
      color: "from-brand-orange to-orange-500",
      bgLight: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
      description: "RFID tags are applied to every apparel item at the manufacturing or sourcing location. Each tag is uniquely encoded with product information, enabling item-level identification from the beginning of the supply chain.",
      bullets: [
        "Unique item-level encoding at the source.",
        "Enables item tracking from origin.",
        "Prevents tagging errors and delays downstream.",
        "Saves time and costs in distribution centers."
      ]
    },
    {
      title: "Warehouse Management",
      subtitle: "Logistics & Distribution",
      icon: Truck,
      color: "from-brand-blue to-blue-500",
      bgLight: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
      description: "Tagged products are automatically identified during receiving. RFID portals and handheld readers enable rapid inventory verification, stock movement tracking, and dispatch accuracy. Real-time inventory updates eliminate manual counting and reduce operational errors.",
      bullets: [
        "Automatic receiving with RFID portals.",
        "Rapid inventory verification and bulk counting.",
        "Precise tracking of stock movement.",
        "Eliminates manual cycle counting errors."
      ]
    },
    {
      title: "Retail Store Operations",
      subtitle: "In-Store & Sales Floor",
      icon: ShoppingBag,
      color: "from-brand-green to-emerald-500",
      bgLight: "bg-brand-green/10 text-brand-green border-brand-green/20",
      description: "RFID transforms physical retail store processes by offering automatic goods verification, lightning-fast cycle counts, and real-time inventory visibility across both the backroom and the active sales floor.",
      bullets: [
        "Automatic goods receiving with RFID validation.",
        "Fast and accurate stock replenishment.",
        "Real-time inventory visibility across sales floor & backroom.",
        "Quick cycle counting completed in minutes instead of hours.",
        "Improved product availability & enhanced customer service."
      ]
    }
  ];

  const scopeItems = [
    {
      title: "RFID Apparel Tags",
      description: "Premium apparel tags tailored for Source Tagging Programmes to tag garments at manufacturing hubs.",
      icon: Tag,
      color: "text-brand-orange bg-brand-orange/5"
    },
    {
      title: "Fixed RFID Readers",
      description: "High-performance fixed readers and antenna systems designed for portals, gateways, and transition zones.",
      icon: Cpu,
      color: "text-brand-blue bg-brand-blue/5"
    },
    {
      title: "Handheld RFID Readers",
      description: "Rugged, ergonomic handheld RFID readers for inventory counts, search tags, and spot audits.",
      icon: Layers,
      color: "text-brand-green bg-brand-green/5"
    },
    {
      title: "RFID Portals & Stations",
      description: "Automated RFID portals and receiving stations for rapid in-bulk scanning of incoming cartons.",
      icon: Truck,
      color: "text-brand-orange bg-brand-orange/5"
    },
    {
      title: "RFID Middleware",
      description: "Robust middleware and enterprise software to handle tag filtering, processing, and management.",
      icon: Database,
      color: "text-brand-blue bg-brand-blue/5"
    },
    {
      title: "Dashboard & Analytics",
      description: "Custom dashboards and reporting platforms offering real-time actionable insights into stock health.",
      icon: LayoutDashboard,
      color: "text-brand-green bg-brand-green/5"
    },
    {
      title: "POS & ERP Integration",
      description: "Seamless API integrations with your existing ERP, WMS, and POS systems for zero-lag records syncing.",
      icon: Settings2,
      color: "text-brand-orange bg-brand-orange/5"
    },
    {
      title: "Lifecycle Support Services",
      description: "End-to-end installation, testing, commissioning, staff training, and 24/7 post-implementation support.",
      icon: FileCheck,
      color: "text-brand-blue bg-brand-blue/5"
    }
  ];

  const benefits = [
    "99%+ inventory accuracy across the entire supply chain",
    "Complete product traceability from source factories to retail stores",
    "Significantly faster bulk receiving and dispatch operations",
    "Drastically reduced stock losses, shrinkages, and misplaced inventory",
    "Improved in-store replenishment efficiency and stock availability",
    "Reduced manual labor hours and overall operational costs",
    "Enhanced customer shopping experience with accurate stock search",
    "Better stock visibility for data-driven manufacturing & purchasing decisions"
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0f172a] text-white pt-24 pb-32 px-5 overflow-hidden">
        {/* Radial Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <span className="text-xs sm:text-sm font-extrabold text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-4 py-1.5 rounded-full border border-brand-orange/20 inline-block mb-6">
            Fashion Retail Solutions
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
            RFID-Based Fashion <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
              Retail Automation
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Aether RFID provides a complete RFID ecosystem that enables fashion retailers to achieve real-time inventory visibility, faster operations, and improved customer experience across the entire supply chain.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-orange/95 transition-all shadow-lg shadow-brand-orange/20 text-center"
            >
              Contact Us Now
            </Link>
            <a
              href="#workflow"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/10 transition-all text-center flex items-center justify-center gap-2"
            >
              Explore Workflow <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW CARD */}
      <section className="py-12 px-5 -mt-16 relative z-20">
        <div className="max-w-[1000px] mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-[1fr_250px] gap-8 items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
                Seamless End-to-End Tracking
              </h2>
              <p className="text-slate-600 leading-relaxed mb-0 text-sm md:text-base">
                Our solution covers the design, supply, installation, integration, and support of a comprehensive RFID system, including tags, hardware, software, and integration services. We transform manual operational loops into automated validation workflows.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col justify-center items-center text-center">
              <div className="text-4xl font-extrabold text-brand-blue mb-1">99%+</div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Inventory Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE WORKFLOW (Proposed RFID Workflow) */}
      <section id="workflow" className="py-20 px-5 bg-white border-y border-slate-200/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Proposed RFID Workflow
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              Follow the journey of an apparel item from the manufacturing hub directly to the customer POS checkout.
            </p>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] gap-12 items-start">
            {/* Step Selection Toggles */}
            <div className="space-y-4">
              {workflowSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeTab === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-4 ${
                      isActive 
                        ? "bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/15" 
                        : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 ${
                      isActive ? "bg-white/10 text-white" : "bg-white text-slate-700 border border-slate-200"
                    }`}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold opacity-60 uppercase tracking-wider mb-0.5">Stage 0{index + 1}</div>
                      <div className="font-extrabold text-base tracking-tight">{step.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Workflow Step Detail Display */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              {/* background design block */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/40 rounded-full translate-x-12 -translate-y-12 blur-xl"></div>
              
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider border ${workflowSteps[activeTab].bgLight}`}>
                    {workflowSteps[activeTab].subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {workflowSteps[activeTab].title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-8">
                  {workflowSteps[activeTab].description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {workflowSteps[activeTab].bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="mt-1 bg-brand-green/10 text-brand-green p-0.5 rounded-full shrink-0">
                        <Check size={12} />
                      </div>
                      <span className="text-xs md:text-sm text-slate-700 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200/80 flex items-center gap-4 text-xs font-bold text-slate-400">
                <span>Aether End-to-End System Validation</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="text-brand-orange">Active Stage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLETE SOLUTION SCOPE */}
      <section className="py-20 px-5 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Complete Solution Scope
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              Aether RFID supplies and implements the entire retail automation ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopeItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col items-start"
                >
                  <div className={`p-3 rounded-xl mb-4 shrink-0 ${item.color}`}>
                    <IconComponent size={22} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION */}
      <section className="py-20 px-5 bg-white border-t border-slate-200/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
            
            {/* Left Big Highlight Box */}
            <div className="bg-[#0f172a] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl border border-white/5">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/20 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-blue/20 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10">
                <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-4">Value Proposition</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                  Why Partners Choose Aether RFID?
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                  Integrating RFID tag telemetry into retail operations removes standard bottlenecks, speeds up receiving cycles from hours to minutes, and cuts warehouse operational error margins to near zero.
                </p>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand-green/20 text-brand-green rounded-xl">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">Reliable Deployment</div>
                    <div className="text-sm font-extrabold text-white">MNRE Compliant & Industry Standard</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bullet Points */}
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Key Business Benefits
              </h3>
              
              <div className="grid gap-3">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                    <div className="mt-0.5 bg-brand-green/10 text-brand-green p-1 rounded-full shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 px-5 bg-slate-50">
        <div className="max-w-[1000px] mx-auto relative">
          <div className="absolute inset-0 bg-brand-blue rounded-[40px] transform rotate-1 skew-x-1 shadow-lg"></div>
          <div className="relative bg-[#0f172a] rounded-[40px] p-10 md:p-16 text-center overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[85px]"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Ready to Implement a <br />
                <span className="text-brand-orange">Modern Retail Solution?</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-10 leading-relaxed">
                Connect with our system engineers today to design a customized apparel source tagging and real-time inventory management solution.
              </p>
              <Link
                href="/contact"
                className="inline-block px-12 py-5 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-orange/90 hover:scale-105 transition-all shadow-xl shadow-brand-orange/25 text-sm"
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RetailIndustry;
