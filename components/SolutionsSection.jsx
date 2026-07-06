"use client";
"use client";
"use client";
"use client";
import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Factory, 
  Globe, 
  IndianRupee, 
  Truck, 
  Headset, 
  Cpu,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const solutions = [
  {
    id: 1,
    name: "Customized Solutions",
    icon: <Settings size={32} />,
    description: "Understanding that no two organizations are alike, we deliver personalized products and services to precisely match your requirements, ensuring adaptability in fast-evolving markets like autonomous vehicles and precision agriculture.",
    image: "/assets/solutions/CustomizedSolutions.jpg"
  },
  {
    id: 2,
    name: "State-of-the-Art Facilities",
    icon: <Factory size={32} />,
    description: "Located in Delhi, our advanced production and R&D centers guarantee products that uphold the highest quality standards, from design to delivery.",
    image: "/assets/solutions/state-of-art.jpg"
  },
  {
    id: 3,
    name: "International Standards Compliance",
    icon: <Globe size={32} />,
    description: "All our offerings—RFID tags, labels, GPS/GNSS devices, and sensors—adhere to global benchmarks, ensuring compatibility, reliability, and seamless integration worldwide.",
    image: "/assets/solutions/InternationalStandardsCompliance.jpg"
  },
  {
    id: 4,
    name: "Affordability",
    icon: <IndianRupee size={32} />,
    description: "We prioritize value, offering premium solutions at competitive prices to maximize your ROI without compromising on innovation or performance.",
    image: "/assets/solutions/affordability.jpg"
  },
  {
    id: 5,
    name: "Timely Delivery",
    icon: <Truck size={32} />,
    description: "Our commitment to punctuality minimizes operational downtime, supporting your business continuity in an increasingly interconnected global economy.",
    image: "/assets/solutions/timely-deliver.jpg"
  },
  {
    id: 6,
    name: "Expert Support",
    icon: <Headset size={32} />,
    description: "Dedicated assistance and responsive service to ensure seamless operations, reduced downtime, and maximum business efficiency.",
    image: "/assets/solutions/support.jpg"
  },
  {
    id: 7,
    name: "Smart Integration",
    icon: <Cpu size={32} />,
    description: "Advanced RFID and IoT solutions that integrate effortlessly with modern technologies, Industry 4.0 systems, and smart business ecosystems.",
    image: "/assets/solutions/standard-quality.jpg"
  }
];

const SolutionsSection = () => {
  const [activeIndex, setActiveIndex] = useState(3); // Default to middle item
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % solutions.length);
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-brand-blue py-16 md:py-24 overflow-hidden relative min-h-[600px] md:min-h-[800px] flex flex-col items-center justify-start">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-55">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 uppercase tracking-wide">
            Why Choose us?
          </h2>
        </div>

        {/* Desktop View (Semi-circular layout) */}
        <div 
          className="hidden md:block relative w-full max-w-5xl mx-auto h-[500px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Path Circles (Decorative) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-dotted border-white/5 rounded-full"></div>

          {/* Central Content Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[360px] transition-all duration-500 transform scale-110">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="relative h-50 overflow-hidden">
                <img 
                  src={solutions[activeIndex].image} 
                  alt={solutions[activeIndex].name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <h3 className="text-white font-bold text-lg uppercase tracking-widest">
                    {solutions[activeIndex].name}
                  </h3>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {solutions[activeIndex].description}
                </p>
              </div>
            </div>
          </div>

          {/* Circular Items */}
          {solutions.map((item, index) => {
            // Calculate position on the arc
            const startAngle = 210;
            const endAngle = -30;
            const angle = startAngle + (index * (endAngle - startAngle) / (solutions.length - 1));
            const radian = (angle * Math.PI) / 180;
            const radius = 350; // Radius of the arc
            
            const x = Math.cos(radian) * radius;
            const y = -Math.sin(radian) * radius; 

            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                className="absolute top-1/2 left-1/2 transition-all duration-300"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div 
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 border-2 
                      ${isActive 
                        ? "bg-brand-green border-white scale-125 shadow-lg shadow-brand-green/50" 
                        : "bg-white/5 border-white/20 group-hover:bg-white/10 group-hover:scale-110"
                      }`}
                  >
                    <div className={isActive ? "text-white" : "text-gray-400 group-hover:text-white"}>
                      {item.icon}
                    </div>
                  </div>
                  <span className={`text-xs md:text-sm font-medium text-center max-w-[100px] transition-all duration-300 ${isActive ? 'text-white opacity-100' : 'text-gray-400 opacity-70 group-hover:opacity-100 group-hover:text-white'}`}>
                    {item.name}
                  </span>
                  
                  {/* Decorative line connecting to center */}
                  {isActive && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-brand-green/30 to-transparent transform"
                         style={{ transform: `rotate(${angle}deg)` }}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View (Swiper Carousel) */}
        <div className="md:hidden w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="pb-12"
          >
            {solutions.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 mx-4">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4">
                        <div className="bg-brand-green p-3 rounded-full text-white mb-2 shadow-lg">
                            {item.icon}
                        </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-white font-bold text-lg uppercase mb-3 tracking-wide">
                        {item.name}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex justify-center gap-4 mt-4">
             <button className="swiper-button-prev-custom w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-brand-green transition-colors">
                <ChevronLeft size={20} />
             </button>
             <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-brand-green transition-colors">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32  pointer-events-none"></div>
    </section>
  );
};

export default SolutionsSection;
