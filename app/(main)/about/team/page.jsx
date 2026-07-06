"use client";
import { Link as LinkIcon, Mail } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const Team = () => {
  const { team: dbTeam } = useContent();

  const fallbackTeam = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      bio: "Visionary leader with 15+ years in RFID innovation.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sneha Sharma",
      role: "CTO",
      bio: "IoT architect obsessed with scalable hardware solutions.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Amit Patel",
      role: "Head of Operations",
      bio: "Ensuring seamless delivery across global supply chains.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Priya Singh",
      role: "Lead Software Engineer",
      bio: "Crafting intelligent dashboards for real-time tracking.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Vikram Mehta",
      role: "R&D Specialist",
      bio: "Breaking boundaries in tag durability and range.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Ananya Das",
      role: "Client Success Manager",
      bio: "Building lasting partnerships with industry leaders.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400",
    }
  ];

  const teamMembers = dbTeam && dbTeam.length > 0 ? dbTeam : fallbackTeam;

  return (
    <div className="bg-white">
      {/* 1. Hero Section (Standardized) */}
      <section className="relative h-[400px] flex items-center justify-center bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/assets/abstract-blue.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80"; }}
          />
        </div>
        <div className="relative z-10 text-center px-5">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Team</h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            A diverse collective of engineers, designers, and strategists united by a single goal: making the invisible, visible.
          </p>
        </div>
      </section>

      {/* 2. Modern Team Grid */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Meet Our Experts</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[2px] w-20 bg-gray-200"></div>
              <div className="w-3 h-3 rounded-full bg-brand-green"></div>
              <div className="h-[2px] w-20 bg-gray-200"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group relative">
                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-xl transition-all duration-500 group-hover:-translate-y-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-8 left-8 right-8 flex justify-center gap-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-blue transition-colors">
                        <LinkIcon size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-orange transition-colors">
                        <LinkIcon size={18} />
                      </a>
                      <a href={`mailto:${member.name.toLowerCase().replace(" ", "")}@aetherrfid.com`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-green transition-colors">
                        <Mail size={18} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-brand-blue font-bold uppercase tracking-wider text-sm mb-4">{member.role}</p>
                  <p className="text-gray-500 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;

