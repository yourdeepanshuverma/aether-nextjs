"use client";
"use client";
"use client";
"use client";
import React from "react";
import { Tag, Radio, Antenna, Signal, Network, ArrowRight } from "lucide-react";

const ProductCatalog = () => {
  const products = [
    {
      title: "RFID Tags",
      description: "Produced in our state-of-the-art manufacturing facility, our diverse range includes soft tags, hard tags, and bespoke designs. These affordable, internationally compliant tags integrate effortlessly into existing systems, capitalizing on RFID’s role in retail and healthcare, where adoption is accelerating at a CAGR of over 15%.",
      icon: <Tag className="w-10 h-10 text-brand-green" />,
    },
    {
      title: "IOT Solutions",
      description: "Backed by a dedicated development team, we create customized sensor devices for data logging, GPS integration, GNSS positioning, and beyond—tapping into the IoT’s edge intelligence trends for smarter, more responsive systems.",
      icon: <Signal className="w-10 h-10 text-brand-green" />,
    },
    {
      title: "Software Solutions",
      description: "We craft bespoke software that addresses unique client needs, enabling seamless data management and integration in an IoT landscape poised for 13% annual device growth every year.",
      icon: <Network className="w-10 h-10 text-brand-green" />,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#fcfcfc] to-[#f4f7ff] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What We Offer
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-16 bg-brand-green/20"></div>
            <div className="w-3 h-3 rounded-full bg-brand-green"></div>
            <div className="h-[2px] w-16 bg-brand-green/20"></div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(50,89,158,0.15)] hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden text-center md:text-left flex flex-col items-center md:items-start"
            >
              {/* Card Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-5 p-5 mx-auto md:mx-0 bg-white shadow-inner w-fit rounded-2xl group-hover:bg-brand-green transition-all duration-500 group-hover:rotate-6">
                  {React.cloneElement(product.icon, { 
                    className: "w-10 h-10 text-brand-green group-hover:text-white transition-colors duration-500" 
                  })}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-5 group-hover:text-brand-green transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                  {product.description}
                </p>
                
                <a
                  href="#"
                  className="inline-flex items-center gap-3 font-bold text-brand-green group/link"
                >
                  <span className="relative overflow-hidden py-1">
                    Read More
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-green -translate-x-full group-hover/link:translate-x-0 transition-transform duration-300"></span>
                  </span>
                  <div className="p-2 rounded-full bg-brand-green/10 group-hover/link:bg-brand-green group-hover/link:text-white transition-all duration-300">
                    <ArrowRight size={18} />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
