"use client";
import { ArrowRight, BarChart3, Globe, Shield, Zap } from "lucide-react";
import Link from "next/link";

const CaseStudies = () => {
  const cases = [
    {
      id: 1,
      title: "Global Retail Inventory Optimization",
      client: "Fortune 500 Retailer",
      impact: "99.8% Inventory Accuracy",
      description: "Implementing a full-scale RFID solution across 500+ stores to enable real-time inventory visibility and omnichannel fulfillment.",
      image: "/assets/case-studies/global-retail-inventory.jpg",
      tags: ["Retail", "RFID", "Supply Chain"],
      stats: [
        { label: "Efficiency", value: "+40%" },
        { label: "Stockouts", value: "-80%" }
      ]
    },
    {
      id: 2,
      title: "Smart Warehouse Automation",
      client: "LogiCorp Systems",
      impact: "60% Faster Sorting",
      description: "Integrating IoT sensors and automated barcode scanning to streamline high-volume sorting operations in a regional distribution center.",
      image: "/assets/case-studies/smart-warehouse.jpg",
      tags: ["Logistics", "IoT", "Automation"],
      stats: [
        { label: "Throughput", value: "2x" },
        { label: "Errors", value: "-95%" }
      ]
    },
    {
      id: 3,
      title: "Healthcare Asset Tracking",
      client: "City General Hospital",
      impact: "Instant Equipment Location",
      description: "Deploying active RFID tags to track critical medical equipment, reducing search time for nurses and improving patient care response.",
      image: "/assets/case-studies/Healthcare-Tracking.jpg",
      tags: ["Healthcare", "Asset Tracking"],
      stats: [
        { label: "Search Time", value: "-90%" },
        { label: "ROI", value: "12 Months" }
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-brand-blue">
         <div className="absolute inset-0">
          <img 
            src="/assets/abstract-blue.jpg" 
            alt="Case Studies" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 via-transparent to-brand-blue/80"></div>
        </div>
        
        <div className="relative z-10 max-w-[1000px] mx-auto text-center px-5">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our Success Stories
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-[800px] mx-auto font-light leading-relaxed">
            Discover how Aether-RFID transforms businesses through innovative technology and strategic implementation.
          </p>
        </div>
      </section>

      {/* Featured Metric Grid */}
      <section className="py-16  relative z-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Globe />, label: "Global Deployments", value: "1200+" },
              { icon: <Zap />, label: "Efficiency Increase", value: "45%" },
              { icon: <Shield />, label: "Data Accuracy", value: "99.9%" },
              { icon: <BarChart3 />, label: "Client ROI", value: "Avg 14mo" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-xl shadow-brand-blue/5 border border-gray-100 text-center group hover:-translate-y-2 transition-all duration-500">
                <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="pb-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="space-y-24">
          {cases.map((item, index) => (
            <div key={item.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
              <div className="lg:w-1/2 group relative">
                <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden shadow-2xl">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                {/* Floating Badge */}
                <div className={`absolute ${index % 2 !== 0 ? '-left-8' : '-right-8'} -bottom-8 bg-brand-orange text-white p-8 rounded-[32px] shadow-xl hidden md:block`}>
                  <div className="text-sm font-bold uppercase tracking-widest mb-1 opacity-80">Impact</div>
                  <div className="text-xl font-bold">{item.impact}</div>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="flex flex-wrap gap-3 mb-8">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-5 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {item.title}
                </h2>
                
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  {item.stats.map((s, i) => (
                    <div key={i} className="border-l-4 border-brand-blue pl-6">
                      <div className="text-3xl font-bold text-brand-blue mb-1">{s.value}</div>
                      <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* <button className="flex items-center gap-3 text-brand-blue font-bold text-lg group/btn">
                  View Full Case Study <ArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-5 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Ready to achieve similar results?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Our team of experts is ready to help you design and implement a solution tailored to your specific business challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="bg-brand-blue text-white font-bold px-12 py-5 rounded-full hover:bg-brand-orange transition-all shadow-lg hover:shadow-brand-orange/20 text-lg">
              Start Your Project
            </Link>
            <Link href="/about/company-overview" className="bg-white border-2 border-brand-blue text-brand-blue font-bold px-12 py-5 rounded-full hover:bg-brand-blue hover:text-white transition-all text-lg">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
