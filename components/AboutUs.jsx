"use client";
"use client";
"use client";
"use client";
import { Target, Award, ShieldCheck, ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const AboutUs = () => {
  const { getContent } = useContent();
  const aboutContent = getContent("home-about", {
    title: "Driving Innovation Through Technology",
    subtitle: "About Aether",
    content: {
      description: "Aether is a global leader in providing end-to-end IoT, RFID, and digital transformation solutions. We help businesses navigate the complexities of the modern world with cutting-edge hardware and intelligent software.",
      missionTitle: "Our Mission",
      missionDesc: "To empower enterprises with real-time data and seamless connectivity.",
      visionTitle: "Our Vision",
      visionDesc: "To be the catalyst for a smarter, more connected global infrastructure.",
      buttonText: "Learn More About Us",
      imageUrl: "/assets/about-2.webp"
    }
  });

  // Extract content fields
  const description = aboutContent.description || "";
  const missionTitle = aboutContent.missionTitle || "Our Mission";
  const missionDesc = aboutContent.missionDesc || "To empower enterprises with real-time data and seamless connectivity.";
  const visionTitle = aboutContent.visionTitle || "Our Vision";
  const visionDesc = aboutContent.visionDesc || "To be the catalyst for a smarter, more connected global infrastructure.";
  const buttonText = aboutContent.buttonText || "Learn More About Us";
  const imageUrl = aboutContent.imageUrl || "/assets/about-2.webp";

  return (
    <section className="py-24 bg-white overflow-hidden" id="about">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Image with Decorative Elements */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src={imageUrl} 
                alt="Our Workspace" 
                className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto lg:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            
            {/* Background Shape */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-50 rounded-full -z-10 blur-3xl"></div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#259350] font-bold text-sm mb-2 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#259350]"></span>
              {aboutContent.subtitle}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {aboutContent.title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#259350]">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{missionTitle}</h4>
                  <p className="text-gray-500 text-sm">{missionDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#259350]">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{visionTitle}</h4>
                  <p className="text-gray-500 text-sm">{visionDesc}</p>
                </div>
              </div>
            </div>

            <button className="mt-12 flex items-center gap-3 bg-[#d76539] text-white px-10 py-5 rounded-2xl font-semibold hover:bg-[#000000] hover:shadow-2xl hover:shadow-[#d76539]/20 transition-all duration-300 group">
              {buttonText}
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

