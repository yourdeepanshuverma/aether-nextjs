"use client";
"use client";
"use client";
"use client";
import React from "react";
import { Award, ShieldCheck, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const AllianceSection = () => {
  const alliances = [
    { name: "Avery Dennison", logo: "/assets/alliance/every-dennison.png" },
    { name: "Chainway", logo: "/assets/alliance/chainway.png" },
    { name: "TVSE", logo: "/assets/alliance/tvse.png" },
    // Repeat for smooth carousel loop
    { name: "Avery Dennison", logo: "/assets/alliance/every-dennison.png" },
    { name: "Chainway", logo: "/assets/alliance/chainway.png" },
    { name: "TVSE", logo: "/assets/alliance/tvse.png" },
  ];

  const certifications = [
    { name: "ISO 9001:2015", logo: "/assets/alliance/iso.png" },
    { name: "ISO 9001:2015", logo: "/assets/alliance/ce.png" },
    { name: "ISO 9001:2015", logo: "/assets/alliance/rohs.png" },
    { name: "Startup India", logo: "/assets/alliance/startup-india.png" },
    { name: "ISO 9001:2015", logo: "/assets/alliance/rohs.png" },
    { name: "Startup India", logo: "/assets/alliance/startup-india.png" },
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Alliances Column */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue">
                <Handshake size={24} />
              </div>
              <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Strategic <span className="text-brand-blue">Alliances</span>
              </h2>
              {/* <h4 className="text-lg font-bold text-gray-800">
                Industry Leading Alliances
              </h4> */}
            </div>
            </div>
            
            <div className="relative group/nav">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: '.alliance-prev',
                  nextEl: '.alliance-next',
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  640: {
                    slidesPerView: 2,
                  },
                }}
                className="alliance-swiper !pb-4"
              >
                {alliances.map((partner, index) => (
                  <SwiperSlide key={index}>
                    <div className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-42 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="h-24 w-auto object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

            
            </div>
          </div>

          {/* Vertical Divider for Large Screens */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

          {/* Certifications Column */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-brand-green/10 rounded-lg text-brand-blue">
                <Award size={24} />
              </div> 
              <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Our <span className="text-brand-blue">Certification</span>
              </h2>
              {/* <h4 className="text-lg font-bold text-gray-800">
                ISO 9001:2015
              </h4> */}
              </div>
            </div>

            <div className="h-42">
              <Swiper
                direction="vertical"
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="h-full"
              >
                {certifications.map((cert, index) => (
                  <SwiperSlide key={index}>
                    <div className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-full transition-all duration-300 hover:shadow-xl">
                      <img 
                        src={cert.logo} 
                        alt={cert.name}
                        className="h-24 w-auto object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AllianceSection;
