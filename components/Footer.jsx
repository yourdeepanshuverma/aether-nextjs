"use client";
"use client";
"use client";
"use client";
"use client";
import Link from "next/link";

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-1 2.17-2.41 3.06c1.35.13 2.58-.36 2.58-.36a9.23 9.23 0 0 1-2.45 2.54c0 5.17-3.9 11-11 11-3.23 0-6.19-1.09-8.41-2.95a12.55 12.55 0 0 0 1.57.09c2.63 0 5.1-.9 7-2.41a4.13 4.13 0 0 1-3.86-2.85c.35.05.7.08 1.07.08.51 0 .98-.07 1.44-.2a4.12 4.12 0 0 1-3.3-4.05v-.05c.75.42 1.61.67 2.53.7a4.13 4.13 0 0 1-1.28-5.51 11.72 11.72 0 0 0 8.51 4.31 4.13 4.13 0 0 1 7.03-3.76 8.27 8.27 0 0 0 2.62-1c-.13.38-.63.74-1 1a8.27 8.27 0 0 0 2.37-.65z"/>
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Footer = () => {
  const sections = [
    {
      title: "Industries",
      links: [
        { name: "Retail", path: "/" },
        { name: "Factory Automation", path: "/" },
        { name: "Logistics", path: "/" },
        { name: "E-commerce", path: "/" },
        { name: "Quick Commerce", path: "/" },
      ],
    },
    {
      title: "Products",
      links: [
        { name: "RFID", path: "/" },
        { name: "IOT", path: "/" },
        { name: "Software Solution", path: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/" },
        { name: "Contact", path: "/contact" },
        { name: "Management", path: "/" },
        { name: "Blogs", path: "/blogs" },
        { name: "Careers", path: "/" },
      ],
    },
  ];

  const addresses = [
    {
      title: "Corporate Office",
      company: "AETHER RFID TECHNOLOGIES PVT LTD.",
      address: "211, 3rd Floor, Okhla Industrial Estate, Phase 3, New Delhi-110020.",
      contact: "+91-7042436155",
    },
    {
      title: "Production & R&D Center",
      company: "AETHER RFID TECHNOLOGIES PVT LTD.",
      address: "B-185, 2nd Floor, Okhla Industrial Area, Phase 1, New Delhi-110020.",
      contact: "+91-7070543479",
    },
    {
      title: "Branch Office",
      company: "AETHER RFID TECHNOLOGIES PVT LTD.",
      address: "164/10, 3rd Floor, Dutta Mart, Near Udayan Club, Kolkata, West Bengal, 700061.",
      contact: "+91-7488196939",
    },
  ];

  return (
    <footer className="bg-white text-gray-800 pt-16 pb-8 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 mb-16">
          {/* Logo Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <img src="/assets/Aether-rfid.png" alt="Logo"
                  className="h-14 lg:h-18 w-auto object-contain"
                />
              </Link>
            </div>

            <p className="font-semibold text-gray-800 uppercase mb-6 max-w-md">
              AETHER RFID Technologies Private Limited
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-white transition-all shadow-sm">
                <LinkedInIcon size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-white transition-all shadow-sm">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-green hover:text-white transition-all shadow-sm">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-900 mb-6 text-lg">{section.title}</h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href={link.path}
                      className="text-gray-500 font-medium hover:text-brand-green transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Addresses Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 pt-10 border-t border-gray-100">
          {addresses.map((addr, index) => (
            <div key={index}>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">{addr.title}</h3>
              <p className="text-sm text-gray-700 font-bold mb-2 uppercase tracking-tight">{addr.company}</p>
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                {addr.address}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-bold">Contact:</span> {addr.contact}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Copyright © 2026 AETHER RFID. All rights reserved
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Cookies", "Disclaimer", "Privacy Policies", "Site Map", "Terms"].map((item, i) => (
              <a key={i} href="#" className="text-sm text-gray-500 hover:text-brand-blue transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
