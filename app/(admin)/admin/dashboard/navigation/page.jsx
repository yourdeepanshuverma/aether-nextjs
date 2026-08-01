"use client";
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Save, Plus, Trash2, X, CheckCircle, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function NavigationMenuEditor() {
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { 
    getContent, 
    updateSectionContent,
    refreshData,
    siteContent
  } = useContent();

  const showStatus = (success = '', error = '') => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: '', error: '' }), 4000);
  };

  const fallbackNavItems = [
    {
      name: "About Us",
      enabled: true,
      dropdown: [
        { name: "Our Company", path: "/about/company-overview", enabled: true },
        { name: "Team", path: "/about/team", enabled: true },
        { name: "Careers", path: "/about/career", enabled: true }
      ],
    },
    {
      name: "Technologies",
      enabled: true,
      dropdown: [
        { name: "RFID", path: "/technologies/rfid", enabled: true },
        { name: "IOT", path: "/technologies/iot", enabled: true },
        { name: "Barcodes", path: "/technologies/barcodes", enabled: true }
      ],
    },
    {
      name: "Products",
      enabled: true,
      dropdown: [
        { 
          name: "RFID", 
          enabled: true,
          submenu: [
            { name: "Hardware", path: "/products/rfid/hardware", enabled: true },
            { name: "Tags", path: "/products/rfid/tags", enabled: true }
          ]
        },
        { 
          name: "IOT", 
          enabled: true,
          submenu: [
            { name: "Data Loggers", path: "/products/iot/data-loggers", enabled: true },
            { name: "GPS/GNSS Devices", path: "/products/iot/gps-gnss", enabled: true },
            { name: "LoRaWAN/Other Sensor Devices", path: "/products/iot/lorawan-sensors", enabled: true }
          ]
        },
        { 
          name: "Software Solution", 
          enabled: true,
          submenu: [
            { name: "Retail Automation", path: "/products/software/retail-automation", enabled: true },
            { name: "Assets Tracking", path: "/products/software/assets-tracking", enabled: true },
            { name: "Warehouse Management", path: "/products/software/warehouse-management", enabled: true },
            { name: "Facility Management", path: "/products/software/facility-management", enabled: true },
            { name: "Factory Automation", path: "/products/software/factory-automation", enabled: true }
          ]
        }
      ],
    },
    {
      name: "Industry",
      enabled: true,
      dropdown: [
        { name: "Retail", path: "/industries/retail", enabled: true },
        { name: "Manufacturing", path: "/industries/manufacturing", enabled: true },
        { name: "Logistics & Supply chain", path: "/industries/logistics", enabled: true },
        { name: "E-commerce/Quick Commerce", path: "/industries/ecommerce-quickcommerce", enabled: true },
        { name: "Renewable Energy", path: "/industries/renewable-energy", enabled: true }
      ],
    },
    {
      name: "Blogs",
      enabled: true,
      dropdown: [
        { name: "Latest Blogs", path: "/blogs", enabled: true },
        { name: "Case Studies", path: "/case-studies", enabled: true },
        { name: "Updates", path: "/blogs", enabled: true }
      ],
    },
  ];

  const navDefaults = getContent("header-nav", { items: fallbackNavItems });
  const [navItemsList, setNavItemsList] = useState([]);

  useEffect(() => {
    if (navDefaults.items) {
      setNavItemsList(navDefaults.items);
    }
  }, [siteContent]);

  // ==========================================
  // VISUAL NAVIGATION BUILDER ACTIONS
  // ==========================================
  const addTopLevelItem = () => {
    setNavItemsList([...navItemsList, { name: "New Menu Item", enabled: true, dropdown: [] }]);
  };

  const removeTopLevelItem = (index) => {
    setNavItemsList(navItemsList.filter((_, i) => i !== index));
  };

  const toggleTopLevelStatus = (index) => {
    const updated = [...navItemsList];
    const currentStatus = updated[index].enabled !== false;
    updated[index].enabled = !currentStatus;
    setNavItemsList(updated);
  };

  const updateTopLevelName = (index, name) => {
    const updated = [...navItemsList];
    updated[index].name = name;
    setNavItemsList(updated);
  };

  const addDropdownItem = (topIndex, type) => {
    const updated = [...navItemsList];
    if (!updated[topIndex].dropdown) {
      updated[topIndex].dropdown = [];
    }
    
    if (type === 'string') {
      updated[topIndex].dropdown.push("New Industry Label");
    } else if (type === 'submenu') {
      updated[topIndex].dropdown.push({ name: "New Submenu Title", enabled: true, submenu: [] });
    } else {
      updated[topIndex].dropdown.push({ name: "New Link", path: "/", enabled: true });
    }
    setNavItemsList(updated);
  };

  const removeDropdownItem = (topIndex, dropIndex) => {
    const updated = [...navItemsList];
    updated[topIndex].dropdown = updated[topIndex].dropdown.filter((_, i) => i !== dropIndex);
    setNavItemsList(updated);
  };

  const toggleDropdownStatus = (topIndex, dropIndex) => {
    const updated = [...navItemsList];
    const item = updated[topIndex].dropdown[dropIndex];
    if (typeof item !== 'string') {
      const currentStatus = item.enabled !== false;
      updated[topIndex].dropdown[dropIndex] = { ...item, enabled: !currentStatus };
      setNavItemsList(updated);
    }
  };

  const changeDropdownType = (topIndex, dropIndex, type) => {
    const updated = [...navItemsList];
    if (type === 'string') {
      updated[topIndex].dropdown[dropIndex] = "New Industry Label";
    } else if (type === 'submenu') {
      updated[topIndex].dropdown[dropIndex] = { name: "New Submenu Title", enabled: true, submenu: [] };
    } else {
      updated[topIndex].dropdown[dropIndex] = { name: "New Link", path: "/", enabled: true };
    }
    setNavItemsList(updated);
  };

  const updateDropdownValue = (topIndex, dropIndex, field, value) => {
    const updated = [...navItemsList];
    const item = updated[topIndex].dropdown[dropIndex];
    if (typeof item === 'string') {
      updated[topIndex].dropdown[dropIndex] = value;
    } else {
      updated[topIndex].dropdown[dropIndex] = { ...item, [field]: value };
    }
    setNavItemsList(updated);
  };

  const addSubmenuItem = (topIndex, dropIndex) => {
    const updated = [...navItemsList];
    const item = updated[topIndex].dropdown[dropIndex];
    if (item.submenu) {
      item.submenu.push({ name: "Sub-link name", path: "/", enabled: true });
    }
    setNavItemsList(updated);
  };

  const removeSubmenuItem = (topIndex, dropIndex, subIndex) => {
    const updated = [...navItemsList];
    const item = updated[topIndex].dropdown[dropIndex];
    if (item.submenu) {
      item.submenu = item.submenu.filter((_, i) => i !== subIndex);
    }
    setNavItemsList(updated);
  };

  const toggleSubmenuStatus = (topIndex, dropIndex, subIndex) => {
    const updated = [...navItemsList];
    const item = updated[topIndex].dropdown[dropIndex];
    if (item.submenu && item.submenu[subIndex]) {
      const currentStatus = item.submenu[subIndex].enabled !== false;
      item.submenu[subIndex] = { ...item.submenu[subIndex], enabled: !currentStatus };
      setNavItemsList(updated);
    }
  };

  const updateSubmenuValue = (topIndex, dropIndex, subIndex, field, value) => {
    const updated = [...navItemsList];
    const item = updated[topIndex].dropdown[dropIndex];
    if (item.submenu && item.submenu[subIndex]) {
      item.submenu[subIndex] = { ...item.submenu[subIndex], [field]: value };
    }
    setNavItemsList(updated);
  };

  const handleNavSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateSectionContent("header-nav", {
        title: "Header Navigation",
        subtitle: "Dynamic Navigation Structure",
        content: {
          items: navItemsList
        }
      });
      setIsSaving(false);
      setSaveSuccess(true);
      showStatus("Navigation Menu updated successfully!");
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setIsSaving(false);
      showStatus("", "Failed to save Navigation Menu.");
    }
  };

  return (
    <>
      {/* Header Title */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            Header Navigation Menu
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage database records in real-time</p>
        </div>
        <button 
          onClick={() => { refreshData(); showStatus("Data refreshed from database."); }} 
          className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          Refresh Data
        </button>
      </div>

      {/* Global Feedback Banner */}
      {statusMessage.success && (
        <div className="mb-8 flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium animate-pulse">
          <CheckCircle size={18} /> {statusMessage.success}
        </div>
      )}
      {statusMessage.error && (
        <div className="mb-8 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium">
          <AlertCircle size={18} /> {statusMessage.error}
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
        <p className="text-gray-500 text-xs">
          Visually configure the links, submenus, and dropdown structures of your website header. No code editing required.
        </p>

        <form onSubmit={handleNavSave} className="space-y-6">
          <div className="space-y-6">
            {navItemsList.map((topItem, topIndex) => (
              <div key={topIndex} className="p-5 bg-gray-50/70 rounded-2xl border border-gray-200/60 relative space-y-4">
                {/* Top Level Item Title & Enable/Disable Toggle */}
                <div className="max-w-md space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500">Top-Level Menu Name</label>
                    <button
                      type="button"
                      onClick={() => toggleTopLevelStatus(topIndex)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 transition-all ${
                        topItem.enabled !== false 
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300" 
                          : "bg-gray-200 text-gray-600 border border-gray-300"
                      }`}
                    >
                      {topItem.enabled !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{topItem.enabled !== false ? "Enabled" : "Disabled"}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={topItem.name}
                    disabled
                    onChange={(e) => updateTopLevelName(topIndex, e.target.value)}
                    className="w-full px-4 py-2 text-base font-bold bg-gray-100/80 rounded-lg border border-gray-200 text-gray-700 cursor-not-allowed transition-all"
                    placeholder="e.g. Products"
                  />
                </div>

                {/* Dropdown Items Editor */}
                <div className="pl-4 border-l-2 border-brand-blue/20 space-y-4 mt-4">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide">Dropdown Menu Items</h4>
                  
                  {topItem.dropdown && topItem.dropdown.map((dropItem, dropIndex) => {
                    const isString = typeof dropItem === 'string';
                    const isSubmenu = !isString && !!dropItem.submenu;

                    return (
                      <div key={dropIndex} className={`p-4 bg-white rounded-xl border relative space-y-3 transition-all ${!isString && dropItem.enabled === false ? 'opacity-65 bg-gray-50 border-dashed border-gray-300' : 'border-gray-200'}`}>
                        {/* Status Toggle & Remove Dropdown Item */}
                        <div className="absolute top-3 right-3 flex items-center gap-2">
                          {!isString && (
                            <button
                              type="button"
                              onClick={() => toggleDropdownStatus(topIndex, dropIndex)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 transition-all ${
                                dropItem.enabled !== false
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-gray-200 text-gray-600 border border-gray-300"
                              }`}
                              title={dropItem.enabled !== false ? "Click to Disable link" : "Click to Enable link"}
                            >
                              {dropItem.enabled !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                              <span>{dropItem.enabled !== false ? "Active" : "Disabled"}</span>
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pr-24">
                          {/* Choose Dropdown Type */}
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Item Type</label>
                            <select
                              disabled
                              value={isString ? 'string' : (isSubmenu ? 'submenu' : 'link')}
                              onChange={(e) => changeDropdownType(topIndex, dropIndex, e.target.value)}
                              className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 cursor-not-allowed focus:outline-none"
                            >
                              <option value="link">Simple Link</option>
                              <option value="submenu">Nested Submenu</option>
                              <option value="string">Simple Label (Industry style)</option>
                            </select>
                          </div>

                          {/* Link Name */}
                          <div className="md:col-span-2">
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                              {isString ? 'Label Text' : (isSubmenu ? 'Submenu Header Name' : 'Link Title')}
                            </label>
                            <input
                              type="text"
                              disabled
                              value={isString ? dropItem : dropItem.name}
                              onChange={(e) => updateDropdownValue(topIndex, dropIndex, 'name', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-100/80 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 cursor-not-allowed focus:outline-none"
                              placeholder="e.g. Hardware"
                            />
                          </div>
                        </div>

                        {/* If Simple Link, Show Path Input */}
                        {!isString && !isSubmenu && (
                          <div className="max-w-md">
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Destination URL Path</label>
                            <input
                              type="text"
                              disabled
                              value={dropItem.path || ''}
                              onChange={(e) => updateDropdownValue(topIndex, dropIndex, 'path', e.target.value)}
                              className="w-full px-3 py-2 bg-gray-100/80 rounded-lg border border-gray-200 text-xs text-gray-600 cursor-not-allowed focus:outline-none font-mono"
                              placeholder="e.g. /products/rfid/hardware"
                            />
                          </div>
                        )}

                        {/* If Submenu (Level 3 Nesting), Show Sub-links editor */}
                        {isSubmenu && (
                          <div className="pl-4 border-l-2 border-brand-green/20 space-y-3 mt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Nested Sub-Links</span>
                            </div>

                            <div className="space-y-2">
                              {dropItem.submenu.map((subItem, subIndex) => (
                                <div key={subIndex} className={`flex flex-col md:flex-row gap-3 p-3 rounded-lg border items-center relative transition-all ${subItem.enabled === false ? 'bg-gray-100/70 border-dashed border-gray-300 opacity-70' : 'bg-gray-50 border-gray-200/50'}`}>
                                  <button
                                    type="button"
                                    onClick={() => toggleSubmenuStatus(topIndex, dropIndex, subIndex)}
                                    className={`px-2 py-1 rounded text-[10px] font-extrabold flex items-center gap-1 transition-all shrink-0 ${
                                      subItem.enabled !== false
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-gray-300 text-gray-700"
                                    }`}
                                    title={subItem.enabled !== false ? "Click to Disable" : "Click to Enable"}
                                  >
                                    {subItem.enabled !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                                    <span>{subItem.enabled !== false ? "Active" : "Disabled"}</span>
                                  </button>

                                  <div className="w-full md:w-5/12">
                                    <input
                                      type="text"
                                      disabled
                                      value={subItem.name}
                                      onChange={(e) => updateSubmenuValue(topIndex, dropIndex, subIndex, 'name', e.target.value)}
                                      className="w-full px-3 py-1.5 bg-gray-100/80 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 cursor-not-allowed"
                                      placeholder="Sub-link Title"
                                    />
                                  </div>
                                  <div className="w-full md:w-5/12">
                                    <input
                                      type="text"
                                      disabled
                                      value={subItem.path}
                                      onChange={(e) => updateSubmenuValue(topIndex, dropIndex, subIndex, 'path', e.target.value)}
                                      className="w-full px-3 py-1.5 bg-gray-100/80 rounded-lg border border-gray-200 text-xs text-gray-600 cursor-not-allowed font-mono"
                                      placeholder="/path/to/page"
                                    />
                                  </div>
                                </div>
                              ))}

                              {dropItem.submenu.length === 0 && (
                                <div className="text-[10px] text-gray-400 italic text-center py-2">
                                  No nested sub-links.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Are you sure you want to reset the navigation layout to original defaults?")) {
                  setNavItemsList(fallbackNavItems);
                }
              }}
              className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              Reset to Defaults
            </button>

            <button 
              type="submit" 
              disabled={isSaving}
              className={`px-8 py-3.5 rounded-xl text-sm font-extrabold flex items-center gap-2 shadow-lg transition-all ${
                saveSuccess
                  ? "bg-emerald-600 text-white shadow-emerald-600/20 scale-105"
                  : isSaving
                  ? "bg-brand-blue/70 text-white cursor-not-allowed"
                  : "bg-brand-blue hover:bg-brand-blue/90 text-white shadow-brand-blue/10 hover:scale-105"
              }`}
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Saving Menu Changes...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle size={18} />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Navigation Menu</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Floating Toast Notification (Always Visible Even When Scrolled) */}
      {statusMessage.success && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl text-sm font-bold animate-bounce border border-emerald-500">
          <CheckCircle size={20} /> {statusMessage.success}
        </div>
      )}
      {statusMessage.error && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 bg-rose-600 text-white rounded-2xl shadow-2xl text-sm font-bold border border-rose-500">
          <AlertCircle size={20} /> {statusMessage.error}
        </div>
      )}
    </>
  );
}
