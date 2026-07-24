"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";
import { Cpu, ShieldCheck, Download, ArrowRight, Filter, SlidersHorizontal, RefreshCw } from "lucide-react";

const RFIDHardware = () => {
  const [search, setSearch] = useState("");
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [selectedType, setSelectedType] = useState("all"); 
  const [selectedRange, setSelectedRange] = useState("all"); 
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { products, productsLoading, loadProducts } = useContent();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    requirement: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

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
          message: `Product Enquiry for: ${enquiryProduct?.name || 'RFID Hardware'} (Category: RFID Hardware)\n\nRequirement details:\n${formData.requirement}`
        })
      });
      if (!response.ok) throw new Error("Submission failed");
      alert("Thank you! Your enquiry has been submitted. We will contact you soon.");
      setEnquiryProduct(null);
      setFormData({ name: "", mobile: "", email: "", company: "", requirement: "" });
    } catch (err) {
      alert("Failed to submit enquiry: " + err.message);
    }
  };

  // Helper to categorize hardware dynamically
  const getHardwareType = (product) => {
    if (product.specs?.type) return product.specs.type;
    const name = product.name.toLowerCase();
    const desc = (product.specs?.description || '').toLowerCase();
    
    if (name.includes('antenna') || desc.includes('antenna')) return 'Antenna';
    if (name.includes('fixed') || desc.includes('fixed') || name.includes('ura4') || name.includes('u300') || name.includes('r3') || name.includes('fx9600')) return 'Fixed Reader';
    return 'Handheld Reader';
  };

  // Helper to check range
  const getRangeType = (product) => {
    const range = (product.specs?.read_range || '').toLowerCase();
    if (!range) return 'short';
    const match = range.match(/\d+/);
    if (match) {
      const meters = parseInt(match[0], 10);
      return meters >= 8 ? 'long' : 'short';
    }
    return 'short';
  };

  // Filter products by hardware category
  const hardwareList = useMemo(() => {
    return products.filter(p => p.category === 'rfid-hardware');
  }, [products]);

  // Extract unique subcategory types dynamically from active hardware products
  const hardwareTypes = useMemo(() => {
    const types = new Set();
    hardwareList.forEach(p => {
      const t = getHardwareType(p);
      if (t) types.add(t);
    });
    return Array.from(types).sort();
  }, [hardwareList]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return hardwareList.filter((product) => {
      // 1. Search Query filter
      const matchesSearch = 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.specs?.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (product.specs?.application || "").toLowerCase().includes(search.toLowerCase());

      // 2. Hardware Type filter
      const matchesType = selectedType === "all" || getHardwareType(product) === selectedType;

      // 3. Read Range filter
      const matchesRange = selectedRange === "all" || getRangeType(product) === selectedRange;

      return matchesSearch && matchesType && matchesRange;
    });
  }, [hardwareList, search, selectedType, selectedRange]);

  const resetFilters = () => {
    setSearch("");
    setSelectedType("all");
    setSelectedRange("all");
  };

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
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 px-5 border-b border-white/5">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-brand-orange uppercase text-xs tracking-[0.25em] font-extrabold mb-3 inline-block">Hardware Catalog</span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">RFID Hardware Products</h1>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Premium RFID handheld readers, long-range fixed readers, and specialized high-gain antennas.
          </p>
        </div>
      </section>

      {/* Catalog Container */}
      <section className="py-12 px-5 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Mobile Filter Toggle Button */}
          <div className="flex md:hidden items-center justify-between gap-4 mb-6">
            <button 
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-blue text-white py-3 px-4 rounded-xl text-sm font-bold shadow-sm"
            >
              <Filter size={16} />
              {mobileFiltersOpen ? "Hide Filters" : "Show Filters & Search"}
            </button>
            {(selectedType !== 'all' || selectedRange !== 'all' || search) && (
              <button 
                onClick={resetFilters}
                className="bg-gray-200 text-gray-700 p-3 rounded-xl hover:bg-gray-300 transition-colors"
                title="Reset Filters"
              >
                <RefreshCw size={16} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
            
            {/* 1. FILTER SIDEBAR */}
            <aside className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-8 md:sticky md:top-24 md:max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar`}>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-brand-orange" /> Filters
                </span>
                {(selectedType !== 'all' || selectedRange !== 'all' || search) && (
                  <button 
                    onClick={resetFilters}
                    className="text-[10px] font-bold text-red-600 hover:text-red-800 underline transition-all"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search input in sidebar */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Search Keywords</label>
                <input
                  type="text"
                  placeholder="e.g. C72, Zebra..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                />
              </div>

              {/* Hardware Type Filter (Dynamic) */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-500 uppercase">Product Type</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedType("all")}
                    className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      selectedType === "all"
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Hardware</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                      selectedType === "all"
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {hardwareList.length}
                    </span>
                  </button>

                  {hardwareTypes.map((type) => {
                    const count = hardwareList.filter(p => getHardwareType(p) === type).length;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          selectedType === type
                            ? 'bg-brand-blue text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{type}s</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                          selectedType === type
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Read Range Filter */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Read Range</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedRange("all")}
                    className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      selectedRange === "all"
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Ranges</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                      selectedRange === "all"
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {hardwareList.length}
                    </span>
                  </button>

                  {[
                    { key: 'short', label: 'Short/Mid (< 8m)' },
                    { key: 'long', label: 'Long Range (8m+)' }
                  ].map((item) => {
                    const count = hardwareList.filter(p => getRangeType(p) === item.key).length;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setSelectedRange(item.key)}
                        className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                          selectedRange === item.key
                            ? 'bg-brand-blue text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                          selectedRange === item.key
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* 2. PRODUCTS GRID LIST */}
            <main className="space-y-6">
              
              {/* Filter Results header */}
              <div className="flex justify-between items-center bg-white border border-slate-200/60 p-4 px-6 rounded-2xl shadow-sm text-xs font-semibold text-slate-500">
                <span>Showing {filteredProducts.length} hardware products</span>
                {(selectedType !== 'all' || selectedRange !== 'all' || search) && (
                  <span className="text-[10px] text-brand-orange uppercase font-bold bg-brand-orange/5 px-3 py-1 rounded-full">
                    Filters Active
                  </span>
                )}
              </div>

              {/* Cards list */}
              <div className="space-y-6">
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
                      className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                    >
                      <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-center">
                        
                        {/* Product Image */}
                        <div className="flex justify-center bg-slate-50/50 rounded-2xl p-4 h-[260px] items-center border border-slate-100">
                          <img
                            src={product.image || "/assets/placeholder-product.png"}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* Product Details */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-[10px] font-extrabold bg-brand-blue/15 text-brand-blue uppercase px-3 py-1 rounded-full tracking-wider">
                              {getHardwareType(product)}
                            </span>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                              {product.specs?.read_range ? `Range: ${product.specs.read_range}` : 'UHF Spec'}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-5 tracking-tight">
                            {product.name}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            {Object.entries(product.specs || {})
                              .filter(([key]) => key !== "type")
                              .map(([key, value]) => (
                                <p key={key} className="text-slate-700">
                                  <span className="font-semibold text-slate-950">
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

                          <div className="mt-6 pt-6 border-t border-slate-100">
                            <button
                              onClick={() => setEnquiryProduct(product)}
                              className="px-8 py-3 bg-brand-green text-white font-bold rounded-full hover:opacity-90 transition-all text-xs"
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
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 text-slate-400 font-medium">
                    No RFID hardware products found matching your active filters.
                  </div>
                )}
              </div>
            </main>
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
                {/* <a
                  href="/assets/RFID%20products/ReadersCatalogue.pptx"
                  download
                  className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white tracking-wide font-medium px-12 py-5 rounded-2xl hover:bg-white/10 transition-all"
                >
                  <Download
                    size={20}
                    className="group-hover:translate-y-1 transition-transform"
                  />
                  Download Datasheets
                </a> */}
              </div>

              {/* <p className="mt-8 text-sm text-gray-500 font-medium uppercase tracking-[0.2em]">
                PDF • Latest Revision • 2024
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {enquiryProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative">
            <button
              onClick={() => setEnquiryProduct(null)}
              className="absolute right-5 top-4 text-3xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center leading-tight">
              Enquiry for <br />
              <span className="text-brand-blue">{enquiryProduct.name}</span>
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
