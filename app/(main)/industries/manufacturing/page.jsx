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
  Tool
} from "lucide-react";

const ManufacturingAutomation = () => {
  const [activeTab, setActiveTab] = useState(0);

  const workflowSteps = [
    {
      title: "Raw Material Identification",
      subtitle: "Solution Overview",
      icon: Package,
      color: "from-brand-orange to-orange-500",
      bgLight: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
      description: "RFID tagging of raw materials, bins, pallets, and components upon receipt."
    },
    {
      title: "Production & WIP Tracking",
      subtitle: "Solution Overview",
      icon: Activity,
      color: "from-brand-blue to-blue-500",
      bgLight: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
      description: "Real-time tracking of work-in-progress (WIP) through production stages. Automated identification at workstations and assembly lines."
    },
    {
      title: "Warehouse & Logistics",
      subtitle: "Solution Overview",
      icon: Truck,
      color: "from-brand-green to-emerald-500",
      bgLight: "bg-brand-green/10 text-brand-green border-brand-green/20",
      description: "Accurate inventory management and automated dispatch verification. Real-time tracking of finished goods from warehouse to customer."
    }
  ];

  const ecosystemItems = [
    {
      title: "RFID Tags (Component, Asset, Bin & Pallet)",
      icon: Tag,
      color: "text-brand-orange bg-brand-orange/5"
    },
    {
      title: "Fixed RFID Readers & Antennas",
      icon: Cpu,
      color: "text-brand-blue bg-brand-blue/5"
    },
    {
      title: "RFID Handheld Readers",
      icon: Layers,
      color: "text-brand-green bg-brand-green/5"
    },
    {
      title: "RFID Portals & Workstation Readers",
      icon: Workflow,
      color: "text-brand-orange bg-brand-orange/5"
    },
    {
      title: "RFID Middleware & Manufacturing Dashboard",
      icon: LayoutDashboard,
      color: "text-brand-blue bg-brand-blue/5"
    },
    {
      title: "ERP/MES/WMS Integration",
      icon: Database,
      color: "text-brand-green bg-brand-green/5"
    },
    {
      title: "Installation, Commissioning & Training",
      icon: FileCheck,
      color: "text-brand-orange bg-brand-orange/5"
    },
    {
      title: "Annual Maintenance & Technical Support",
      icon: Settings2,
      color: "text-brand-blue bg-brand-blue/5"
    }
  ];

  const benefits = [
    {
      title: "End-to-End Material Traceability",
      icon: Layers
    },
    {
      title: "Real-Time WIP Visibility",
      icon: Eye
    },
    {
      title: "Improved Production Efficiency",
      icon: TrendingUp
    },
    {
      title: "Reduced Manual Scanning & Errors",
      icon: ShieldCheck
    },
    {
      title: "Faster Inventory Audits",
      icon: ClipboardList
    },
    {
      title: "Optimised Asset Utilisation",
      icon: Settings2
    },
    {
      title: "Enhanced Quality & Compliance",
      icon: FileCheck
    },
    {
      title: "Data-Driven Production Insights",
      icon: BarChart3
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0f172a] text-white pt-24 pb-32 px-5 overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[100px]"></div>
        
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
            RFID-Based <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-teal-400">
              Manufacturing Automation
            </span>
          </h1>
          
          <h2 className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Smart Manufacturing with End-to-End RFID Visibility
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto mb-10 leading-relaxed">
            Aether RFID delivers a complete RFID ecosystem that enables manufacturers to achieve real-time visibility, automate material movement, and ensure complete traceability across the production lifecycle.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white font-bold rounded-2xl hover:bg-brand-orange/95 transition-all shadow-lg shadow-brand-orange/20 text-center text-sm"
            >
              Contact Us Now
            </Link>
            <a
              href="#overview"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-2xl border border-white/10 transition-all text-center flex items-center justify-center gap-2 text-sm"
            >
              Explore Overview <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 2. SOLUTION OVERVIEW SECTION */}
      <section id="overview" className="py-20 px-5 bg-white border-b border-slate-200/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Solution Overview
            </h2>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] gap-12 items-start">
            {/* Steps Navigation */}
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

            {/* Steps Details */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider border bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                  {workflowSteps[activeTab].subtitle}
                </span>

                <h3 className="text-2xl font-extrabold text-slate-900 mt-6 mb-4 tracking-tight">
                  {workflowSteps[activeTab].title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {workflowSteps[activeTab].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPLETE RFID ECOSYSTEM */}
      <section className="py-20 px-5 bg-slate-50 border-b border-slate-200/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Complete RFID Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex items-start gap-4"
                >
                  <div className="p-2.5 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. KEY BENEFITS */}
      <section className="py-20 px-5 bg-white border-b border-slate-200/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Key Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl flex flex-col justify-between shadow-sm"
                >
                  <div className="mb-4 text-brand-green">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-snug">
                    {benefit.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION & PARTNER CLOSE */}
      <section className="py-20 px-5 bg-slate-50">
        <div className="max-w-[1000px] mx-auto relative">
          <div className="absolute inset-0 bg-brand-blue rounded-[40px] transform rotate-1 skew-x-1 shadow-lg"></div>
          <div className="relative bg-[#0f172a] rounded-[40px] p-10 md:p-16 text-center overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[85px]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-wider block mb-4">Aether RFID</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Delivering intelligent RFID solutions that connect materials, machines, processes, and people for smarter manufacturing.
              </h2>
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

export default ManufacturingAutomation;
