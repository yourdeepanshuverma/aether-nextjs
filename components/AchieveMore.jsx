"use client";
"use client";
"use client";
"use client";
"use client";
import { useState, useEffect } from "react";
import { Rocket, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const AchieveMore = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    {
      icon: <Rocket className="w-8 h-8 text-brand-green" />,
      heading: "Strategic Planning",
      description: "A methodical approach to setting goals, making informed decisions, and driving business growth.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-green" />,
      heading: "Customize Solution",
      description: "Tailored strategies and tools, designed to perfectly address your unique business needs.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextCard = () => {
    setActiveCard((prev) => (prev === 0 ? 1 : 0));
  };

  const prevCard = () => {
    setActiveCard((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Side - Headings */}
        <div className="lg:w-1/2 text-left">
          <p className="text-brand-green font-semibold tracking-wider uppercase mb-4">
            Achieve More
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Take Your Business to <br className="hidden md:block" />
            Next Level
          </h2>
          <p className="mt-6 text-gray-600 text-lg max-w-lg">
            Empower your enterprise with cutting-edge RFID and IoT technologies. We provide the tools you need to streamline workflows and drive innovation.
          </p>
        </div>

        {/* Right Side - Carousel */}
        <div className="lg:w-1/2 w-full relative">
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-8 md:p-12 shadow-sm border border-gray-100 min-h-[300px] flex items-center">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`transition-all duration-700 absolute inset-0 p-8 md:p-12 flex flex-col justify-center ${
                  activeCard === index
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 " + (index > activeCard ? "translate-x-full" : "-translate-x-full")
                }`}
              >
                <div className="mb-6 inline-block p-4 bg-blue-50 rounded-xl">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {card.heading}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-6 justify-center md:justify-end ">
            <button
              onClick={prevCard}
              className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCard}
              className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AchieveMore;
