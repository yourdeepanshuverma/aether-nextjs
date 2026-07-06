"use client";
import { Briefcase, Zap, Shield, Users, ArrowRight, MapPin, Clock } from "lucide-react";

const Careers = () => {
  const benefits = [
    {
      icon: <Zap className="text-brand-orange" size={28} />,
      title: "Cutting Edge Tech",
      desc: "Work with the latest RFID and IoT hardware in our state-of-the-art R&D center."
    },
    {
      icon: <Users className="text-brand-blue" size={28} />,
      title: "Collaborative Culture",
      desc: "Join a team of visionaries who value your ideas and encourage cross-functional growth."
    },
    {
      icon: <Shield className="text-brand-green" size={28} />,
      title: "Stability & Growth",
      desc: "Competitive salary, comprehensive healthcare, and clear career progression paths."
    }
  ];

  const jobs = [
    {
      title: "Senior IoT Architect",
      department: "Engineering",
      location: "New Delhi",
      type: "Full-Time"
    },
    {
      title: "RFID Solutions Specialist",
      department: "Technical Sales",
      location: "Kolkata",
      type: "Full-Time"
    },
    {
      title: "Embedded Systems Engineer",
      department: "R&D",
      location: "New Delhi",
      type: "Full-Time"
    },
    {
      title: "Full Stack Developer (React/Node)",
      department: "Software",
      location: "Remote / Delhi",
      type: "Full-Time"
    }
  ];

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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Careers at Aether</h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Build the future of connected infrastructure with us. We're looking for passionate minds to join our mission.
          </p>
        </div>
      </section>

      {/* 2. Benefits Section */}
      <section className="py-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Why Join Us?</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Aether, we believe our people are our greatest asset. We provide an environment where you can innovate, grow, and make a real impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Open Positions Section */}
      <section className="py-24 bg-gray-50 rounded-t-[4rem] lg:rounded-t-[6rem]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm mb-4 uppercase tracking-widest">
                <Briefcase size={16} /> Open Roles
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Current Opportunities</h2>
            </div>
            <p className="text-gray-500 font-medium italic">
              Don't see a fit? Send your CV to <span className="text-brand-blue underline">hr@aetherrfid.com</span>
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white p-8 lg:p-10 rounded-[2rem] border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:border-brand-blue/30 transition-all group shadow-sm">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                      <Users size={14} className="text-brand-orange" /> {job.department}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-brand-green" /> {job.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-brand-blue" /> {job.type}
                    </span>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold group-hover:bg-brand-blue transition-all">
                  Apply Now
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact / Values Highlight */}
      <section className="py-24 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="relative rounded-[3rem] overflow-hidden bg-brand-blue p-12 lg:p-24 text-center text-white">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">Let's grow together.</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-0 leading-relaxed">
              We're not just building products; we're building a team that will shape the future of smart technology.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
