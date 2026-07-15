"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, User, Tag, ArrowLeft, Share2, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { useContent } from "@/context/ContentContext";

const Facebook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-1 2.17-2.41 3.06c1.35.13 2.58-.36 2.58-.36a9.23 9.23 0 0 1-2.45 2.54c0 5.17-3.9 11-11 11-3.23 0-6.19-1.09-8.41-2.95a12.55 12.55 0 0 0 1.57.09c2.63 0 5.1-.9 7-2.41a4.13 4.13 0 0 1-3.86-2.85c.35.05.7.08 1.07.08.51 0 .98-.07 1.44-.2a4.12 4.12 0 0 1-3.3-4.05v-.05c.75.42 1.61.67 2.53.7a4.13 4.13 0 0 1-1.28-5.51 11.72 11.72 0 0 0 8.51 4.31 4.13 4.13 0 0 1 7.03-3.76 8.27 8.27 0 0 0 2.62-1c-.13.38-.63.74-1 1a8.27 8.27 0 0 0 2.37-.65z"/>
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs: dbBlogs, loading } = useContent();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const fallbackBlogs = [
    {
      id: 1,
      title: "The Future of RFID in Retail Supply Chains",
      content: `
        <p>RFID technology has moved far beyond a simple replacement for barcodes. In today's hyper-connected retail environment, it serves as the backbone of a truly omnichannel strategy. By providing real-time visibility into inventory levels, retailers can now promise—and deliver—absolute accuracy to their customers.</p>
        <h3>The Shift Toward Real-Time Intelligence</h3>
        <p>Gone are the days when inventory counts were performed once a quarter or once a year. Modern RFID solutions allow for continuous cycle counting. This means a retail store knows exactly what is on the shelf, in the backroom, and in transit at all times. This level of precision reduces out-of-stock situations by up to 80%.</p>
        <blockquote>
          "RFID is no longer just about tracking; it's about the data-driven insights that allow businesses to respond to consumer behavior instantly."
        </blockquote>
        <h3>Enhancing Customer Experience</h3>
        <p>Beyond the warehouse, RFID is transforming the shopping floor. Smart fitting rooms can suggest complementary items to customers based on what they've brought in to try on. Contactless checkout systems are becoming faster and more reliable, reducing wait times and improving overall satisfaction.</p>
        <p>As we look toward the next decade, the integration of RFID with AI and machine learning will further optimize supply chains, making them more resilient to global disruptions.</p>
      `,
      image: "/assets/blogs/close-up-scanning-box.jpg",
      date: "May 24, 2026",
      author: "Arjun Sharma",
      category: "Retail",
      tags: ["RFID", "Retail Tech", "Supply Chain", "Innovation"]
    },
    {
      id: 2,
      title: "IoT and Smart Manufacturing: A New Era",
      image: "/assets/blogs/iot-smart-manufacturing.jpg",
      date: "May 20, 2026",
      author: "Priya Verma",
      category: "Manufacturing",
      content: "<p>Smart manufacturing, driven by the Internet of Things (IoT), is redefining the industrial landscape. By embedding sensors, actuators, and smart controllers into factory machines, manufacturers can gather real-time telemetry on operations.</p>"
    },
    {
      id: 3,
      title: "Asset Tracking Solutions for Logistics",
      image: "/assets/blogs/Asset-Tracking-Solutions-for-Logistics.jpg",
      date: "May 15, 2026",
      author: "Rahul Singh",
      category: "Logistics",
      content: "<p>Logistics companies are facing unprecedented demands for speed, transparency, and reliability. Real-time asset tracking using GPS, cellular, and LoRaWAN connectivity is providing the solution.</p>"
    }
  ];

  const blogs = dbBlogs && dbBlogs.length > 0 ? dbBlogs : fallbackBlogs;
  
  // Find blog by DB ObjectId or mock numerical ID
  const blog = blogs.find(b => b._id === id || String(b.id) === id) || blogs[0];
  const relatedPosts = blogs.filter(b => (b._id || b.id) !== (blog._id || blog.id)).slice(0, 3);

  if (!blog) {
    return <div className="text-center py-20">Loading blog post...</div>;
  }

    if (loading) {
    return (
      <div className="bg-white min-h-screen animate-pulse">
        {/* Blog Hero Header Skeleton */}
        <section className="relative h-[50vh] min-h-[400px] w-full flex items-end bg-gray-200">
          <div className="relative z-10 max-w-[1000px] mx-auto px-5 pb-16 w-full space-y-4">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="flex items-center gap-4">
              <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-5/6"></div>
          </div>
        </section>

        {/* Content Section Skeleton */}
        <section className="py-20 max-w-[1400px] mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-2/3 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5"></div>
              <div className="h-24 bg-gray-100 border-l-4 border-gray-200 rounded-r w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-11/12"></div>
            </div>
            <div className="lg:w-1/3 space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                  <div className="space-y-3 flex-grow">
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
      {/* Blog Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-end">
        <div className="absolute inset-0">
          <img 
            src={blog.image}
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[1000px] mx-auto px-5 pb-16 w-full text-white">
          <Link href="/blogs" className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> Back to Blogs
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 bg-brand-orange text-white rounded-full text-xs font-bold uppercase tracking-widest">
              {blog.category}
            </span>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Calendar size={16} /> {blog.date}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <User size={16} /> {blog.author}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-20 max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content */}
          <article className="lg:w-2/3">
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-6
                prose-h3:text-2xl prose-p:mb-8 prose-blockquote:border-l-4 
                prose-blockquote:border-brand-blue prose-blockquote:pl-6 
                prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-gray-900"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            
            {/* Tags & Share */}
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex flex-wrap gap-3">
                {(blog.tags || ["Aether", "RFID", "IoT", blog.category]).map(tag => (
                  <span key={tag} className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-bold flex items-center gap-2">
                  <Share2 size={18} /> Share:
                </span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                    <Facebook size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-400 hover:text-white transition-all">
                    <Twitter size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all">
                    <Linkedin size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Author Bio Box */}
            {blog.author && (
              <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 rounded-full bg-brand-blue text-white flex items-center justify-center text-4xl font-bold shrink-0">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Written by {blog.author}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {blog.author} is a senior technology consultant at Aether-RFID with extensive experience in enterprise IoT implementations, RFID logistics architectures, and digital systems integration.
                  </p>
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-12">
              
              {/* Related Posts */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-brand-blue w-fit">Related Posts</h3>
                <div className="space-y-8">
                  {relatedPosts.map(post => (
                    <Link key={post._id || post.id} href={`/blog/${post._id || post.id}`} className="flex gap-4 group">
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-brand-blue uppercase mb-1 block">{post.category}</span>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-blue transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h4>
                        <span className="text-xs text-gray-400 mt-2 block">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-brand-blue rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-xl font-bold mb-4 relative z-10">Subscribe to our Newsletter</h3>
                <p className="text-blue-100 text-sm mb-6 relative z-10">Get the latest insights delivered straight to your inbox.</p>
                <form className="space-y-3 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Your Email" className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:bg-white/30 transition-all" />
                  <button className="w-full bg-brand-orange text-white font-bold py-3 rounded-xl hover:bg-white hover:text-brand-blue transition-all">Subscribe Now</button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-5 text-center">
          <MessageSquare size={48} className="mx-auto text-brand-blue mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Have questions about our solutions?</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Our experts are here to help you navigate the complexities of RFID and IoT integration for your business.
          </p>
          <Link href="/contact" className="inline-block bg-brand-blue text-white font-bold px-10 py-4 rounded-full hover:bg-brand-orange transition-all shadow-lg hover:shadow-brand-orange/20">
            Speak to an Expert
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;

