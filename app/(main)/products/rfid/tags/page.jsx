"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Layers,
  Zap,
  ShieldCheck,
  Download,
  ArrowRight,
  Tag,
  ScanLine,
  Radio,
} from "lucide-react";

const RFIDTags = () => {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [search, setSearch] = useState("");

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
      name: "Aether Adept 4518",
      image: "/assets/RFID products/tags/aether-adept-4518.png",
      chip: "Impinj M730/M830",
      frequency_band: "UHF (860-960)",
      dimension: "45 X 18 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Adept 7618",
      image: "/assets/RFID products/tags/aether-adept-7618.png",
      chip: "Impinj M730/M830/U9",
      frequency_band: "UHF (860-960)",
      dimension: "45 X 18 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Adept 5030",
      image: "/assets/RFID products/tags/Aether-Adept-5030.png",
      chip: "Impinj M730/M830/U9",
      frequency_band: "UHF (860-960)",
      dimension: "50 X 30 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Adept 5030E",
      image: "/assets/RFID products/tags/Aether-Adept-5030-E.png",
      chip: "Impinj M730/M830/U9",
      frequency_band: "UHF (860-960)",
      dimension: "50 X 30 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Adept 2212",
      image: "/assets/RFID products/tags/Aether-Adept-2212.png",
      chip: "Impinj M730/M830/9N",
      frequency_band: "UHF (860-960)",
      dimension: "22 X 11 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Adept 2211",
      image: "/assets/RFID products/tags/Aether-Adept-2211.jpg",
      chip: "Impinj M730/M830/9N",
      frequency_band: "UHF (860-960)",
      dimension: "22 X 12 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Outfit 6525",
      image: "/assets/RFID products/tags/Aether-Outfit-6525.jpg",
      chip: "Impinj M730/M830",
      frequency_band: "UHF (860-960)",
      dimension: "65 X 25 mm",
      inlay_size: "45 X 18 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Apparels, Shoes",
    },
    {
      name: "Aether Outfit 6525",
      image: "/assets/RFID products/tags/Aether-Outfit-6525-tag.jpg",
      chip: "Impinj M730/M830",
      frequency_band: "UHF (860-960)",
      dimension: "65 X 25 mm",
      inlay_size: "45 X 18 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Apparels, Shoes",
    },
    {
      name: "Aether Outfit 6535",
      image: "/assets/RFID products/tags/Aether-Outfit-6535.jpg",
      chip: "Impinj M730/M830",
      frequency_band: "UHF (860-960)",
      dimension: "65 X 35 mm",
      inlay_size: "50 X 30 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Apparels, Shoes",
    },
    {
      name: "Aether Adept 9812",
      image: "/assets/RFID products/tags/Aether-Adept-9812.png",
      chip: "Higgs 9",
      frequency_band: "UHF (860-960)",
      dimension: "98 X 12 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Solar",
    },
    {
      name: "Aether Adept 9812 Label",
      image: "/assets/RFID products/tags/Aether-Adept-9812-Label.png",
      chip: "Higgs 9",
      frequency_band: "UHF (860-960)",
      dimension: "98 X 12 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Solar",
    },
    {
      name: "Aether Adept 9503",
      image: "/assets/RFID products/tags/aether-adept-9503.jpeg",
      chip: "Higgs 9",
      frequency_band: "UHF (860-960)",
      dimension: "95 X 3 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Solar",
    },
    {
      name: "Aether Traveler 9727",
      image: "/assets/RFID products/tags/Aether-Traveler-9727.png",
      chip: "G2iM/M730",
      frequency_band: "UHF (860-960)",
      dimension: "100 X 50 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Windshield",
      printing: "Multi colour",
      encoding: "Yes",
    },
    {
      name: "Aether Traveler 10025",
      image: "/assets/RFID products/tags/Aether-Traveler-10025.jpg",
      chip: "G2iM/M730",
      frequency_band: "UHF (860-960)",
      dimension: "100 X 50 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      application: "Windshield",
      printing: "Multi colour",
      encoding: "Yes",
    },
    {
      name: "Aether Regalia 5030",
      image: "/assets/RFID products/tags/Aether-Regalia-5030.png",
      chip: "Impinj M730/M830/U9",
      frequency_band: "UHF (860-960)",
      dimension: "60 X 18 mm",
      label_size: "Customisable",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Regalia 4515",
      image: "/assets/RFID products/tags/Aether-Regalia-4515.png",
      chip: "Impinj M730/M830/U9",
      frequency_band: "UHF (860-960)",
      dimension: "45 X 15 mm",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
    },
    {
      name: "Aether Rinse 7015",
      image: "/assets/RFID products/tags/Aether-Rinse-7015.png",
      chip: "Impinj M730/M830/U9",
      frequency_band: "UHF (860-960)",
      dimension: "70 X 15 mm",
      epc_memory: "128 bits TID",
      memory: "96-bit / 48-b",
      fixing_mechanism: "Stitch/Heat",
    },
    {
      name: "Aether NFC 27mm",
      image: "/assets/RFID products/tags/Aether-NFC-27mm.png",
      chip: "NTAG 213",
      frequency_band: "HF/NFC 13.56 Mhz",
      dimension: "27 mm",
      label_size: "Customisable",
      form_factor: "Inlays, Labels, Coins",
    },
    {
      name: "Aether Cards 8550",
      image: "/assets/RFID products/tags/aether-cards-8550.png",
      chip: "NTAG 213/Mifare 1K/Mifare 4k",
      frequency_band: "HF/NFC 13.56mhz",
      dimension: "8550",
      printing: "Yes",
    },
    {
      name: "Aether Keychain",
      image: "/assets/RFID products/tags/aether-keychain.jpg",
      chip: "NTAG 213",
      frequency_band: "HF/NFC 13.56 Mhz",
      dimension: "27mm",
      label_size: "Customisable",
      form_factor: "Inlays, Labels, Coins",
    },
    {
      name: "Aether Ridge 15025",
      image: "/assets/RFID products/tags/Aether-Ridge-15025.jpg",
      chip: "M730",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "150 X 25 X 15 mm",
      personalisation: "Yes",
      out_body: "ABS",
      application: "Stick on metal surface, heavy metal tracking",
    },
    {
      name: "Aether Ridge 15030",
      image: "/assets/RFID products/tags/Aether-Ridge-15030.jpg",
      chip: "M730/Higgs 9",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "150 X 30 X 15 mm",
      personalisation: "Yes",
      out_body: "ABS",
      application: "Stick on metal surface, heavy metal tracking",
    },
    {
      name: "Aether Ridge 5618",
      image: "/assets/RFID products/tags/Aether-Ridge-5618.jpeg",
      chip: "M730/Higgs 9",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "56 X 18 X 18 mm",
      personalisation: "Yes",
      out_body: "ABS",
      application: "Stick on metal surface, heavy metal tracking",
    },
    {
      name: "Aether Ridge 11025",
      image: "/assets/RFID products/tags/Aether-Ridge-11025.jpeg",
      chip: "M730",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "110 X 25 X 8 mm",
      personalisation: "Yes",
      out_body: "ABS",
      application: "Stick off metal surface, wooden pallet tracking",
    },
    {
      name: "Aether Ridge Acrylic",
      image: "/assets/RFID products/tags/Aether-Ridge-acrylic.jpeg",
      chip: "M730",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "70 X 30 X 3 mm",
      personalisation: "Yes",
      out_body: "ACRYLIC",
      application: "Stick off/on metal surface, metal assets",
    },
    {
      name: "Aether Ridge PVC",
      image: "/assets/RFID products/tags/Aether-Ridge-pvc.jpeg",
      chip: "M730",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "110 X 25 X 1 mm and 40 X 15 X 1 mm",
      personalisation: "Yes",
      out_body: "PVC",
      application: "Stick off metal surface, wooden pallet tracking",
    },
    {
      name: "Aether Ridge PCB 5507",
      image: "/assets/RFID products/tags/Aether-Ridge-pcb-5507.jpeg",
      chip: "Higgs 3",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "55 X 7 X 3 mm",
      personalisation: "Yes",
      out_body: "PLASTIC",
      application: "Stick on metal surface, metal assets, tool tracking",
    },
    {
      name: "Aether Ridge PCB 1307",
      image: "/assets/RFID products/tags/Aether-Ridge-PCB-1307.jpg",
      chip: "Higgs 3/9",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "13 X 7 X 3 mm",
      personalisation: "Yes",
      out_body: "PLASTIC",
      application: "Stick on metal surface, metal assets, tool tracking",
    },
    {
      name: "Aether Ridge PCB 7005",
      image: "/assets/RFID products/tags/Aether-Ridge-PCB-7005.jpg",
      chip: "M730",
      frequency_band: "UHF 865-867 Mhz",
      dimension: "70 X 5 X 1 mm",
      personalisation: "Yes",
      out_body: "PLASTIC",
      application: "Stick on metal surface, metal assets, tool tracking",
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        (product.chip || "").toLowerCase().includes(search.toLowerCase()) ||
        (product.application || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (product.frequency_band || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [search]);

  return (
    <div className="bg-white min-h-screen">
      {/* Products Section */}
      {/* Products Section */}
      <section className="py-20 px-5 lg:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">
              RFID Tag Products
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
                chip: "Chip",
                frequency_band: "Frequency Band",
                dimension: "Dimension",
                inlay_size: "Inlay Size",
                label_size: "Label Size",
                epc_memory: "EPC Memory",
                memory: "Memory",
                application: "Application",
                printing: "Printing",
                encoding: "Encoding",
                form_factor: "Form Factor",
                personalisation: "Personalisation",
                out_body: "Outer Body",
                fixing_mechanism: "Fixing Mechanism",
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
                Ready to Choose the <br />
                <span className="text-brand-orange">
                  Right RFID Tags for Your Needs?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-12">
                Whether you need long-range UHF or secure HF tags, our team will
                help you select the best option for your tracking, access, and
                inventory goals.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-brand-orange text-white font-medium px-12 py-5 rounded-2xl tracking-wide hover:bg-brand-orange/90 hover:scale-105 transition-all shadow-lg shadow-brand-orange/20"
                >
                  Contact Us Now
                </Link>
                <a
                  href="/assets/RFID%20products/TagsCatalogue.pptx"
                  download
                  className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white font-medium tracking-wide px-12 py-5 rounded-2xl hover:bg-white/10 transition-all"
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

export default RFIDTags;
