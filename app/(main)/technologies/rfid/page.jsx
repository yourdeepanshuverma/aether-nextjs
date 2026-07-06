"use client";
import Link from "next/link";
import { Cpu, Zap, BarChart, Settings, ShieldCheck, Truck, ShoppingCart, Factory, CreditCard, Hospital, UserCheck, Layers } from "lucide-react";

const RFIDTechnology = () => {
  const applications = [
    {
      title: "Retail Automation",
      description: "Real-time inventory tracking and seamless checkout experiences that revolutionize consumer engagement.",
      icon: <ShoppingCart size={32} />,
    },
    {
      title: "Factory Automation",
      description: "Intelligent production line monitoring to balance workloads and eliminate manufacturing bottlenecks.",
      icon: <Factory size={32} />,
    },
    {
      title: "Hospital facility management",
      description: "RFID-powered tracking and monitoring of patients, staff, equipment, and assets for smarter, safer, and more efficient hospital operations.",
      icon: <Hospital size={32} />,
    },
    {
      title: "Supply Chain Management",
      description: "End-to-end visibility from warehouse to delivery, ensuring precision and maximizing resource utilization.",
      icon: <Truck size={32} />,
    },
    {
      title: "Identity Authentication",
      description: "Secure access control and personnel tracking solutions tailored for high-security environments.",
      icon: <UserCheck size={32} />,
    },
    {
      title: "Asset Tracking",
      description: "Critical equipment monitoring to reduce costs, prevent loss, and optimize operational performance.",
      icon: <Layers size={32} />,
    },
  ];

  const benefits = [
    {
      title: "Intelligent Automation",
      text: "We enable smart systems that operate with minimal human intervention, driving consistency.",
      icon: <Cpu className="text-brand-green" />,
    },
    {
      title: "Workflow Optimization",
      text: "By analyzing movement data, we refine processes to enhance overall operational efficiency.",
      icon: <Zap className="text-brand-green" />,
    },
    {
      title: "Cost Reduction",
      text: "Eliminate waste and redundant tasks, helping businesses achieve higher profitability.",
      icon: <BarChart className="text-brand-green" />,
    },
    {
      title: "Absolute Precision",
      text: "Our high-quality labels and inlays ensure 99.9% read accuracy in even the toughest environments.",
      icon: <ShieldCheck className="text-brand-green" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-brand-blue overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-block px-4 py-2 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-brand-orange font-bold text-sm uppercase tracking-widest mb-6">
              12+ Years of Expertise
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.0]">
              Aether RFID <br />
              <span className="text-brand-orange">Technologies</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-xl font-light">
              Pioneering intelligent automation through cutting-edge RFID tag development and manufacturing. We don't just track assets; we optimize your entire business ecosystem.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/products/rfid/hardware" className="bg-brand-orange text-white font-bold px-10 py-4 rounded-full hover:scale-105 transition-all ">
                Explore Products
              </Link>
              <Link href="/contact" className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-4 rounded-full hover:bg-white/20 transition-all">
                Contact Experts
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
             <div className="w-full aspect-square rounded-[60px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center p-12 overflow-hidden group">
                <div className="absolute inset-0 bg-brand-orange/5 group-hover:bg-brand-orange/10 transition-colors"></div>
                <div className="relative z-10 grid grid-cols-2 gap-6 w-full h-full">
                    {[
                      "/assets/technologies/passive-rfid.jpg",
                      "/assets/technologies/active-rfid.jpg",
                      "/assets/technologies/semi-passive-rfid.jpg",
                      "/assets/technologies/nfc-rfid.jpg"
                    ].map((img, i) => (
                        <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-3xl overflow-hidden group-hover:border-brand-orange/30 transition-all shadow-2xl">
                            <img src={img} alt="Technology" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Core Expertise Section */}
      <section className="py-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.2]">
                    Optimizing Workloads, <br />
                    <span className="text-brand-blue">Eliminating Bottlenecks.</span>
                </h2>
                <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
                    <p>
                        Aether RFID Technologies brings over <span className="font-bold text-brand-orange text-xl">12 years</span> of collective expertise in RFID tag development and manufacturing. We are committed to enabling intelligent automation by optimizing workflows, balancing workloads, and eliminating bottlenecks to enhance overall operational efficiency.
                    </p>
                    <p>
                        Our focus lies in delivering high-quality RFID labels, Inlays, Tags, and Hardware tailored for diverse applications. By maximizing resource utilization and ensuring precision in every solution, we help businesses achieve their goals with confidence.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                    <div key={i} className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all group">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                            {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{benefit.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Diverse Applications Section */}
      <section className="py-24 bg-brand-blue relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-24 bg-white clip-path-slant-bottom"></div>
        {/* <div className="absolute bottom-0 left-0 w-full h-24 bg-white rotate-180"></div> */}
        
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Tailored for Diverse Applications</h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg font-light">
                From logistics to healthcare, our RFID solutions are engineered to meet the unique demands of every industry.
            </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {applications.map((app, i) => (
                    <div key={i} className="group bg-white/10 backdrop-blur-lg border border-white/10 p-10 rounded-[40px] hover:bg-white hover:text-gray-900 transition-all duration-500 group">
                        <div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center mb-8 shadow-lg group-hover:rotate-12 transition-all">
                            {app.icon}
                        </div>
                        <h3 className="text-2xl text-white group-hover:text-brand-orange font-bold mb-4">{app.title}</h3>
                        <p className="text-blue-100/70 group-hover:text-gray-600 transition-colors leading-relaxed">
                            {app.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Hardware & Results Section */}
      <section className="py-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="bg-gray-900 rounded-[60px] p-8 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/20 blur-[100px]"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-[1.2]">
                        Achieving Higher <br />
                        <span className="text-brand-orange text-4xl md:text-5xl">Customer Satisfaction</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                        By maximizing resource utilization and ensuring precision in every solution, we help businesses improve performance, reduce costs, and deliver superior value to their end-users.
                    </p>
                    
                    <ul className="space-y-6">
                        {[
                            "High-Quality RFID Labels & Inlays",
                            "Specialized Tags & Hardware Solutions",
                            "Identity Authentication Systems",
                            "Real-time Data Visualisation"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-gray-200">
                                <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                                    <ShieldCheck size={14} className="text-white" />
                                </div>
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:w-1/2 w-full grid grid-cols-2 gap-5">
                    <div className="space-y-5">
                        <div className="bg-white/5 p-2 md:p-8 rounded-3xl border border-white/10 text-center">
                            <div className="text-4xl font-bold text-brand-orange mb-2">99.9%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Read Accuracy</div>
                        </div>
                        <div className="bg-white/5 p-2 md:p-8 rounded-3xl border border-white/10 text-center">
                            <div className="text-4xl font-bold text-brand-green mb-2">12Y+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Industry Experience</div>
                        </div>
                    </div>
                    <div className="space-y-5 mt-10">
                        <div className="bg-white/5 p-2 md:p-8 rounded-3xl border border-white/10 text-center">
                            <div className="text-4xl font-bold text-brand-blue mb-2">30%</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Cost Reduction</div>
                        </div>
                        <div className="bg-white/5 p-2 md:p-8 rounded-3xl border border-white/10 text-center">
                            <div className="text-4xl font-bold text-white mb-2">100+</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Global Clients</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      <style>{`
        .clip-path-slant-bottom {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
        }
      `}</style>
    </div>
  );
};

export default RFIDTechnology;
