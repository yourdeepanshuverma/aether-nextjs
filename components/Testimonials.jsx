"use client";
"use client";
"use client";
"use client";
"use client";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajeev Singh",
    role: "IT MANAGER, Appolo Health Care.",
    content: "Their asset tracking approach has been instrumental in streamlining our hospital operations. The strategic implementation, real-time visibility, and customized workflows significantly improved asset utilization, reduced downtime, and strengthened overall operational efficiency.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Nihar Patnayak",
    role: "COO, Aditya Birla Group.",
    content: "The expertise of their team transformed our operational efficiency, paving the way for improved profitability and performance using their warehouse management application. A highly recommended partner for business growth specially in system implementation.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Rajni Gupta",
    role: "Manager- Audits, HCL Group.",
    content: "They provided exceptional RFID & IoT based solutions and products in highly efficient way that made a crucial difference in our overall operation process of asset audit. Their insights and professionalism are second to none. highly recommendable for RFID solutions",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-brand-orange">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the leaders who have transformed their businesses with our technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-8 right-8 text-brand-blue/10 group-hover:text-brand-blue/20 transition-colors">
                <Quote size={60} />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-brand-green text-brand-green" />
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 italic">
                "{testimonial.content}"
              </p>

              <div className="mt-auto flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue/20"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;
