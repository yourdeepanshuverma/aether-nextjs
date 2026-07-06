"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, Download, ArrowRight } from "lucide-react";

const RFIDHardware = () => {
  const [search, setSearch] = useState("");
  const [showEnquiry, setShowEnquiry] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Yahan API call karna hai

    alert("Thank you! We will contact you soon.");

    setShowEnquiry(false);

    setFormData({
      name: "",
      mobile: "",
      email: "",
      company: "",
      requirement: "",
    });
  };
  //

  const products = [
    {
      name: "C72-Reader",
      image: "/assets/RFID products/hardware/c72-front.png",
      description: "C72 Hand Held Reader",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 10 Meters",
      read_capacity: "1100 tags/sec",
      application: "Inventory Management, Retail, WMS and More",
      main_features: "UHF RFID, NFC, 1D/2D",
      moq: "1",
    },
    {
      name: "C5-Reader",
      image: "/assets/RFID products/hardware/c5-front.png",
      description: "C5 Hand Held Reader",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 10 Meters",
      read_capacity: "1100 tags/sec",
      application: "Item level traceability, Inventory Management, Retail, WMS",
      main_features: "Gen 2X Compliant, UHF RFID, NFC, 1D/2D",
      moq: "1",
    },
    {
      name: "R6-Reader",
      image: "/assets/RFID products/hardware/r6-front.png",
      description: "R6 Hand Held Sled Reader",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 6 Meters",
      read_capacity: "900 tags/sec",
      application: "Item level traceability, Inventory Management, Retail, WMS",
      main_features: "Gen 2X Compliant, UHF RFID, NFC, 1D/2D",
      moq: "1",
    },
    {
      name: "URA4 Fixed Reader",
      image: "/assets/RFID products/hardware/ura4-front.png",
      description: "URA4 Fixed 4 Port Reader",
      frequency: "UHF (860-960)",
      operating_system: "Android 9",
      read_range: "Long Range upto 15 Meters",
      read_capacity: "900+ tags/sec",
      application: "Inventory Management, Retail, WMS and more",
      main_features:
        "Impinj Module, 4 Port Reader, Port Extension, Android Based, Direct Data Transfer",
      extension: "1",
    },
    {
      name: "U300 Fixed Reader",
      image: "/assets/RFID products/hardware/u300-front.jpg",
      description: "URA4 Fixed 4/8 Port Reader Gen-2X",
      frequency: "UHF (860-960)",
      operating_system: "Android 11",
      read_range: "Long Range upto 15 Meters",
      read_capacity: "1300+ tags/sec",
      application: "Inventory Management, Retail, WMS and more.",
      main_features:
        "Impinj Module, 4 Port Reader, Port Extension, Android Based, Direct Data Transfer",
      moq: "1",
    },
    {
      name: "R3 Fixed Reader",
      image: "/assets/RFID products/hardware/r3-fixed.png",
      description: "Desktop Reader-Gen2X",
      frequency: "UHF (860-960)",
      operating_system: "Android 11",
      read_range: "Long Range upto 15 Meters",
      read_capacity: "1300+ tags/sec",
      application: "Inventory Management, Retail, WMS and more.",
      main_features:
        "Impinj Module, 4 Port Reader, Port Extension, Android Based, Direct Data Transfer",
      moq: "1",
    },
    {
      name: "RFD40 Reader",
      image: "/assets/RFID products/hardware/rfd40-front.png",
      description: "RFD40 Hand Held Sled Reader",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 10 Meters",
      read_capacity: "600 tags/sec",
      application: "Inventory Management, Retail, WMS and more.",
      main_features: "UHF RFID, NFC, 1D/2D",
      moq: "1",
    },
    {
      name: "MC3330XR-Reader",
      image: "/assets/RFID products/hardware/mc3330-front.png",
      description: "MC3330XR Held Reader with Android 14",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 8 Meters",
      read_capacity: "900 tags/sec",
      application: "Item level traceability, Inventory Management, Retail, WMS",
      main_features: "UHF RFID, 1D/2D, Screen with keypad High Performance",
      moq: "1",
    },
    {
      name: "FX9600-Reader",
      image: "/assets/RFID products/hardware/fx-9600.png",
      max_reciever_sensitivity: "86dBm monostatic",
      operating_temperature: "-4deg F to 131deg F (-20deg C to 55deg C)",
      polarisation: "Circular",
      read_range: "Long Range upto 12 Meters",
      read_capacity: "1100 tags/sec",
      application: "Item level traceability, Inventory Management",
      moq: "1",
    },
    {
      name: "UHF Reader Antenna",
      image: "/assets/RFID products/hardware/uhf-reader.png",
      description: "Aether Long Range 9dBi Antenna",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 12 Meters",
      application: "Inventory Management, Retail, WMS and more.",
      main_features:
        "In House Designed, ABS Body, Long Range, High Performance",
    },
    {
      name: "UHF Reader Antenna AN-480",
      image: "/assets/RFID products/hardware/uhf-an480.png",
      description: "Zebra Long Range 9dBi Antenna",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 12 Meters",
      application: "Inventory Management, Retail, WMS and more.",
      main_features: "Zebra, ABS Body, Long Range, High Performance",
    },
    {
      name: "Aether Long Range Integrated-Reader",
      image: "/assets/RFID products/hardware/long-range-rfid-reader.png",
      description: "Long Range Reader with 12dBi Gain",
      frequency: "UHF (860-960)",
      polarisation: "Circular",
      read_range: "Long Range upto 25 Meters",
      read_capacity: "1100 tags/sec",
      application: "Parking, Toll Plaza",
      main_features: "RS232, RS485, Wiegand, POE",
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.description || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [products, search]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Products Section */}
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
                  key={index}
                  className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center">
                    {/* Product Image */}
                    <div className="flex justify-center">
                      <img
                        src={product.image}
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
                        {Object.entries(product)
                          .filter(([key]) => key !== "name" && key !== "image")
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
