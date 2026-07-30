"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  LayoutDashboard, 
  Database,
  Truck,
  Package,
  Activity,
  Workflow,
  Settings2,
  FileCheck,
  Tag,
  Eye,
  TrendingUp,
  ClipboardList,
  BarChart3,
  CheckCircle,
  ChevronRight
} from "lucide-react";

const ManufacturingAutomation = () => {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { value: "100%", label: "Material traceability across lifecycle" },
    { value: "Real-Time", label: "Work-in-progress tracking feedback" },
    { value: "Automated", label: "Identification at workstation lines" },
    { value: "Connected", label: "Intelligent ERP/MES/WMS integrations" }
  ];

  const workflowSteps = [
    {
      title: "Raw Material Identification",
      tagline: "RFID tagging upon material arrival and warehousing intake",
      description: "RFID tagging of raw materials, bins, pallets, and components upon receipt.",
      bullets: [
        "Pallets and bins tracked instantly",
        "Verification upon gate arrival",
        "Raw store inventory logging"
      ],
      image: "/assets/industries/manufacturing-2.png"
    },
    {
      title: "Production & WIP Tracking",
      tagline: "Live flow status feedback of parts across assembly lines",
      description: "Real-time tracking of work-in-progress (WIP) through production stages. Automated identification at workstations and assembly lines.",
      bullets: [
        "Workstation passive scanning",
        "Delayed assembly warnings",
        "Bottleneck identification logs"
      ],
      image: "/assets/industries/manufacturing-wip-tracking-v2.png"
    },
    {
      title: "Warehouse & Logistics",
      tagline: "Automatic stock updates and dispatch check validations",
      description: "Accurate inventory management and automated dispatch verification. Real-time tracking of finished goods from warehouse to customer.",
      bullets: [
        "Finished goods tracking",
        "Portal-based dock loading audits",
        "Minimized dispatch errors"
      ],
      image: "/assets/industries/manufacturing-dock-dispatch-v2.png"
    }
  ];

  const ecosystemItems = [
    { title: "RFID Tags (Component, Asset, Bin & Pallet)", icon: Tag },
    { title: "Fixed RFID Readers & Antennas", icon: Cpu },
    { title: "RFID Handheld Readers", icon: Layers },
    { title: "RFID Portals & Workstation Readers", icon: Workflow },
    { title: "RFID Middleware & Manufacturing Dashboard", icon: LayoutDashboard },
    { title: "ERP/MES/WMS Integration", icon: Database },
    { title: "Installation, Commissioning & Training", icon: FileCheck },
    { title: "Annual Maintenance & Technical Support", icon: Settings2 }
  ];

  const benefits = [
    { title: "End-to-End Material Traceability", icon: Layers },
    { title: "Real-Time WIP Visibility", icon: Eye },
    { title: "Improved Production Efficiency", icon: TrendingUp },
    { title: "Reduced Manual Scanning & Errors", icon: ShieldCheck },
    { title: "Faster Inventory Audits", icon: ClipboardList },
    { title: "Optimised Asset Utilisation", icon: Settings2 },
    { title: "Enhanced Quality & Compliance", icon: FileCheck },
    { title: "Data-Driven Production Insights", icon: BarChart3 }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-12 px-5 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
          Connecting materials, <br />
          <span className="text-brand-orange">machines, processes, and people</span>
        </h1>
        
        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium">
          Smart Manufacturing with End-to-End RFID Visibility
        </p>

        {/* Hero Banner Image */}
        <div className="max-w-[1100px] mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 mb-12 relative bg-slate-100">
          <img 
            src="/assets/industries/manufacturing-1.jpeg" 
            alt="Smart Manufacturing Automation" 
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
            <span className="text-brand-orange">Manufacturing</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 max-w-4xl mx-auto leading-snug">
            RFID-Based Manufacturing Automation
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Aether RFID delivers a complete RFID ecosystem that enables manufacturers to achieve real-time visibility, automate material movement, and ensure complete traceability across the production lifecycle.
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
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Solution Overview</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Aether RFID tracks raw resources, parts workflow, and finished inventory routing.
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
              Benefits of RFID for the manufacturing industry
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              How RFID delivers raw tracing, material validation, and optimized shop floor operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4 shrink-0">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug tracking-tight">
                    {benefit.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COMPLETE SOLUTION SCOPE */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Complete Solution Scope</h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Aether RFID supplies and implements the complete manufacturing automation ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-200/85 p-6 rounded-2xl flex items-start gap-4 shadow-sm"
              >
                <div className="p-2.5 bg-brand-blue/5 text-brand-blue rounded-xl shrink-0">
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION - REDIRECT TO CONTACT PAGE */}
      <section className="py-20 px-5 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-brand-orange text-xs font-extrabold uppercase tracking-[0.2em] block">
            Aether RFID - Smart Manufacturing Automation
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Ready to Automate Your Manufacturing Line?
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Connect materials, machines, processes, and people. Speak with our industrial RFID automation engineers today.
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

export default ManufacturingAutomation;
