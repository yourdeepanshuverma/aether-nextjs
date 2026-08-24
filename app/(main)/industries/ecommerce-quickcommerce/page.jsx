import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Building,
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
  MapPin,
  Package,
  PackageX,
  Settings2,
  ShieldCheck,
  Tag,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "RFID Solutions for E-commerce & Quick Commerce India | Aether RFID",
  description:
    "RFID inventory & warehouse solutions built for e-commerce and quick-commerce businesses in India — faster fulfillment, accurate stock tracking.",
  keywords:
    "RFID inventory management solution India, RFID for ecommerce India, quick commerce RFID solution",
};

const EcommerceAutomation = () => {
  const stats = [
    { value: "99%", label: "Inventory tracking accuracy" },
    { value: "Hands-Free", label: "RFID portal scanning gates" },
    { value: "Live", label: "Warehouse movement tracking" },
    { value: "Alerts", label: "Exception and loss prevention" },
  ];

  const challenges = [
    { title: "Limited real-time visibility", icon: EyeOff },
    { title: "Misplaced pallets and totes", icon: PackageX },
    { title: "Inventory inaccuracies", icon: Calculator },
    { title: "Manual intervention and labour dependency", icon: Users },
    { title: "Shipping and picking errors", icon: AlertCircle },
    { title: "Asset losses and delayed order fulfilment", icon: Clock },
  ];

  const keyFeatures = [
    { title: "Real-time asset visibility", icon: Eye },
    { title: "Automated pallet, tote and bin identification", icon: Package },
    { title: "Hands-free RFID portal scanning", icon: Workflow },
    { title: "Live warehouse movement tracking", icon: Activity },
    { title: "Inventory accuracy up to 99%", icon: ShieldCheck },
    { title: "Exception and loss alerts", icon: AlertTriangle },
    { title: "Search and locate assets instantly", icon: MapPin },
    { title: "Dashboard with movement analytics", icon: LayoutDashboard },
    { title: "Integration with ERP, WMS and OMS", icon: Database },
    { title: "Cloud and on-premise deployment", icon: Cpu },
  ];

  const deploymentAreas = [
    "Fulfilment Centres",
    "Dark Stores",
    "Distribution Centres",
    "Micro Fulfilment Centres",
    "Cross-Docking Facilities",
    "Retail Warehouses",
    "Sorting Centres",
    "Reverse Logistics Operations",
  ];

  const components = [
    { title: "UHF RFID Tags for Pallets, Totes & Bins", icon: Tag },
    { title: "Fixed RFID Readers", icon: Cpu },
    { title: "RFID Portal Gates", icon: Workflow },
    { title: "RFID Handheld Readers", icon: ClipboardList },
    { title: "RFID Antennas", icon: Layers },
    { title: "AETHER-RFID Middleware", icon: Database },
    { title: "Web & Mobile Dashboard", icon: LayoutDashboard },
    { title: "ERP / WMS / OMS Integration", icon: Settings2 },
  ];

  const whyAether = [
    "End-to-End RFID Automation Solutions",
    "Proven Expertise in Warehouse & Supply Chain Automation",
    "Scalable Architecture for Multi-Site Operations",
    "Real-Time Dashboards & Analytics",
    "Seamless Integration with Existing Business Systems",
    "Reduced Operational Costs with Higher Productivity",
  ];

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-12 px-5 max-w-[1200px] mx-auto text-center relative">
        <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight max-w-5xl mx-auto tracking-tight">
          Pallet, Tote & Bin Tracking <br />
          <span className="text-brand-orange">
            Solution for Quick Commerce & E-Commerce
          </span>
        </h1>

        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-12 font-medium">
          Identify | Analyze | Automate
        </p>

        {/* Hero Banner Image */}
        <div className="max-w-[1100px] mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 mb-12 relative bg-slate-100">
          <img
            src="/assets/industries/ecommerce-1.jpeg"
            alt="Pallet, Tote & Bin Tracking Solution"
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
            <span className="text-brand-orange">E-commerce</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 max-w-4xl mx-auto leading-snug">
            Automating Fulfilment Loops with Intelligent RFID Tracking
          </h2>

          <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            AETHER-RFID delivers an end-to-end RFID solution that enables
            automatic identification and real-time tracking of pallets, reusable
            totes, and warehouse bins across the entire fulfilment process
            without manual scanning. Using UHF RFID technology, every movement
            is captured automatically through RFID portals, fixed readers,
            handheld readers, and mobile devices, providing complete visibility
            from receiving to last-mile dispatch.
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

      {/* 3. BUSINESS CHALLENGE */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto border-b border-slate-100">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
              Business Challenge
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
              Quick commerce and e-commerce operations rely on thousands of
              pallets, totes, and bins moving rapidly across fulfilment centres,
              dark stores, warehouses, sorting hubs, and delivery stations.
              Manual barcode scanning often leads to challenges.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              To meet the growing demand for same-day and next-hour deliveries,
              businesses require a fully automated, real-time tracking solution.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {challenges.map((challenge, index) => {
              const ChallengeIcon = challenge.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex items-start gap-3"
                >
                  <div className="p-1 bg-red-100 text-red-600 rounded-lg shrink-0 mt-0.5">
                    <ChallengeIcon size={14} />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                    {challenge.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3.5 VISUAL SOLUTION SHOWCASE */}
      <section className="py-16 px-5 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-slate-50 border border-slate-200/80 rounded-[32px] p-8 md:p-12 shadow-sm">
          <div className="space-y-6">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-3.5 py-1.5 rounded-full inline-block">
              Intelligent RFID Fulfilment
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Automated Pallet, Tote & Bin Tracking
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              High-speed conveyor scanners and portal gates eliminate manual
              scans, ensuring instant asset accounting and zero-lag sorting in
              dark stores and fulfilment hubs.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-brand-green/10 text-brand-green p-0.5 rounded-full shrink-0">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                  Automatic tote identification on conveyors
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-brand-green/10 text-brand-green p-0.5 rounded-full shrink-0">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                  Real-time bin audit across dark store shelves
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-brand-green/10 text-brand-green p-0.5 rounded-full shrink-0">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                  Seamless integration with WMS & OMS platforms
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white aspect-[4/3] flex items-center justify-center p-3 sm:p-5 group">
            <img
              src="/assets/industries/ecommerce-tote-tracking-v2.png"
              alt="Automated Pallet, Tote & Bin Tracking"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES (CIRCULAR GRID CONCEPT) */}
      <section className="py-20 px-5 bg-slate-50 border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Key Features
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
              Aether RFID automates asset logs to ensure zero-lag supply chain
              tracking.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {keyFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/80 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all animate-fade-in"
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
        </div>
      </section>

      {/* 5. TYPICAL DEPLOYMENT AREAS */}
      <section className="py-20 px-5 max-w-[1200px] mx-auto border-b border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Typical Deployment Areas
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {deploymentAreas.map((area, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl flex items-center gap-4"
            >
              <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-xl shrink-0">
                <Building size={20} />
              </div>
              <span className="text-slate-800 font-extrabold text-xs sm:text-sm leading-tight">
                {area}
              </span>
            </div>
          ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {components.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/80 p-6 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="p-2.5 bg-brand-blue/10 text-brand-blue rounded-xl shrink-0">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WHY AETHER-RFID */}
      <section className="py-20 px-5 max-w-[900px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Why AETHER-RFID?
          </h2>
        </div>
        <div className="space-y-4">
          {whyAether.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl flex items-center gap-4"
            >
              <div className="p-1.5 bg-brand-green/10 text-brand-green rounded-full shrink-0">
                <Check size={16} className="stroke-[3]" />
              </div>
              <span className="text-slate-850 font-extrabold text-xs sm:text-sm leading-normal">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION - REDIRECT TO CONTACT PAGE */}
      <section className="py-20 px-5 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-brand-orange text-xs font-extrabold uppercase tracking-[0.2em] block">
            Transform Warehouse Operations with Intelligent RFID Tracking
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Automating Pallet, Tote & Bin Tracking
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            AETHER-RFID delivers complete supply chain visibility, faster order
            fulfilment, and improved inventory accuracy. Speak to our team.
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

export default EcommerceAutomation;
