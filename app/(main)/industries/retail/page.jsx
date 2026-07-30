"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Tag, 
  ShoppingBag, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  LayoutDashboard, 
  Database,
  Truck,
  Cpu,
  Workflow,
  CheckCircle,
  HelpCircle,
  Clock,
  ChevronRight
} from "lucide-react";

const RetailIndustry = () => {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { value: "99%+", label: "Inventory accuracy across supply chain" },
    { value: "100%", label: "Traceability from source to store" },
    { value: "Speed", label: "Faster bulk receiving and cycle counts" },
    { value: "Reduction", label: "Minimized stock losses and shrinkage" }
  ];

  const workflowSteps = [
    {
      title: "Source Tagging",
      tagline: "RFID apparel tags applied at the manufacturing or sourcing location",
      description: "RFID tags are applied to every apparel item at the manufacturing or sourcing location. Each tag is uniquely encoded with product information, enabling item-level identification from the beginning of the supply chain.",
      bullets: [
        "Applied at manufacturing origin",
        "Unique item-level encoding",
        "Enables traceability early in the supply chain"
      ],
      image: "/assets/industries/retail-source-tagging-v3.png"
    },
    {
      title: "Warehouse Management",
      tagline: "pallets, cartons, and bins identified automatically during receiving",
      description: "Tagged products are automatically identified during receiving. RFID portals and handheld readers enable rapid inventory verification, stock movement tracking, and dispatch accuracy. Real-time inventory updates eliminate manual counting and reduce operational errors.",
      bullets: [
        "Instant receiving updates",
        "Automated dispatch verification",
        "Barcode-free warehouse logs"
      ],
      image: "/assets/industries/retail-warehouse-management-v2.png"
    },
    {
      title: "Retail Store Operations",
      tagline: "Real-time visibility across the sales floor and backroom",
      description: "RFID transforms physical retail store processes by offering automatic goods verification, lightning-fast cycle counts, and real-time inventory visibility across both the backroom and the active sales floor.",
      bullets: [
        "Automatic goods receiving with RFID validation.",
        "Fast and accurate stock replenishment.",
        "Real-time inventory visibility across the sales floor and backroom.",
        "Quick cycle counting in minutes instead of hours.",
        "Improved product availability and enhanced customer service."
      ],
      image: "/assets/industries/retail-store-operations-v2.png"
    }
  ];

  const scopeItems = [
    "RFID apparel tags (Source Tagging Programme)",
    "Fixed RFID readers and antenna systems",
    "Handheld RFID readers",
    "RFID portals and receiving stations",
    "RFID printers and tag encoding (where required)",
    "RFID middleware and enterprise software",
    "Dashboard and reporting platform",
    "Integration with ERP/WMS/POS systems",
    "Installation, commissioning, testing, training, and post-implementation support"
  ];

  const benefits = [
    "99%+ inventory accuracy",
    "Complete product traceability from source to store",
    "Faster receiving and dispatch operations",
    "Reduced stock losses and shrinkage",
    "Improved replenishment efficiency",
    "Reduced manual labour and operational costs",
    "Enhanced customer shopping experience",
    "Better stock visibility for informed business decisions"
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-12 px-5 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
          Shining the light on <br />
          <span className="text-brand-orange">fashion retail inventory</span>
        </h1>
        
        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium">
          A tracking solution to achieve real-time inventory visibility across the fashion retail supply chain.
        </p>

        {/* Hero Banner Image */}
        <div className="max-w-[1100px] mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 mb-12 relative bg-slate-100">
          <img 
            src="/assets/industries/retail-1.jpeg" 
            alt="Fashion Retail Inventory Tracking" 
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* 2. OVERVIEW & BREADCRUMBS */}
      <section className="py-12 px-5 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto text-center">
          {/* Breadcrumbs */}
          <div className="flex justify-center items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            <span>Industries</span>
            <ChevronRight size={12} />
            <span className="text-brand-orange">Retail</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 max-w-4xl mx-auto leading-snug">
            Transforming Fashion Retail with End-to-End RFID Technology
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Aether RFID provides a complete RFID ecosystem that enables fashion retailers to achieve real-time inventory visibility, faster operations, and improved customer experience across the entire supply chain. Our solution covers the design, supply, installation, integration, and support of a comprehensive RFID system, including RFID tags, hardware, software, and implementation services.
          </p>

          {/* Stats Row with Connecting Dashed Line */}
          <div className="relative max-w-[1000px] mx-auto">
            {/* Horizontal Line behind cards */}
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] border-t-2 border-dashed border-slate-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
                  <div className="text-3xl font-extrabold text-brand-orange mb-2">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY INTERNAL NAVIGATION & WORKFLOW */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Proposed RFID Workflow</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Explore the movement of fashion inventory from source tagging to in-store retail checkout.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center border-b border-slate-200 mb-12">
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-0.5">
            {workflowSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`pb-4 text-sm md:text-base font-extrabold whitespace-nowrap transition-all border-b-2 relative ${
                  activeTab === index 
                    ? "border-brand-orange text-brand-orange" 
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider bg-brand-blue/5 border border-brand-blue/10 px-3.5 py-1.5 rounded-full inline-block">
              {workflowSteps[activeTab].title}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              RFID-enabled {workflowSteps[activeTab].title.toLowerCase()}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {workflowSteps[activeTab].description || workflowSteps[activeTab].tagline}
            </p>
            <div className="space-y-3 pt-2">
              {workflowSteps[activeTab].bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-brand-green/10 text-brand-green p-0.5 rounded-full shrink-0">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-semibold">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-white aspect-[4/3] flex items-center justify-center p-3 sm:p-5 group">
            <img 
              src={workflowSteps[activeTab].image} 
              alt={workflowSteps[activeTab].title}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
            />
          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION (CIRCULAR GRID CONCEPT) */}
      <section className="py-20 px-5 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Benefits of RFID for the fashion industry
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              How RFID delivers inventory visibility, faster checkouts, and complete supply chain control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4 shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug tracking-tight">
                  {benefit}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPLETE SOLUTION SCOPE */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Complete Solution Scope</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Aether RFID supplies and implements the complete fashion retail automation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scopeItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200/85 p-6 rounded-2xl flex items-start gap-4 shadow-sm"
            >
              <div className="p-2.5 bg-brand-blue/5 text-brand-blue rounded-xl shrink-0">
                <CheckCircle size={18} />
              </div>
              <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION - REDIRECT TO CONTACT PAGE */}
      <section className="py-20 px-5 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-brand-orange text-xs font-extrabold uppercase tracking-[0.2em] block">
            Aether RFID - Your End-to-End Retail Partner
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Ready to Transform Your Retail Operations?
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            From source tagging to warehouse management and retail store automation, get in touch with our expert team for a customized RFID solution demo.
          </p>
          <div className="pt-4">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold rounded-2xl shadow-xl shadow-brand-orange/25 transition-all transform hover:-translate-y-0.5 text-base"
            >
              <span>Get In Touch With Us</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RetailIndustry;
