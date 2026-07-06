"use client";
import Link from "next/link";
import { Activity, Cpu, Cloud, Database, Network, Shield, Smartphone, Zap, BarChart3, FastForward, Globe } from "lucide-react";

const IoTTechnology = () => {
  const industries = [
    {
      name: "Telecom",
      desc: "Revolutionizing network management and device connectivity through smart gateway solutions.",
      icon: <Network size={48} className="text-brand-orange" />,
    },
    {
      name: "Food Supply Chain",
      desc: "Real-time temperature monitoring and freshness tracking from farm to consumer table.",
      icon: <Database size={48} className="text-brand-orange" />,
    },
    {
      name: "PSUs & Infrastructure",
      desc: "Smart city initiatives and critical infrastructure monitoring for enhanced public safety and efficiency.",
      icon: <Globe size={48} className="text-brand-orange" />,
    },
  ];

  const features = [
    {
      title: "Real-time Traceability",
      desc: "Continuous visibility across systems, allowing for immediate response to environmental changes.",
      icon: <Activity />,
    },
    {
      title: "Predictive Analytics",
      desc: "Leveraging historical data to forecast trends and prevent system failures before they occur.",
      icon: <BarChart3 />,
    },
    {
      title: "Industry 4.0 Integration",
      desc: "Streamlining complex manufacturing cycles to achieve near zero-defect operations.",
      icon: <FastForward />,
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="bg-[#0a0a0a] relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]"></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          {/* Connection Lines Placeholder (CSS based) */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
            {[...Array(5)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute bg-white/10" 
                    style={{
                        height: '1px',
                        width: '100%',
                        top: `${20 * i}%`,
                        transform: `rotate(${i * 5}deg)`,
                        boxShadow: '0 0 10px rgba(255,255,255,0.2)'
                    }}
                ></div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-12 bg-brand-orange"></div>
                <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm">Empowering Connected Growth</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.0]">
              The Internet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">of Things (IoT)</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl font-light">
              Transforming the world by seamlessly connecting devices, systems, and experiences—from smart gadgets to fully automated industrial environments.
            </p>
            
            <div className="flex flex-wrap gap-6">
                <Link href="/contact" className="bg-brand-blue border-2 border-brand-blue text-white font-semibold tracking-wide px-12 py-5 rounded-full hover:bg-transparent hover:text-white transition-all duration-300 shadow-2xl shadow-brand-blue/20">
                    Discover Solutions
                </Link>
                {/* <div className="flex items-center gap-4 text-gray-300 font-semibold border px-12 rounded-full border-white/20 hover:border-brand-orange transition-colors group cursor-pointer">
                    <span className="w-12 h-12  flex items-center justify-center group-hover:border-brand-orange transition-colors">
                        <Zap size={20} className="group-hover:text-brand-orange transition-colors" />
                    </span>
                    See how it works
                </div> */}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
               {/* Decorative Glow */}
               <div className="absolute inset-0 bg-brand-blue/20 blur-[100px] rounded-full"></div>
               
               {/* Main Image Container */}
               <div className="relative p-14 z-10 w-full h-full rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="/assets/technologies/iot-tech.png" 
                    alt="IoT Concept" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent"></div>
               </div>

               {/* Floating Element */}
               {/* <div className="absolute -top-10 -left-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl animate-bounce-slow">
                  <Cpu size={48} className="text-brand-orange" />
               </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Core Capability Section */}
      <section className="py-18 relative z-10 bg-white text-gray-900 rounded-[60px] md:rounded-[100px]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-tight leading-tight">
                Harnessing the Power of <br />
                <span className="text-brand-orange">Real-time Intelligence</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-12 font-light">
                Businesses are rapidly adopting IoT to enhance efficiency, enable real-time traceability, and leverage predictive analytics for smarter decision-making. Our solutions empower companies to move from reactive to proactive operations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                    <div key={i} className="flex gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center shrink-0 text-brand-green">
                            {feature.icon}
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                            <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                    </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
                <div className="aspect-square bg-brand-blue rounded-[50px] overflow-hidden shadow-2xl relative group">
                    <img 
                      src="/assets/SmartTechnologyIntegration.avif" 
                      alt="IoT Integration" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent"></div>
                </div>
                {/* Floating Stats */}
                <div className="absolute -bottom-10 -left-10 bg-brand-green text-white p-10 rounded-[40px] shadow-2xl border border-white/5 hidden md:block">
                    <div className="text-5xl font-bold text-black mb-2">Zero</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-white">Defect Focus</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry 4.0 / Manufacturing Focus */}
      <section className="bg-brand-blue py-18">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <div className="text-center mb-24">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Driving the Evolution of Industry 4.0</h2>
                <p className="text-gray-100 max-w-2xl mx-auto text-lg">
                    In manufacturing, IIoT is streamlining complex supply chains, boosting productivity, and enabling precision-driven growth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {industries.map((ind, i) => (
                    <div key={i} className="p-12 bg-white/5 border border-white/10 rounded-[50px] hover:bg-white/10 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="mb-8">{ind.icon}</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">{ind.name}</h3>
                        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{ind.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Development Team CTA */}
      <section className="py-16 mt-20 bg-brand-green rounded-[60px] md:rounded-[100px] mx-5 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-[1200px] mx-auto px-5 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] mb-8 leading-tight tracking-tight">
                Backed by a Dedicated <br />
                <span className="text-white">IoT Development Team</span>
            </h2>
            <p className="text-[#0a0a0a] text-xl max-w-3xl mb-12 opacity-80 leading-relaxed">
                We proudly deliver innovative solutions that empower businesses to achieve smarter, connected growth. Our team bridges the gap between hardware and intelligence.
            </p>
            <Link href="/contact" className="bg-[#0a0a0a] text-white font-bold px-12 py-5 rounded-full hover:scale-105 transition-all shadow-2xl">
                Consult with our Team
            </Link>
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

export default IoTTechnology;
