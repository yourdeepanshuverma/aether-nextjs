"use client";
"use client";
"use client";
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const industries = [
  {
    title: "Expert Guidance",
    description: "Navigate your business challenges with the help of our seasoned consultants, skilled in diverse industry verticals.",
    image: "/assets/ExpertGuidance.jpg",
  },
  {
    title: "Innovative Strategies",
    description: "Capitalise on our forward-thinking approaches designed to keep your business ahead in the ever-evolving market.",
    image: "/assets/InnovativeStrategies.png",
  },
  {
    title: "Bespoke Solutions",
    description: "Benefit from our tailored strategies and tools, perfectly designed to meet your unique business needs.",
    image: "/assets/BespokeSolutions.avif",
  },
  {
    title: "Partnership Approach",
    description: "Enjoy the advantage of our partnership-driven ethos, focusing on your success as our primary goal.",
    image: "/assets/PartnershipApproach.avif",
  },
  {
    title: "Reliable Support",
    description: "Get dedicated assistance and timely service to ensure smooth business operations and maximum efficiency.",
    image: "/assets/ReliableSupport.avif",
  },
  {
    title: "Smart Technology Integration",
    description: "Leverage advanced RFID and IoT technologies that seamlessly connect with modern business ecosystems.",
    image: "/assets/SmartTechnologyIntegration.avif",
  }
];

const IndustriesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 768) setItemsToShow(2);
      else if (window.innerWidth < 1024) setItemsToShow(3);
      else setItemsToShow(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex >= industries.length - itemsToShow ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, itemsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= industries.length - itemsToShow ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? industries.length - itemsToShow : prev - 1));
  };

  return (
    <section className="bg-brand-blue py-20 md:py-28 flex flex-col items-center overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          What Makes Us Your Trusted Partner
        </h2>
        <p className="text-white mx-auto max-w-lg tracking-wider mb-4">Choose us to leverage expertise and innovation for your business’s transformative journey towards success.</p>
        <div className="flex items-center justify-center gap-4">
            <div className="h-[2px] w-20 bg-gray-200/30"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="h-[2px] w-20 bg-gray-200/30"></div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] px-6 relative">
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md hover:bg-gray-50 transition-colors hidden md:block"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md hover:bg-gray-50 transition-colors hidden md:block"
        >
          <ChevronRight size={24} className="text-gray-600" />
        </button>

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {industries.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-3 transition-all duration-500"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="group relative h-[400px] overflow-hidden bg-gray-200 cursor-pointer">
                  {/* Default Grayscale Image */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110"
                  />
                  
                  {/* Default Title Label (at bottom) */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white py-4 px-4 shadow-lg transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-10">
                    <h3 className="text-[#1a1a1a] font-bold text-center text-lg">{item.title}</h3>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    {/* The Theme Box Overlay */}
                    <div className="absolute inset-4 bg-brand-blue/90 flex flex-col items-center justify-center p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="text-white font-bold text-2xl mb-4">{item.title}</h3>
                      <p className="text-white text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
