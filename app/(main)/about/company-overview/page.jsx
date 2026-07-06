"use client";
import { Target, Award, Shield, Cpu, Users, Zap } from "lucide-react";

const CompanyOverview = () => {
  const values = [
    {
      icon: <Zap className="text-brand-orange" size={32} />,
      title: "Innovation First",
      desc: "We constantly push the boundaries of RFID and IoT technology to solve tomorrow's challenges today.",
    },
    {
      icon: <Shield className="text-brand-green" size={32} />,
      title: "Reliability",
      desc: "Our solutions are built to perform in the most demanding industrial environments with 99.9% accuracy.",
    },
    {
      icon: <Users className="text-brand-blue" size={32} />,
      title: "Customer Centric",
      desc: "We don't just sell products; we build long-term partnerships focused on your specific business goals.",
    },
    {
      icon: <Cpu className="text-brand-orange" size={32} />,
      title: "Tech Excellence",
      desc: "Leveraging state-of-the-art R&D to ensure our hardware and software are always at the cutting edge.",
    },
  ];

  return (
    <div className="bg-white">
      {/* 1. Modern Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/assets/abstract-blue.jpg"
            alt="Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80";
            }}
          />
        </div>
        <div className="relative z-10 text-center px-5">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Company Overview
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Learn more about our company, mission, and values.
          </p>
        </div>
      </section>
      {/* <section className="relative py-24 overflow-hidden bg-gray-50">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm mb-6 uppercase tracking-widest">
              Our Story
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-[1.1]">
              Redefining Efficiency with <span className="text-brand-blue">Smart Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Aether RFID Technologies is at the forefront of the digital revolution, 
              connecting the physical and digital worlds through seamless IoT integration.
            </p>
          </div>
        </div>
      </section> */}

      {/* 2. Mission & Vision Section (Split Layout) */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-12">
              <div className=" text-left">
                <p className="text-brand-green font-semibold tracking-wider uppercase mb-4">
                  Our Story
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Redefining Efficiency with{" "}
                  <span className="text-brand-orange">Smart Solutions</span>
                </h2>
                <p className="mt-6 text-gray-600 text-lg max-w-lg">
                  Aether RFID Technologies is at the forefront of the digital
                  revolution, connecting the physical and digital worlds through
                  seamless IoT integration.
                </p>
                <p className="mt-4 text-gray-600 text-lg max-w-lg">
                  With a strong commitment to innovation, reliability, and
                  operational excellence, we deliver intelligent RFID and
                  IoT-driven solutions tailored for modern industries. Our
                  expertise helps businesses streamline operations, enhance
                  visibility, and achieve smarter decision-making through
                  advanced technology integration.
                </p>
              </div>
              {/* <div className="group">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm mb-4 uppercase tracking-widest">
                  Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Redefining Efficiency   with Smart Solutions</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Aether RFID Technologies is at the forefront of the digital revolution, connecting the physical and digital worlds through seamless IoT integration.
                </p>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  With a strong commitment to innovation, reliability, and operational excellence, 
                  we deliver intelligent RFID and IoT-driven solutions tailored for modern industries. 
                  Our expertise helps businesses streamline operations, enhance visibility, and achieve 
                  smarter decision-making through advanced technology integration.
                </p>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-0">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#259350]">
                    <Target size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      Our Mission
                    </h4>
                    <p className="text-gray-500 text-sm">
                      To empower enterprises with real-time data and seamless
                      connectivity.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#259350]">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Our Vision</h4>
                    <p className="text-gray-500 text-sm">
                      To be the catalyst for a smarter, more connected global
                      infrastructure.
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="group">
                <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                  <Award size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become the global standard for asset management and supply chain automation, 
                  fostering a world where every item is connected, visible, and optimized.
                </p>
              </div> */}
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden">
                <img
                  src="/assets/company-overview.png"
                  alt="Innovation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-brand-green p-10 rounded-[2.5rem] text-white shadow-2xl hidden md:block">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-80 uppercase tracking-wider font-medium">
                  Precision Tracking
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-24 bg-gray-900 text-white rounded-[4rem] mx-4 lg:mx-10 mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <img
            src="/assets/abstract-blue.jpg"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The Aether Edge
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              Our core values are the foundation of everything we build, guiding
              our team to deliver excellence in every project.
            </p>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{val.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact Section */}
      <section className="py-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="bg-brand-blue rounded-[3rem] p-12 lg:p-24 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center text-center lg:text-left">
            <div className="lg:w-2/3 text-white">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                Ready to transform your business?
              </h2>
              <p className="text-xl text-blue-100 opacity-90 leading-relaxed mb-0">
                Join hundreds of industry leaders who trust Aether RFID for
                their digital transformation journey.
              </p>
            </div>
            <div className="lg:w-1/3 flex justify-center lg:justify-end">
              <button className="bg-white text-brand-blue px-12 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
                Get Started Today
              </button>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-white/10 rounded-full"></div>
        </div>
      </section>
    </div>
  );
};

export default CompanyOverview;
