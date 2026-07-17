"use client";
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Save, Plus, Trash2, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function NavigationMenuEditor() {
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
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
    setNavItemsList([...navItemsList, { name: "New Menu Item", dropdown: [] }]);
  };

  const removeTopLevelItem = (index) => {
    setNavItemsList(navItemsList.filter((_, i) => i !== index));
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
      updated[topIndex].dropdown.push({ name: "New Submenu Title", submenu: [] });
    } else {
      updated[topIndex].dropdown.push({ name: "New Link", path: "/" });
    }
    setNavItemsList(updated);
  };

  const removeDropdownItem = (topIndex, dropIndex) => {
    const updated = [...navItemsList];
    updated[topIndex].dropdown = updated[topIndex].dropdown.filter((_, i) => i !== dropIndex);
    setNavItemsList(updated);
  };

  const changeDropdownType = (topIndex, dropIndex, type) => {
    const updated = [...navItemsList];
    if (type === 'string') {
      updated[topIndex].dropdown[dropIndex] = "New Industry Label";
    } else if (type === 'submenu') {
      updated[topIndex].dropdown[dropIndex] = { name: "New Submenu Title", submenu: [] };
    } else {
      updated[topIndex].dropdown[dropIndex] = { name: "New Link", path: "/" };
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
      item.submenu.push({ name: "Sub-link name", path: "/" });
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
    try {
      await updateSectionContent("header-nav", {
        title: "Header Navigation",
        subtitle: "Dynamic Navigation Structure",
        content: {
          items: navItemsList
        }
      });
      showStatus("Navigation Menu updated successfully!");
    } catch (err) {
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
                {/* Remove Top Level Button */}
                <button
                  type="button"
                  onClick={() => removeTopLevelItem(topIndex)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition-all"
                  title="Delete Menu Item"
                >
                  <Trash2 size={16} />
                </button>

                {/* Top Level Item Title */}
                <div className="max-w-md">
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500 mb-1">Top-Level Menu Name</label>
                  <input
                    type="text"
                    value={topItem.name}
                    onChange={(e) => updateTopLevelName(topIndex, e.target.value)}
                    className="w-full px-4 py-2 text-base font-bold bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
                    placeholder="e.g. Products"
                    required
                  />
                </div>

                {/* Dropdown Items Editor */}
                <div className="pl-4 border-l-2 border-brand-blue/20 space-y-4 mt-4">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide">Dropdown Menu Items</h4>
                  
                  {topItem.dropdown && topItem.dropdown.map((dropItem, dropIndex) => {
                    const isString = typeof dropItem === 'string';
                    const isSubmenu = !isString && !!dropItem.submenu;

                    return (
                      <div key={dropIndex} className="p-4 bg-white rounded-xl border border-gray-200 relative space-y-3">
                        {/* Remove Dropdown Item */}
                        <button
                          type="button"
                          onClick={() => removeDropdownItem(topIndex, dropIndex)}
                          className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                          title="Remove Link"
                        >
                          <X size={16} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                          {/* Choose Dropdown Type */}
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Item Type</label>
                            <select
                              value={isString ? 'string' : (isSubmenu ? 'submenu' : 'link')}
                              onChange={(e) => changeDropdownType(topIndex, dropIndex, e.target.value)}
                              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer"
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
                              value={isString ? dropItem : dropItem.name}
                              onChange={(e) => updateDropdownValue(topIndex, dropIndex, 'name', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none"
                              placeholder="e.g. Hardware"
                              required
                            />
                          </div>
                        </div>

                        {/* If Simple Link, Show Path Input */}
                        {!isString && !isSubmenu && (
                          <div className="max-w-md">
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">Destination URL Path</label>
                            <input
                              type="text"
                              value={dropItem.path || ''}
                              onChange={(e) => updateDropdownValue(topIndex, dropIndex, 'path', e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:outline-none font-mono"
                              placeholder="e.g. /products/rfid/hardware"
                              required
                            />
                          </div>
                        )}

                        {/* If Submenu (Level 3 Nesting), Show Sub-links editor */}
                        {isSubmenu && (
                          <div className="pl-4 border-l-2 border-brand-green/20 space-y-3 mt-3">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Nested Sub-Links</span>
                              <button
                                type="button"
                                onClick={() => addSubmenuItem(topIndex, dropIndex)}
                                className="px-2.5 py-1 bg-brand-green/10 text-brand-green hover:bg-brand-green/20 text-[10px] font-bold rounded-md flex items-center gap-1 transition-all"
                              >
                                <Plus size={10} /> Add Sub-Link
                              </button>
                            </div>

                            <div className="space-y-2">
                              {dropItem.submenu.map((subItem, subIndex) => (
                                <div key={subIndex} className="flex flex-col md:flex-row gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200/50 items-center relative">
                                  <button
                                    type="button"
                                    onClick={() => removeSubmenuItem(topIndex, dropIndex, subIndex)}
                                    className="absolute top-2 right-2 md:relative md:top-auto md:right-auto text-red-400 hover:text-red-600 order-last"
                                  >
                                    <X size={14} />
                                  </button>

                                  <div className="w-full md:w-1/2">
                                    <input
                                      type="text"
                                      value={subItem.name}
                                      onChange={(e) => updateSubmenuValue(topIndex, dropIndex, subIndex, 'name', e.target.value)}
                                      className="w-full px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs font-medium text-gray-800"
                                      placeholder="Sub-link Title"
                                      required
                                    />
                                  </div>
                                  <div className="w-full md:w-1/2">
                                    <input
                                      type="text"
                                      value={subItem.path}
                                      onChange={(e) => updateSubmenuValue(topIndex, dropIndex, subIndex, 'path', e.target.value)}
                                      className="w-full px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-xs text-gray-600 font-mono"
                                      placeholder="/path/to/page"
                                      required
                                    />
                                  </div>
                                </div>
                              ))}

                              {dropItem.submenu.length === 0 && (
                                <div className="text-[10px] text-gray-400 italic text-center py-2">
                                  No nested sub-links yet. Click "Add Sub-Link".
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Add Dropdown Item Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => addDropdownItem(topIndex, 'link')}
                      className="px-3 py-1.5 bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                    >
                      <Plus size={12} /> Add Simple Link
                    </button>
                    <button
                      type="button"
                      onClick={() => addDropdownItem(topIndex, 'submenu')}
                      className="px-3 py-1.5 bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                    >
                      <Plus size={12} /> Add Nested Submenu Group
                    </button>
                    <button
                      type="button"
                      onClick={() => addDropdownItem(topIndex, 'string')}
                      className="px-3 py-1.5 bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                    >
                      <Plus size={12} /> Add Text Label
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {navItemsList.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-400 text-sm">
                No navigation menu items created yet. Click "Add Top-Level Menu Item".
              </div>
            )}

            <button
              type="button"
              onClick={addTopLevelItem}
              className="w-full py-4 border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Plus size={18} /> Add Top-Level Menu Item
            </button>
          </div>

          <div className="flex justify-between items-center border-t border-gray-100 pt-6">
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
              className="px-6 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-brand-blue/10"
            >
              <Save size={16} /> Save Navigation Menu
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
