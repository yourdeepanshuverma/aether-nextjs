"use client";
"use client";
"use client";
"use client";
"use client";
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const navItems = [
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
  return (
    <header className="sticky top-0 z-50 w-full bg-[#ffffff]/90 backdrop-blur-md text-brand-blue border-b border-white/10">
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
                  {item.dropdown.map((drop, i) => (
                    <div key={i} className="relative group/sub">
                      {typeof drop === 'string' ? (
                        <Link href="/"
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
                        <Link href={drop.path}
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
                    {item.dropdown.map((drop, i) => (
                      <div key={i}>
                        {typeof drop === 'string' ? (
                          <Link href="/"
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
                          <Link href={drop.path}
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

            <Link href="/contact" 
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
