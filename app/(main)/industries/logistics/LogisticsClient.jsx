"use client";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calculator,
  Check,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Database,
  Eye,
  EyeOff,
  Layers,
  LayoutDashboard,
  ListTodo,
  MapPin,
  Package,
  PackageX,
  Settings2,
  Tag,
  Truck,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";



const LogisticsAutomation = () => {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { value: "99%+", label: "Inventory accuracy guarantee" },
    { value: "Full", label: "Traceability receiving to dispatch" },
    { value: "Zero", label: "Manual scanning delay blocks" },
    { value: "Reduced", label: "Operational costs and loss counts" },
  ];

  const challenges = [
    { title: "Manual inventory processes", icon: ClipboardList },
    { title: "Limited visibility of goods movement", icon: EyeOff },
    { title: "Inventory inaccuracies", icon: Calculator },
    { title: "Delays in receiving and dispatch", icon: Clock },
    { title: "Misplaced or lost inventory", icon: PackageX },
    { title: "Labour-intensive stock audits", icon: Users },
    { title: "Shipment verification errors", icon: AlertCircle },
    { title: "Lack of real-time warehouse insights", icon: BarChart3 },
  ];

  const solutionAreas = [
    {
      title: "Inbound Automation",
      subtitle:
        "Automate receiving with RFID-enabled goods identification at warehouse entry.",
      features: [
        "Automatic identification of pallets, cartons, and bins",
        "Instant inventory updates in ERP/WMS",
        "Automated PO and shipment verification",
        "Barcode-free receiving process",
      ],
      benefits: [
        "Faster goods receipt",
        "Automated GRN generation",
        "Improved inventory accuracy",
        "Reduced manual effort",
      ],
      icon: Package,
      image: "/assets/industries/logistics-2.png",
    },
    {
      title: "Internal Warehouse Tracking",
      subtitle:
        "Track every inventory movement across the warehouse in real time.",
      features: [
        "Receiving ➔ Storage",
        "Storage ➔ Picking",
        "Picking ➔ Packing",
        "Packing ➔ Dispatch",
        "Inter-warehouse transfers",
        "Production material movement",
      ],
      benefits: [
        "Real-time location tracking",
        "Complete movement history",
        "Reduced inventory loss",
        "Enhanced warehouse visibility",
      ],
      icon: Activity,
      image: "/assets/industries/logistics-internal-tracking-v2.png",
    },
    {
      title: "Smart Inventory Monitoring",
      subtitle:
        "Maintain accurate inventory with continuous RFID-based tracking.",
      features: [
        "Live inventory visibility",
        "Rack and pallet tracking",
        "Automated stock updates",
        "Missing inventory alerts",
        "Inventory ageing and audit support",
      ],
      benefits: [
        "99%+ inventory accuracy",
        "Faster stock audits",
        "Better inventory control",
        "Improved operational efficiency",
      ],
      icon: Eye,
      image: "/assets/industries/logistics-smart-inventory-v2.png",
    },
    {
      title: "Outbound Dispatch Automation",
      subtitle:
        "Verify every shipment automatically before it leaves the warehouse.",
      features: [
        "RFID portal-based dispatch verification",
        "Automatic shipment validation",
        "Incorrect shipment alerts",
        "ERP/WMS dispatch updates",
      ],
      benefits: [
        "Accurate dispatch verification",
        "Faster loading operations",
        "Reduced shipping errors",
        "Improved customer satisfaction",
      ],
      icon: Truck,
      image: "/assets/industries/logistics-outbound-dispatch-v2.png",
    },
  ];

  const dashboardFeatures = [
    { title: "Live inventory status", icon: Layers },
    { title: "Inbound and outbound tracking", icon: Truck },
    { title: "Internal material movement", icon: Workflow },
    { title: "Asset tracking", icon: Package },
    { title: "Warehouse occupancy", icon: LayoutDashboard },
    { title: "Vehicle and shipment monitoring", icon: MapPin },
    { title: "Alerts and notifications", icon: AlertTriangle },
    { title: "Analytics and performance reports", icon: BarChart3 },
  ];

  const hardwareComponents = [
    { title: "UHF RFID Tags", icon: Tag },
    { title: "Fixed RFID Readers", icon: Cpu },
    { title: "RFID Gate Portals", icon: Workflow },
    { title: "RFID Antennas", icon: Layers },
    { title: "Handheld RFID Readers", icon: ClipboardList },
    { title: "RFID Printers", icon: Settings2 },
  ];

  const softwareComponents = [
    { title: "RFID Middleware", icon: Database },
    { title: "Warehouse Management System (WMS)", icon: LayoutDashboard },
    { title: "Inventory Management System", icon: ListTodo },
    { title: "Dashboard & Analytics", icon: BarChart3 },
    { title: "ERP Integration", icon: Settings2 },
    { title: "Mobile Application", icon: Activity },
    { title: "Alert & Notification Engine", icon: AlertTriangle },
  ];

  const whyAether = [
    "End-to-end warehouse automation",
    "Real-time inventory and asset visibility",
    "Automated inbound, outbound, and internal tracking",
    "Seamless ERP/WMS integration",
    "Scalable for single or multi-site operations",
    "High-speed, hands-free RFID data capture",
    "Custom dashboards and actionable analytics",
    "Reduced operational costs with improved accuracy",
  ];

  const businessBenefits = [
    "99%+ inventory accuracy",
    "Faster warehouse operations",
    "Reduced manual intervention",
    "Improved traceability",
    "Lower inventory losses",
    "Increased workforce productivity",
    "Faster order fulfilment",
    "Better supply chain visibility",
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-12 px-5 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight max-w-4xl mx-auto tracking-tight">
          Aether RFID - Smart Warehouse <br />
          <span className="text-brand-orange">& Logistics Automation</span>
        </h1>

        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium">
          RFID & IoT Based Automation Solution for Logistics & Supply Chain
        </p>

        {/* Hero Banner Image */}
        <div className="max-w-[1100px] mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 mb-12 relative bg-slate-100">
          <img
            src="/assets/industries/logistics-1.png"
            alt="Smart Logistics & Warehouse Automation"
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
            <span className="text-brand-orange">Logistics</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 max-w-4xl mx-auto leading-snug">
            End-to-End Supply Chain Controls
          </h2>

          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Aether RFID delivers intelligent warehouse and logistics automation
            through advanced RFID technology. Our solution provides real-time
            visibility of inventory, assets, and material movement—from inbound
            receipt to outbound dispatch—ensuring accurate tracking, faster
            operations, and complete warehouse control. By integrating RFID
            tags, readers, portals, and software with your ERP/WMS, Aether RFID
            eliminates manual scanning, minimises errors, and enables
            data-driven supply chain operations.
          </p>

          {/* Stats Row with Connecting Dashed Line */}
          <div className="relative max-w-[1000px] mx-auto">
            {/* Horizontal Line behind cards */}
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-[2px] border-t-2 border-dashed border-slate-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center"
                >
                  <div className="text-3xl font-extrabold text-brand-orange mb-2">
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

      {/* 3. INDUSTRY CHALLENGES */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto border-b border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Industry Challenges
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Warehouses and logistics operations often struggle with standard
            bottleneck operations:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge, index) => {
            const ChallengeIcon = challenge.icon;
            return (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex items-start gap-4"
              >
                <div className="p-2 bg-red-100 text-red-600 rounded-xl shrink-0 mt-0.5">
                  <ChallengeIcon size={16} />
                </div>
                <span className="text-slate-700 text-sm font-semibold leading-snug">
                  {challenge.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SOLUTIONS WORKFLOW AREA */}
      <section className="py-20 px-5 bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Aether RFID Solution
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              Choose an operation area to explore target features and benefits.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex justify-center border-b border-slate-200 mb-12">
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-0.5">
              {solutionAreas.map((step, index) => (
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
                {solutionAreas[activeTab].title}
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {solutionAreas[activeTab].title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {solutionAreas[activeTab].subtitle}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Features
                  </h4>
                  <div className="space-y-2">
                    {solutionAreas[activeTab].features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check
                          size={12}
                          className="text-brand-blue mt-0.5 shrink-0"
                        />
                        <span className="text-xs text-slate-700 font-semibold">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Benefits
                  </h4>
                  <div className="space-y-2">
                    {solutionAreas[activeTab].benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check
                          size={12}
                          className="text-brand-green mt-0.5 shrink-0"
                        />
                        <span className="text-xs text-slate-700 font-semibold">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-white aspect-[4/3] flex items-center justify-center p-3 sm:p-5 group">
              <img
                src={solutionAreas[activeTab].image}
                alt={solutionAreas[activeTab].title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. WAREHOUSE VISIBILITY DASHBOARD */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto border-b border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Warehouse Visibility Dashboard
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            A unified monitoring screen aggregates critical site updates:
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dashboardFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4 shrink-0">
                  <Icon size={20} />
                </div>
                <h3 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug">
                  {feat.title}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. SOLUTION COMPONENTS */}
      <section className="py-20 px-5 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Solution Components
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b pb-2">
                Hardware
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hardwareComponents.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-slate-200/50 p-4 rounded-xl flex items-center gap-3 shadow-sm"
                    >
                      <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg shrink-0">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b pb-2">
                Software
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softwareComponents.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white border border-slate-200/50 p-4 rounded-xl flex items-center gap-3 shadow-sm"
                    >
                      <div className="p-2 bg-brand-blue/10 text-brand-blue rounded-lg shrink-0">
                        <Icon size={16} />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY AETHER & BUSINESS BENEFITS */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-8">
              Why Aether RFID?
            </h3>
            <div className="space-y-3">
              {whyAether.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 border border-slate-200/50 p-4 rounded-xl"
                >
                  <div className="mt-0.5 bg-brand-orange/10 text-brand-orange p-1 rounded-full shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-8">
              Business Benefits
            </h3>
            <div className="space-y-3">
              {businessBenefits.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 border border-slate-200/50 p-4 rounded-xl"
                >
                  <div className="mt-0.5 bg-brand-green/10 text-brand-green p-1 rounded-full shrink-0">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION - REDIRECT TO CONTACT PAGE */}
      <section className="py-20 px-5 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-brand-orange text-xs font-extrabold uppercase tracking-[0.2em] block">
            Transform Your Warehouse with Aether RFID
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Intelligent, Real-Time Warehouse Automation
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            From receiving to dispatch, build a smarter, faster, and more
            efficient supply chain with our RFID experts.
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

export default LogisticsAutomation;
