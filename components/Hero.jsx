"use client";
"use client";
"use client";
"use client";
import { useContent } from "@/context/ContentContext";

const Hero = () => {
  const { getContent } = useContent();
  const heroContent = getContent("home-hero", {
    title: "Aether-RFID\n Pioneering Innovation in RFID and IoT Solutions",
    subtitle: "At Aether-RFID, our mission is to deliver cost-effective, high-quality RFID and IoT solutions that solve modern business connectivity challenges through reliable services, innovation, and long-term partnerships.",
    content: {
      buttonText: "Explore our products",
      videoUrl: "/assets/aether-rfid-one.mp4"
    }
  });

  // Extract content fields
  const buttonText = heroContent.buttonText || "Explore our products";
  const videoUrl = heroContent.videoUrl || "/assets/aether-rfid-one.mp4";

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        key={videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto text-center px-5 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight whitespace-pre-line">
          {heroContent.title}
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-[750px]">
          {heroContent.subtitle}
        </p>

        <button className="bg-brand-orange border-2 border-brand-orange text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#ffffff] hover:text-brand-orange hover:scale-105 transition-all duration-300">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default Hero;

