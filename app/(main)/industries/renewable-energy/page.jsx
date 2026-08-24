"use client";
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  ClipboardList,
  Cpu,
  FileCheck,
  Layers,
  ShieldCheck,
  Sun,
  Tag,
  Workflow,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const metadata = {
  title: "RFID & IoT Solutions for Renewable Energy Sector India | Aether RFID",
  description:
    "IoT and RFID-based asset tracking & monitoring solutions for the renewable energy industry in India — improving efficiency & operational",
  keywords:
    "IoT solutions provider India, RFID for renewable energy India, asset tracking renewable energy",
};

const RenewableEnergyIndustry = () => {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { value: "100%", label: "Solar panel traceability across lifecycle" },
    { value: "Automated", label: "RFID tag encoding on production line" },
    { value: "Genealogy", label: "Linked Flash test & EL test records" },
    {
      value: "Quick Field Audit",
      label: "Instant verification with handheld readers",
    },
  ];

  const workflowSteps = [
    {
      title: "Production Line Tag Encoding",
      tagline: "Automatic RFID tag encoding during module manufacturing",
      description:
        "RFID tags are automatically encoded during solar module manufacturing, generating a unique EPC linked to the module serial number. Integrates seamlessly with Flash Test, EL Test, and Final QC stations to store manufacturing data, test results, and component genealogy.",
      bullets: [
        "Automatic RFID tag encoding during module manufacturing",
        "EPC generation linked with module serial number",
        "Integration with Flash Test, EL Test & Final QC stations",
        "Stores module manufacturing data, test results & component genealogy",
      ],
      image: "/assets/industries/renewable-energy-encoding.png",
    },
    {
      title: "End-to-End WIP Traceability",
      tagline: "Track every solar panel throughout manufacturing assembly",
      description:
        "Real-time Work-in-Progress (WIP) tracking across all production stages—Cell Stringing, Lamination, Framing, Junction Box Assembly, and Testing. Ensures complete production genealogy and eliminates manual tracking errors.",
      bullets: [
        "Cell Stringing & Lamination tracking",
        "Framing & Junction Box Assembly logging",
        "EL Testing & Flash Testing records",
        "Real-time Work-in-Progress (WIP) visibility & genealogy",
      ],
      image: "/assets/industries/solar-wip-tracking.png",
    },
    {
      title: "Warehouse & Dispatch Management",
      tagline: "Automate finished goods handling with fixed RFID readers",
      description:
        "Verify pallets and shipping cartons automatically as they pass through fixed RFID dock gates. Enables FIFO management, automated inventory updates, and wrong shipment prevention before panels leave the factory.",
      bullets: [
        "Automated inventory management",
        "Pallet and carton tracking",
        "Dispatch verification & wrong shipment prevention",
        "FIFO management & automated GRN updates",
      ],
      image: "/assets/industries/logistics-outbound-dispatch-v2.png",
    },
    {
      title: "Handheld Panel Audit & Field Service",
      tagline: "Instant panel verification in warehouse and solar farm field",
      description:
        "Aether handheld RFID readers enable lightning-fast panel inventory audits, solar park inspections, warranty verification, asset authentication, and field service support for utility operators.",
      bullets: [
        "Fast inventory audits & solar park inspections",
        "Warranty verification & asset authentication",
        "Installation validation & field service support",
        "Ideal for Manufacturers, EPC Contractors & Utility Companies",
      ],
      image: "/assets/industries/solar-panels-open-field.avif",
    },
  ];

  const benefits = [
    { title: "100% Solar Panel Traceability", icon: ShieldCheck },
    { title: "Automated RFID Tag Encoding", icon: Tag },
    { title: "Complete Panel & Component Genealogy", icon: Layers },
    { title: "Real-Time WIP Manufacturing Visibility", icon: Activity },
    { title: "Faster Inventory & Dispatch Operations", icon: Workflow },
    { title: "Quick Field Audits with Handheld RFID", icon: ClipboardList },
    { title: "Improved Warranty & Quality Management", icon: FileCheck },
    { title: "Industry 4.0 Ready Solar Solution", icon: Cpu },
  ];

  const integrationSystems = [
    "SAP ERP Integration",
    "Oracle Cloud ERP",
    "Microsoft Dynamics 365",
    "Manufacturing Execution Systems (MES)",
    "SCADA Industrial Automation",
    "Custom Production ERP Systems",
  ];

  const applications = [
    "Solar Module Manufacturing",
    "Production Line Automation",
    "WIP & Assembly Tracking",
    "Warehouse & Inventory Management",
    "Dispatch Gate Verification",
    "EPC Installation Audit",
    "Warranty & Lifecycle Management",
    "Solar Farm Asset Tracking",
    "Quality & Compliance Traceability",
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-12 px-5 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Sun size={14} className="text-amber-500 fill-amber-500" />
          <span>Solar & Renewable Energy Traceability</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
          Smart RFID Traceability for <br />
          <span className="text-brand-orange">Solar Panel Manufacturing</span>
        </h1>

        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium">
          Tag • Track • Trace • Verify • Optimise — Empowering Smart Solar
          Manufacturing with End-to-End Panel Level Visibility.
        </p>

        {/* Hero Banner Image */}
        <div className="max-w-[1100px] mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 mb-12 relative bg-slate-100">
          <img
            src="/assets/industries/renewable-energy-hero.png"
            alt="Solar Panel Manufacturing RFID Traceability"
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
            <span className="text-brand-orange">Renewable Energy</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 max-w-4xl mx-auto leading-snug">
            Automating Solar Panel Genealogy & Lifecycle Compliance
          </h2>

          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Solar manufacturers require complete panel-level traceability to
            comply with global quality standards, warranty requirements, and
            government regulations. Manual tracking using barcodes is
            labour-intensive and provides limited visibility throughout the
            manufacturing lifecycle. Aether RFID provides an end-to-end solar
            panel traceability platform.
          </p>

          {/* Stats Row */}
          <div className="relative max-w-[1000px] mx-auto">
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] border-t-2 border-dashed border-slate-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center"
                >
                  <div className="text-2xl font-extrabold text-brand-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROPOSED RFID WORKFLOW */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Complete Solar Traceability Workflow
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            From production line encoding and manufacturing traceability to
            warehouse automation and field audits.
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
              {workflowSteps[activeTab].tagline}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {workflowSteps[activeTab].description}
            </p>
            <div className="space-y-3 pt-2">
              {workflowSteps[activeTab].bullets.map((bullet, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-brand-green/10 text-brand-green p-0.5 rounded-full shrink-0">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                    {bullet}
                  </span>
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

      {/* 4. BENEFITS SECTION */}
      <section className="py-20 px-5 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Benefits of RFID for Solar Manufacturing
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              How panel-level digital identity enhances compliance, warranty
              tracking, and quality management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4 shrink-0">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug tracking-tight">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ERP & MES INTEGRATION */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto border-b border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            ERP & MES Integration
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Aether RFID connects directly into your existing enterprise software
            stack for automated data logging.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrationSystems.map((sys, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex items-center justify-center text-center"
            >
              <span className="text-slate-800 font-extrabold text-xs leading-tight">
                {sys}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. APPLICATIONS */}
      <section className="py-20 px-5 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Key Applications
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/80 p-6 rounded-2xl flex items-center gap-4 shadow-sm"
              >
                <div className="p-2.5 bg-brand-blue/10 text-brand-blue rounded-xl shrink-0">
                  <Zap size={18} />
                </div>
                <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">
                  {app}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION - REDIRECT TO CONTACT PAGE */}
      <section className="py-20 px-5 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-brand-orange text-xs font-extrabold uppercase tracking-[0.2em] block">
            Aether RFID - Smart Solar Traceability
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Empower Your Solar Manufacturing Line Today
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            From production line encoding to panel field audits, get in touch
            with our solar RFID experts for a custom demonstration.
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

export default RenewableEnergyIndustry;
