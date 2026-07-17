"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { Cpu, ShieldCheck, Download, ArrowRight } from "lucide-react";

const RFIDHardware = () => {
  const [search, setSearch] = useState("");
  const [showEnquiry, setShowEnquiry] = useState(false);
  const { products, productsLoading, loadProducts } = useContent();

  useEffect(() => {
    loadProducts();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    requirement: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          company: formData.company,
          message: `RFID Hardware Enquiry: ${formData.requirement}`
        })
      });
      if (!response.ok) throw new Error("Submission failed");
      alert("Thank you! Your enquiry has been submitted. We will contact you soon.");
      setShowEnquiry(false);
      setFormData({ name: "", mobile: "", email: "", company: "", requirement: "" });
    } catch (err) {
      alert("Failed to submit enquiry: " + err.message);
    }
  };

  // Filter products by hardware category
  const hardwareList = useMemo(() => {
    return products.filter(p => p.category === 'rfid-hardware');
  }, [products]);

  const filteredProducts = useMemo(() => {
    return hardwareList.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.specs?.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (product.specs?.application || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [hardwareList, search]);

  if (productsLoading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <section className="py-20 px-5 lg:px-10 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900">
                RFID Hardware Products
              </h2>
              <p className="text-slate-600 mt-4">
                Loading our cutting-edge RFID hardware inventory...
              </p>
            </div>
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm">
                  <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center">
                    <div className="w-full h-[260px] bg-slate-100 rounded-2xl"></div>
                    <div className="space-y-4">
                      <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                      </div>
                      <div className="h-10 bg-slate-200 rounded-full w-28 mt-4"></div>
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
    <div className="bg-slate-50 min-h-screen">
      {/* Products Section */}
      <section className="py-20 px-5 lg:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">
              RFID Hardware Products
            </h2>
            <p className="text-slate-600 mt-4">
              Explore our range of RFID tags, readers and tracking solutions.
            </p>
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>
          <div className="space-y-8">
            {filteredProducts.map((product, index) => {
              const labels = {
                description: "Description",
                frequency: "Frequency",
                polarisation: "Polarisation",
                operating_system: "Operating System",
                operating_temperature: "Operating Temperature",
                read_range: "Read Range",
                read_capacity: "Read Capacity",
                application: "Application",
                main_features: "Main Features",
                max_reciever_sensitivity: "Max Receiver Sensitivity",
                extension: "Extension",
                moq: "MOQ",
              };

              return (
                <div
                  key={product.id || index}
                  className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center">
                    {/* Product Image */}
                    <div className="flex justify-center">
                      <img
                        src={product.image || "/assets/placeholder-product.png"}
                        alt={product.name}
                        className="w-full max-w-[260px] h-[260px] object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-5">
                        {product.name}
                      </h3>

                      <div className="space-y-2">
                        {Object.entries(product.specs || {})
                          .map(([key, value]) => (
                            <p key={key} className="text-slate-700">
                              <span className="font-semibold">
                                {labels[key] ||
                                  key
                                    .replace(/_/g, " ")
                                    .replace(/\b\w/g, (char) =>
                                      char.toUpperCase(),
                                    )}
                                :
                              </span>{" "}
                              {value}
                            </p>
                          ))}
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={() => setShowEnquiry(true)}
                          className="px-8 py-3 bg-brand-green text-white rounded-full hover:opacity-90 transition-all"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400 font-medium">
                No RFID hardware products found matching your search.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Unique Glassmorphism Design */}
      <section className="pt-12 pb-24 px-5 lg:px-10">
        <div className="max-w-[1200px] mx-auto relative">
          <div className="absolute inset-0 bg-brand-blue rounded-[60px] transform -rotate-1 skew-y-1"></div>
          <div className="relative bg-[#0f172a] rounded-[60px] p-12 md:p-24 overflow-hidden shadow-2xl border border-white/10">
            {/* Abstract Background Design */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-orange/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-green/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Ready to Implement a <br />
                <span className="text-brand-orange">
                  Seamless Tracking Solution?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-12">
                Whether you're looking for specialized readers or a full-scale
                deployment, our team of experts is here to guide your hardware
                selection process.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-brand-orange text-white font-medium px-12 py-5 tracking-wide rounded-2xl hover:bg-brand-orange/90 hover:scale-105 transition-all shadow-lg shadow-brand-orange/20"
                >
                  Contact Us Now
                </Link>
                <a
                  href="/assets/RFID%20products/ReadersCatalogue.pptx"
                  download
                  className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white tracking-wide font-medium px-12 py-5 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <Download
                    size={20}
                    className="group-hover:translate-y-1 transition-transform"
                  />
                  Download Datasheets
                </a>
              </div>

              <p className="mt-8 text-sm text-gray-500 font-medium uppercase tracking-[0.2em]">
                PDF • Latest Revision • 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {showEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative">
            <button
              onClick={() => setShowEnquiry(false)}
              className="absolute right-5 top-4 text-3xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">
              Product Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green"
              />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green"
              />

              <textarea
                rows="4"
                name="requirement"
                placeholder="Requirement"
                value={formData.requirement}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-green"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-brand-green text-white py-3 rounded-xl hover:opacity-90 transition"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFIDHardware;
