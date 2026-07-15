"use client";
"use client";
"use client";
"use client";
"use client";
import { Users, CheckCircle, TrendingUp, UserCheck } from "lucide-react";

const stats = [
  {
    label: "Happy Clients",
    value: "99%",
    icon: <UserCheck size={32} className="text-white" />,
  },
  {
    label: "Projects Complete",
    value: "150+",
    icon: <CheckCircle size={32} className="text-white" />,
  },
  {
    label: "Success Rate",
    value: "100%",
    icon: <TrendingUp size={32} className="text-white" />,
  },
  {
    label: "Team Members",
    value: "50+",
    icon: <Users size={32} className="text-white" />,
  },
];

const CounterSection = () => {
  return (
    <section className="py-20 bg-brand-blue relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-brand-blue rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-brand-blue rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-blue/50 transition-all duration-500 hover:bg-white/[0.08] text-center md:text-left flex flex-col items-center md:items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-blue flex items-center justify-center mb-6 shadow-lg shadow-brand-blue/20 group-hover:scale-110 transition-transform duration-500">
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-[#ffffff] mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
