"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/context/ContentContext";

const Header = () => {
  const { getContent } = useContent();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  // Accessibility Font Scale state
  const [fontScale, setFontScale] = useState(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedScale = localStorage.getItem("global-font-scale");
      if (savedScale) {
        const parsed = parseInt(savedScale, 10);
        if (!isNaN(parsed) && parsed >= 80 && parsed <= 130) {
          setFontScale(parsed);
          document.documentElement.style.fontSize = `${parsed}%`;
        }
      }
    }
  }, []);

  const changeFontScale = (newScale) => {
    if (newScale >= 80 && newScale <= 130) {
      setFontScale(newScale);
      document.documentElement.style.fontSize = `${newScale}%`;
      localStorage.setItem("global-font-scale", newScale.toString());
    }
  };

  const increaseFontSize = () => changeFontScale(fontScale + 10);
  const decreaseFontSize = () => changeFontScale(fontScale - 10);
  const resetFontSize = () => changeFontScale(100);

  const fallbackNavItems = [
    {
      name: "About Us",
      dropdown: [
        { name: "Our Company", path: "/about/company-overview" },
        { name: "Team", path: "/about/team" },
        { name: "Careers", path: "/about/career" }
      ],
    },
    {
      name: "Technologies",
      dropdown: [
        { name: "RFID", path: "/technologies/rfid" },
        { name: "IOT", path: "/technologies/iot" },
        { name: "Barcodes", path: "/technologies/barcodes" }
      ],
    },
    {
      name: "Products",
      dropdown: [
        { 
          name: "RFID", 
          submenu: [
            { name: "Hardware", path: "/products/rfid/hardware" },
            { name: "Tags", path: "/products/rfid/tags" }
          ]
        },
        { 
          name: "IOT", 
          submenu: [
            { name: "Data Loggers", path: "/products/iot/data-loggers" },
            { name: "GPS/GNSS Devices", path: "/products/iot/gps-gnss" },
            { name: "LoRaWAN/Other Sensor Devices", path: "/products/iot/lorawan-sensors" }
          ]
        },
        { 
          name: "Software Solution", 
          submenu: [
            { name: "Retail Automation", path: "/products/software/retail-automation" },
            { name: "Assets Tracking", path: "/products/software/assets-tracking" },
            { name: "Warehouse Management", path: "/products/software/warehouse-management" },
            { name: "Facility Management", path: "/products/software/facility-management" },
            { name: "Factory Automation", path: "/products/software/factory-automation" }
          ]
        }
      ],
    },
    {
      name: "Industry",
      dropdown: ["Retail", "Factory Automation", "Logistics", "E-commerce/Quick Commerce"],
    },
    {
      name: "Blogs",
      dropdown: [
        { name: "Latest Blogs", path: "/blogs" },
        { name: "Case Studies", path: "/case-studies" },
        { name: "Updates", path: "/blogs" }
      ],
    },
  ];

  const navItems = getContent("header-nav", { items: fallbackNavItems }).items || fallbackNavItems;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#ffffff]/95 backdrop-blur-md text-brand-blue border-b border-slate-200/50">
      {/* Top Info & Accessibility Bar */}
      <div className="bg-[#0f172a] text-slate-300 border-b border-white/10 select-none">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-10 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-semibold">
          {/* Company Mail & Mobile */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="mailto:info@aetherrfid.com" className="flex items-center gap-2 hover:text-[#ffffff] transition-colors text-[11px] sm:text-xs">
              <Mail size={12} className="text-brand-orange" />
              <span>info@aetherrfid.com</span>
            </a>
            <a href="tel:+917042436155" className="flex items-center gap-2 hover:text-[#ffffff] transition-colors text-[11px] sm:text-xs">
              <Phone size={12} className="text-brand-orange" />
              <span>+91-7042436155</span>
            </a>
          </div>

          {/* Text Size Accessibility Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Text Size:</span>
            <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={decreaseFontSize}
                className="w-5 h-5 rounded bg-white/5 hover:bg-white/15 active:bg-white/25 flex items-center justify-center font-bold text-[9px] text-slate-200 transition-colors"
                title="Decrease Font Size (A-)"
              >
                A-
              </button>
              <button
                type="button"
                onClick={resetFontSize}
                className="w-5 h-5 rounded bg-white/5 hover:bg-white/15 active:bg-white/25 flex items-center justify-center font-bold text-[9px] text-slate-200 transition-colors"
                title="Reset Font Size (A)"
              >
                A
              </button>
              <button
                type="button"
                onClick={increaseFontSize}
                className="w-5 h-5 rounded bg-white/5 hover:bg-white/15 active:bg-white/25 flex items-center justify-center font-bold text-[9px] text-slate-200 transition-colors"
                title="Increase Font Size (A+)"
              >
                A+
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            {/* Logo Image */}
            <img
              src="/assets/Aether-rfid.png"
              alt="Logo"
              className="w-18 lg:w-24 h-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-9">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setDropdown(index)}
                onMouseLeave={() => {
                  setDropdown(null);
                  setActiveSubmenu(null);
                }}
              >
                <button className="flex items-center gap-1 text-[16px] font-medium hover:text-brand-blue transition duration-300">
                  {item.name}
                  <ChevronDown size={16} />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-[45px] left-0 w-[220px] bg-brand-blue border border-white/10 rounded-xl shadow-2xl transition-all duration-300 z-50 ${
                    dropdown === index
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-3"
                  }`}
                >
                  {item.dropdown && item.dropdown.map((drop, i) => (
                    <div key={i} className="relative group/sub">
                      {typeof drop === 'string' ? (
                        <Link
                          href="/"
                          className="block px-5 py-3 text-sm text-gray-300 hover:bg-[#1b1b1b] hover:text-[#ffffff] transition"
                        >
                          {drop}
                        </Link>
                      ) : drop.submenu ? (
                        <div className="flex items-center justify-between px-5 py-3 text-sm text-gray-300 hover:bg-[#1b1b1b] hover:text-[#ffffff] transition cursor-pointer">
                          <span>{drop.name}</span>
                          <ChevronRight size={14} />
                          {/* Submenu */}
                          <div className="absolute left-full top-0 w-[200px] bg-brand-blue border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover/sub:block transition-all duration-300">
                            {drop.submenu.map((sub, j) => (
                              <Link
                                key={j}
                                href={sub.path}
                                className="block px-5 py-3 text-sm text-gray-300 hover:bg-[#1b1b1b] hover:text-[#ffffff] transition"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={drop.path || '/'}
                          className="block px-5 py-3 text-sm text-gray-300 hover:bg-[#1b1b1b] hover:text-[#ffffff] transition"
                        >
                          {drop.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Button */}
            <Link href="/contact" className="bg-brand-blue border-2 border-brand-blue text-white font-semibold px-7 py-3 rounded-full hover:bg-[#ffffff] hover:text-brand-blue hover:scale-105 transition duration-300">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileMenu ? "max-h-[1000px] pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-white/10 pb-3">
                <button
                  className="flex items-center justify-between w-full text-left text-[14px] font-medium"
                  onClick={() => {
                    setDropdown(dropdown === index ? null : index);
                    setActiveSubmenu(null);
                  }}
                >
                  {item.name}

                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      dropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    dropdown === index ? "max-h-[500px] mt-3" : "max-h-0"
                  }`}
                >
                  <div className="flex flex-col gap-2 pl-3">
                    {item.dropdown && item.dropdown.map((drop, i) => (
                      <div key={i}>
                        {typeof drop === 'string' ? (
                          <Link
                            href="/"
                            className="text-gray-400 hover:text-brand-blue text-sm block py-1"
                            onClick={() => setMobileMenu(false)}
                          >
                            {drop}
                          </Link>
                        ) : drop.submenu ? (
                          <div className="flex flex-col gap-2">
                            <button
                              className="flex items-center justify-between w-full text-gray-400 hover:text-brand-blue text-sm py-1"
                              onClick={() => setActiveSubmenu(activeSubmenu === i ? null : i)}
                            >
                              {drop.name}
                              <ChevronDown
                                size={14}
                                className={`transition-transform duration-300 ${
                                  activeSubmenu === i ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-300 pl-4 flex flex-col gap-2 ${
                                activeSubmenu === i ? "max-h-40" : "max-h-0"
                              }`}
                            >
                              {drop.submenu.map((sub, j) => (
                                <Link
                                  key={j}
                                  href={sub.path}
                                  className="text-gray-500 hover:text-brand-blue text-sm block py-1"
                                  onClick={() => setMobileMenu(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={drop.path || '/'}
                            className="text-gray-400 hover:text-brand-blue text-sm block py-1"
                            onClick={() => setMobileMenu(false)}
                          >
                            {drop.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Link 
              href="/contact" 
              className="bg-brand-blue border-2 border-brand-blue text-white font-semibold px-6 py-3 rounded-full mt-2 hover:bg-[#ffffff] hover:text-brand-blue lg:hover:scale-105 transition duration-300 text-center"
              onClick={() => setMobileMenu(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
