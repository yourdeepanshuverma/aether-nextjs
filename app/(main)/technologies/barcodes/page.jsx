"use client";
import { Barcode, Scan, QrCode, ClipboardCheck, Package, ShoppingBag, ShieldCheck, Zap, Layers, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

const Barcodes = () => {
  const barcodeTypes = [
    {
      title: "1D Linear Barcodes",
      desc: "The classic standard for retail and inventory, including UPC, EAN, and Code 128 for reliable scanning.",
      icon: <Barcode size={40} className="text-brand-blue group-hover:text-white transition-colors" />,
    },
    {
      title: "2D & QR Codes",
      desc: "High-density data storage in small spaces. Perfect for complex product info, URLs, and authentication.",
      icon: <QrCode size={40} className="text-brand-blue group-hover:text-white transition-colors" />,
    },
    {
      title: "Industry Standards",
      desc: "Compliance with GS1 and other global standards ensures your products are ready for any supply chain.",
      icon: <Settings size={40} className="text-brand-blue group-hover:text-white transition-colors" />,
    },
  ];

  const benefits = [
    {
      title: "Lightning Speed",
      text: "Instantly capture data with millisecond precision, drastically reducing manual entry time.",
      icon: <Zap size={48} className="text-brand-orange" />,
    },
    {
      title: "99.9% Accuracy",
      text: "Eliminate human error in tracking, ensuring your inventory records are always trustworthy.",
      icon: <ShieldCheck size={48} className="text-brand-orange" />,
    },
    {
      title: "Cost Effective",
      text: "The most affordable and accessible technology for high-volume asset and product tracking.",
      icon: <Package size={48} className="text-brand-orange" />,
    },
    {
      title: "Global Reach",
      text: "Universal compatibility makes barcodes the language of international trade and logistics.",
      icon: <Layers size={48} className="text-brand-orange" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Geometric & Modern */}
      <section className="relative min-h-[80vh] flex items-center bg-[#f8fafc] overflow-hidden">
        {/* Geometric Background Decorations */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-blue/5 skew-x-[-12deg] translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[20%] h-[50%] bg-brand-green/5 rounded-tr-[100px]"></div>
          {/* Vertical Lines mimicking barcodes */}
          <div className="absolute top-20 right-[15%] flex gap-2 opacity-10">
            {[2, 4, 1, 3, 2, 6, 2].map((w, i) => (
              <div key={i} className="bg-brand-blue h-40" style={{ width: `${w * 4}px` }}></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-brand-green"></span>
              <span className="text-brand-green font-bold uppercase tracking-widest text-sm">Essential Identification</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.0]">
              Modern Barcode <br />
              <span className="text-brand-orange">Systems</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
              From traditional retail to advanced industrial tracking, our barcode solutions provide the foundation for efficient, error-free data capture across your entire enterprise.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/contact" className="bg-brand-orange text-white font-semibold tracking-wide px-10 py-4 rounded-xl hover:shadow-2xl hover:shadow-brand-orange/30 transition-all flex items-center gap-2">
                Get Started <ArrowRight size={20} />
              </Link>
              
            </div>
          </div>

          <div className="relative group">
            <div className="relative z-10 bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
               <img 
                src="/assets/technologies/barcode.jpg" 
                alt="Barcode Scanning" 
                className="w-full h-auto rounded-[32px] group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-scan"></div>
            </div>
            {/* Floating Card */}
            <div className="absolute z-10 bottom-6 -right-6 bg-brand-green p-6 rounded-3xl text-white shadow-xl hidden md:block">
               <div className="flex items-center gap-3 mb-2 font-bold">
                  <Scan size={24} /> 100% Readable
               </div>
               <div className="text-xs opacity-80 uppercase tracking-widest font-bold">Standard Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Foundation of <br /> Efficient Data Capture</h2>
            <p className="text-gray-500 text-lg mb-6">
                Barcodes remain the most reliable and cost-effective method for tracking goods globally. Aether-RFID provides end-to-end expertise in designing and deploying scalable barcode environments.
            </p>
            <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-20 bg-gray-200"></div>
            <div className="w-3 h-3 rounded-full bg-brand-green"></div>
            <div className="h-[2px] w-20 bg-gray-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barcodeTypes.map((type, i) => (
                <div key={i} className="p-10 bg-gray-50 rounded-[40px] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
                    <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all">
                        {type.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{type.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{type.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-brand-blue relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">Speed, Accuracy, and <br /> Global Compatibility</h2>
                    <p className="text-blue-100 text-lg mb-12 font-light">
                        Deploying a barcode system isn't just about printing labels; it's about creating a seamless bridge between your physical assets and digital records.
                    </p>
                    <div className="space-y-6">
                        {["Instant stock verification", "Zero human data entry errors", "Low maintenance technology", "Simple staff training"].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
                                    <ArrowRight size={14} className="text-white" />
                                </div>
                                <span className="text-lg font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[32px] hover:bg-white/20 transition-all">
                            <div className="mb-6">{benefit.icon}</div>
                            <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                            <p className="text-blue-100 text-sm leading-relaxed">{benefit.text}</p>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* Applications */}
      <section className="py-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
            <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Built for Every <span className="text-brand-blue">Environment</span></h2>
            </div>
                <p className="text-gray-500 text-lg">Our barcode solutions are engineered for high-intensity use across diverse industries.</p>
            {/* <Link href="/contact" className="text-brand-blue font-bold flex items-center gap-2 group">
                Consult with our experts <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { label: "Retail", icon: <ShoppingBag />, img: "/assets/solutions/retail-barcode.jpg" },
                { label: "Warehousing", icon: <Package />, img: "/assets/solutions/warehouse-barcode.jpg" },
                { label: "Healthcare", icon: <ShieldCheck />, img: "/assets/solutions/healthcare-barcode.jpg" },
                { label: "Manufacturing", icon: <Settings />, img: "/assets/solutions/Manufacturing-barcade.jpg" }
            ].map((item, i) => (
                <div key={i} className="group relative h-[400px] rounded-[40px] overflow-hidden shadow-xl">
                    <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 text-white">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
                            {item.icon}
                        </div>
                        <h4 className="text-2xl font-semibold">{item.label}</h4>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-5">
         <div className="max-w-[1200px] mx-auto bg-gray-900 rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 blur-[100px]"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 relative z-10">Complete Hardware <br /> & Software Support</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed">
                From high-performance printers and scanners to custom label design software, we provide everything you need for a robust barcode environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <Link href="/contact" className="bg-brand-blue text-white font-semibold px-12 py-5 tracking-wide rounded-full hover:bg-brand-orange transition-all shadow-2xl shadow-brand-blue/20">
                    Request a Quote
                </Link>
                {/* <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-12 py-5 rounded-full hover:bg-white/20 transition-all">
                    Download Catalog
                </button> */}
            </div>
         </div>
      </section>

      <style>{`
        @keyframes scan {
            0% { top: 15%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 85%; opacity: 0; }
        }
        .animate-scan {
            animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Barcodes;
