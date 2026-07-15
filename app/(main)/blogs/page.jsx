"use client";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";

const Blogs = () => {
  const { blogs: dbBlogs, loading } = useContent();

  const fallbackBlogs = [
    {
      id: 1,
      title: "The Future of RFID in Retail Supply Chains",
      excerpt: "Discover how RFID technology is revolutionizing inventory management and enhancing customer experiences in the retail sector.",
      image: "/assets/blogs/close-up-scanning-box.jpg",
      date: "May 24, 2026",
      author: "Arjun Sharma",
      category: "Retail",
    },
    {
      id: 2,
      title: "IoT and Smart Manufacturing: A New Era",
      excerpt: "Explore the impact of IoT integration in factories and how it's driving efficiency and reducing operational costs.",
      image: "/assets/blogs/iot-smart-manufacturing.jpg",
      date: "May 20, 2026",
      author: "Priya Verma",
      category: "Manufacturing",
    },
    {
      id: 3,
      title: "Asset Tracking Solutions for Logistics",
      excerpt: "Learn about the latest advancements in asset tracking and how they are streamlining logistics operations globally.",
      image: "/assets/blogs/Asset-Tracking-Solutions-for-Logistics.jpg",
      date: "May 15, 2026",
      author: "Rahul Singh",
      category: "Logistics",
    },
    {
      id: 4,
      title: "RFID vs. Barcodes: Which is Right for You?",
      excerpt: "A comprehensive comparison between RFID and traditional barcodes to help you choose the best technology for your business.",
      image: "/assets/blogs/rfid-vs-barcode.jpg",
      date: "May 10, 2026",
      author: "Sneha Kapur",
      category: "Technology",
    },
    {
      id: 5,
      title: "Security Considerations in IoT Deployments",
      excerpt: "Essential security measures you need to implement to protect your IoT ecosystem from cyber threats.",
      image: "/assets/blogs/security-iot.jpg",
      date: "May 05, 2026",
      author: "Vikram Malhotra",
      category: "Security",
    },
    {
      id: 6,
      title: "Customized Software for RFID Integration",
      excerpt: "Why bespoke software solutions are crucial for maximizing the ROI of your RFID hardware investments.",
      image: "/assets/blogs/BespokeSolutions.jpg",
      date: "April 28, 2026",
      author: "Ananya Das",
      category: "Software",
    },
  ];

  const blogs = dbBlogs && dbBlogs.length > 0 ? dbBlogs : fallbackBlogs;
  const featuredBlog = blogs[0];

    if (loading) {
    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center bg-brand-blue overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/assets/abstract-blue.jpg" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-center px-5">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Latest Blogs</h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
              Stay updated with the latest trends in RFID, IoT, and digital transformation through our expert articles and case studies.
            </p>
          </div>
        </section>

        {/* Featured Blog Skeleton */}
        <section className="py-20 max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-gray-200"></div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="rounded-3xl bg-gray-50 border border-gray-100 flex flex-col lg:flex-row gap-0 lg:gap-10 p-4 lg:p-8 animate-pulse">
            <div className="lg:w-1/2 bg-gray-200 rounded-2xl h-[300px] lg:h-[450px]"></div>
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-5/6"></div>
              <div className="h-10 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Section Skeleton */}
        <section className="py-20 bg-gray-50/50">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
            <div className="flex justify-center mb-16">
              <div className="text-center space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded mx-auto animate-pulse"></div>
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col p-4 animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-2xl mb-6"></div>
                  <div className="space-y-4 flex-grow px-2 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="pt-6 border-t border-gray-100 flex justify-between items-center mt-6">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Latest Blogs</h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
            Stay updated with the latest trends in RFID, IoT, and digital transformation through our expert articles and case studies.
          </p>
        </div>
      </section>

      {/* Featured Blog Section */}
      {featuredBlog && (
        <section className="py-20 max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[2px] w-12 bg-brand-green"></div>
            <h2 className="text-3xl font-bold text-brand-green tracking-tight">Featured Story</h2>
          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 flex flex-col lg:flex-row gap-0 lg:gap-10 hover:shadow-2xl transition-all duration-500">
            <div className="lg:w-1/2 overflow-hidden h-[300px] lg:h-[450px]">
              <img 
                src={featuredBlog.image} 
                alt={featuredBlog.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-brand-blue/10 text-brand-blue rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Tag size={12} /> {featuredBlog.category}
                </span>
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <Calendar size={14} /> {featuredBlog.date}
                </span>
              </div>
              <Link href={`/blog/${featuredBlog._id || featuredBlog.id}`}>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 group-hover:text-brand-blue transition-colors leading-tight">
                  {featuredBlog.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {featuredBlog.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">
                    {featuredBlog.author ? featuredBlog.author.charAt(0) : "A"}
                  </div>
                  <span className="text-gray-700 font-semibold">{featuredBlog.author}</span>
                </div>
                <Link href={`/blog/${featuredBlog._id || featuredBlog.id}`} className="flex items-center gap-2 text-brand-blue font-bold hover:gap-4 transition-all group/btn">
                  Read Full Story <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex justify-center mb-16 gap-6">
            <div>
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="text-brand-blue font-bold uppercase tracking-widest text-sm">Our Articles</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Browse All Updates</h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[2px] w-20 bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                <div className="h-[2px] w-20 bg-gray-200"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {blogs.slice(1).map((blog) => (
              <div key={blog._id || blog.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-brand-blue rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-gray-400 text-xs font-medium">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                    <span className="flex items-center gap-1.5"><User size={12} /> {blog.author}</span>
                  </div>
                  
                  <Link href={`/blog/${blog._id || blog.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand-blue transition-colors leading-snug">
                      {blog.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <Link href={`/blog/${blog._id || blog.id}`} className="flex items-center gap-2 text-brand-blue font-bold text-sm hover:gap-3 transition-all">
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section - Modern Unique Design */}
      <section className="py-24 px-5">
        <div className="max-w-[1200px] mx-auto bg-brand-blue rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left max-w-lg">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Don't Miss Any <br className="hidden md:block"/> Future Updates
              </h2>
              <p className="text-blue-100/80 text-lg">
                Subscribe to our newsletter and get the latest industry news, technology trends, and company updates delivered to your inbox.
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <form className="relative group" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder:text-blue-100/50 px-8 py-5 rounded-full outline-none focus:bg-white/20 transition-all text-lg"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-white text-brand-blue font-bold px-8 rounded-full hover:bg-brand-orange hover:text-white transition-all shadow-xl">
                  Subscribe
                </button>
              </form>
              <p className="text-blue-200/50 text-xs mt-4 text-center lg:text-left px-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;

