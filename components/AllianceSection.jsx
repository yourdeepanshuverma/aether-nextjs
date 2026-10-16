"use client";

import React from "react";
import { Award, Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useContent } from "@/context/ContentContext";
import { getSafeMediaUrl } from "@/utils/media";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const INITIAL_ALLIANCES = [
  { id: "all-1", name: "Avery Dennison", logo: "/assets/alliance/every-dennison.png", enabled: true },
  { id: "all-2", name: "Chainway", logo: "/assets/alliance/chainway.png", enabled: true },
  { id: "all-3", name: "TVSE", logo: "/assets/alliance/tvse.png", enabled: true },
];

const INITIAL_CERTIFICATIONS = [
  { id: "cert-1", name: "ISO 9001:2015", logo: "/assets/alliance/iso.png", enabled: true },
  { id: "cert-2", name: "CE Certified", logo: "/assets/alliance/ce.png", enabled: true },
  { id: "cert-3", name: "RoHS Compliant", logo: "/assets/alliance/rohs.png", enabled: true },
  { id: "cert-4", name: "Startup India", logo: "/assets/alliance/startup-india.png", enabled: true },
];

const AllianceSection = () => {
  const { getContent } = useContent();

  const allianceConfig = getContent("home-alliances", {
    title: "Alliances & Certifications",
    subtitle: "",
    content: {
      showAlliances: true,
      alliancesTitle: "Strategic Alliances",
      showCertifications: true,
      certificationsTitle: "Our Certification",
      alliances: INITIAL_ALLIANCES,
      certifications: INITIAL_CERTIFICATIONS,
    },
  });

  const showAlliances = allianceConfig.showAlliances !== false;
  const showCertifications = allianceConfig.showCertifications !== false;
  const alliancesTitle = allianceConfig.alliancesTitle || "Strategic Alliances";
  const certificationsTitle = allianceConfig.certificationsTitle || "Our Certification";

  const rawAlliances =
    Array.isArray(allianceConfig.alliances) && allianceConfig.alliances.length > 0
      ? allianceConfig.alliances
      : INITIAL_ALLIANCES;

  const rawCerts =
    Array.isArray(allianceConfig.certifications) && allianceConfig.certifications.length > 0
      ? allianceConfig.certifications
      : INITIAL_CERTIFICATIONS;

  // Filter only enabled items
  const activeAlliances = rawAlliances.filter((item) => item.enabled !== false);
  const activeCerts = rawCerts.filter((item) => item.enabled !== false);

  const hasAlliances = showAlliances && activeAlliances.length > 0;
  const hasCerts = showCertifications && activeCerts.length > 0;

  // If both columns are disabled or have zero items, do not render anything
  if (!hasAlliances && !hasCerts) {
    return null;
  }

  // Smooth carousel loop helper: duplicate items if fewer than 6 so Swiper loop never jumps
  const loopAlliances =
    activeAlliances.length > 0 && activeAlliances.length < 6
      ? [...activeAlliances, ...activeAlliances, ...activeAlliances]
      : activeAlliances;

  const loopCerts =
    activeCerts.length > 0 && activeCerts.length < 6
      ? [...activeCerts, ...activeCerts, ...activeCerts]
      : activeCerts;

  const isTwoColumn = hasAlliances && hasCerts;

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Column 1: Strategic Alliances */}
          {hasAlliances && (
            <div className={isTwoColumn ? "flex-1 min-w-0" : "w-full"}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-blue/10 rounded-xl text-brand-blue">
                    <Handshake size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {alliancesTitle.includes(" ") ? (
                        <>
                          {alliancesTitle.split(" ").slice(0, -1).join(" ")}{" "}
                          <span className="text-brand-blue">
                            {alliancesTitle.split(" ").slice(-1)[0]}
                          </span>
                        </>
                      ) : (
                        <span className="text-brand-blue">{alliancesTitle}</span>
                      )}
                    </h2>
                  </div>
                </div>

                {/* Carousel Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="alliance-prev w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm"
                    aria-label="Previous partner"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="alliance-next w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm"
                    aria-label="Next partner"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="relative group/nav">
                <Swiper
                  modules={[Autoplay, Navigation]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={loopAlliances.length > 2}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    prevEl: ".alliance-prev",
                    nextEl: ".alliance-next",
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    640: {
                      slidesPerView: isTwoColumn ? 2 : 3,
                    },
                    1024: {
                      slidesPerView: isTwoColumn ? 2 : 4,
                    },
                  }}
                  className="alliance-swiper !pb-2"
                >
                  {loopAlliances.map((partner, index) => (
                    <SwiperSlide key={`${partner.id || partner.name}-${index}`}>
                      <div className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <img
                          src={getSafeMediaUrl(partner.logo, "/assets/placeholder-product.png")}
                          alt={partner.name}
                          className="h-20 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = "/assets/placeholder-product.png";
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}

          {/* Vertical Divider for Large Screens if both columns are shown */}
          {isTwoColumn && (
            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          )}

          {/* Column 2: Certifications */}
          {hasCerts && (
            <div className={isTwoColumn ? "lg:w-1/3 min-w-0" : "w-full"}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-brand-green/10 rounded-xl text-brand-green">
                  <Award size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {certificationsTitle.includes(" ") ? (
                      <>
                        {certificationsTitle.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="text-brand-blue">
                          {certificationsTitle.split(" ").slice(-1)[0]}
                        </span>
                      </>
                    ) : (
                      <span className="text-brand-blue">{certificationsTitle}</span>
                    )}
                  </h2>
                </div>
              </div>

              {/* If 2-column, vertical slider. If full width, horizontal slider */}
              {isTwoColumn ? (
                <div className="h-40">
                  <Swiper
                    direction="vertical"
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
                    loop={loopCerts.length > 1}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    className="h-full"
                  >
                    {loopCerts.map((cert, index) => (
                      <SwiperSlide key={`${cert.id || cert.name}-${index}`}>
                        <div className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-full transition-all duration-300 hover:shadow-xl">
                          <img
                            src={getSafeMediaUrl(cert.logo, "/assets/placeholder-product.png")}
                            alt={cert.name}
                            className="h-20 max-w-[85%] object-contain"
                            onError={(e) => {
                              e.target.src = "/assets/placeholder-product.png";
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="relative">
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={loopCerts.length > 2}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      640: { slidesPerView: 3 },
                      1024: { slidesPerView: 4 },
                    }}
                    className="!pb-2"
                  >
                    {loopCerts.map((cert, index) => (
                      <SwiperSlide key={`${cert.id || cert.name}-${index}`}>
                        <div className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <img
                            src={getSafeMediaUrl(cert.logo, "/assets/placeholder-product.png")}
                            alt={cert.name}
                            className="h-20 max-w-[85%] object-contain"
                            onError={(e) => {
                              e.target.src = "/assets/placeholder-product.png";
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllianceSection;
