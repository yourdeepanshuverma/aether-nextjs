"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/context/ContentContext";
import { api } from "@/utils/api";
import { getSafeMediaUrl } from "@/utils/media";
import {
  Handshake,
  Award,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Upload,
  Loader2,
  X,
  RotateCcw,
  ExternalLink,
} from "lucide-react";

const INITIAL_ALLIANCES = [
  { id: "all-1", name: "Avery Dennison", logo: "/assets/alliance/every-dennison.png", enabled: true },
  { id: "all-2", name: "Chainway", logo: "/assets/alliance/chainway.png", enabled: true },
  { id: "all-3", name: "TVSE", logo: "/assets/alliance/tvse.png", enabled: true },
];

const INITIAL_CERTIFICATIONS = [
  { id: "cert-1", name: "ISO 9001:2015", logo: "/assets/alliance/iso.png", enabled: true },
  { id: "cert-2", name: "CE Certified", logo: "/assets/alliance/ce.png", enabled: true },
  { id: "cert-3", name: "RoHS Compliant", logo: "/assets/alliance/rohs.png", enabled: true },
  { id: "cert-4", name: "Startup India", logo: "/assets/alliance/startup-india.png", enabled: true },
];

export default function AllianceManager() {
  const { getContent, updateSectionContent, refreshData, siteContent, adminToken } = useContent();

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ success: "", error: "" });

  const allianceDefaults = getContent("home-alliances", {
    title: "Alliances & Certifications",
    subtitle: "",
    content: {
      showAlliances: true,
      alliancesTitle: "Strategic Alliances",
      showCertifications: true,
      certificationsTitle: "Our Certification",
      alliances: INITIAL_ALLIANCES,
      certifications: INITIAL_CERTIFICATIONS,
    },
  });

  const [formConfig, setFormConfig] = useState({
    showAlliances: allianceDefaults.showAlliances !== false,
    alliancesTitle: allianceDefaults.alliancesTitle || "Strategic Alliances",
    showCertifications: allianceDefaults.showCertifications !== false,
    certificationsTitle: allianceDefaults.certificationsTitle || "Our Certification",
    alliances: Array.isArray(allianceDefaults.alliances) && allianceDefaults.alliances.length > 0
      ? allianceDefaults.alliances
      : INITIAL_ALLIANCES,
    certifications: Array.isArray(allianceDefaults.certifications) && allianceDefaults.certifications.length > 0
      ? allianceDefaults.certifications
      : INITIAL_CERTIFICATIONS,
  });

  // Active Tab for managing Partners vs Certifications
  const [activeTab, setActiveTab] = useState("alliances");

  // Modal State
  const [modal, setModal] = useState({
    show: false,
    type: "alliance", // 'alliance' | 'certification'
    mode: "create", // 'create' | 'edit'
    id: null,
  });

  const [itemForm, setItemForm] = useState({
    name: "",
    logo: "",
    enabled: true,
  });

  // Sync state if siteContent updates
  useEffect(() => {
    const current = getContent("home-alliances", {
      content: {
        showAlliances: true,
        alliancesTitle: "Strategic Alliances",
        showCertifications: true,
        certificationsTitle: "Our Certification",
        alliances: INITIAL_ALLIANCES,
        certifications: INITIAL_CERTIFICATIONS,
      },
    });

    setFormConfig({
      showAlliances: current.showAlliances !== false,
      alliancesTitle: current.alliancesTitle || "Strategic Alliances",
      showCertifications: current.showCertifications !== false,
      certificationsTitle: current.certificationsTitle || "Our Certification",
      alliances: Array.isArray(current.alliances) && current.alliances.length > 0
        ? current.alliances
        : INITIAL_ALLIANCES,
      certifications: Array.isArray(current.certifications) && current.certifications.length > 0
        ? current.certifications
        : INITIAL_CERTIFICATIONS,
    });
  }, [siteContent]);

  const showStatus = (success = "", error = "") => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: "", error: "" }), 4000);
  };

  // Image upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const res = await api.uploadFile(file, "alliances", "images", adminToken);
      if (res?.url) {
        setItemForm((prev) => ({ ...prev, logo: res.url }));
        showStatus("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading logo image:", error);
      showStatus("", "Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Open Modal for Create
  const handleOpenCreate = (type) => {
    setItemForm({
      name: "",
      logo: "",
      enabled: true,
    });
    setModal({
      show: true,
      type,
      mode: "create",
      id: null,
    });
  };

  // Open Modal for Edit
  const handleOpenEdit = (type, item) => {
    setItemForm({
      name: item.name || "",
      logo: item.logo || "",
      enabled: item.enabled !== false,
    });
    setModal({
      show: true,
      type,
      mode: "edit",
      id: item.id,
    });
  };

  // Save Modal Item
  const handleSaveModalItem = (e) => {
    e.preventDefault();
    if (!itemForm.name.trim() || !itemForm.logo.trim()) {
      showStatus("", "Please provide both a Name and a Logo image path/URL.");
      return;
    }

    if (modal.type === "alliance") {
      if (modal.mode === "create") {
        const newItem = {
          id: `all-${Date.now()}`,
          name: itemForm.name.trim(),
          logo: itemForm.logo.trim(),
          enabled: itemForm.enabled,
        };
        setFormConfig((prev) => ({
          ...prev,
          alliances: [...prev.alliances, newItem],
        }));
        showStatus("Alliance partner added! Click 'Save Changes' to publish.");
      } else {
        setFormConfig((prev) => ({
          ...prev,
          alliances: prev.alliances.map((item) =>
            item.id === modal.id
              ? { ...item, name: itemForm.name.trim(), logo: itemForm.logo.trim(), enabled: itemForm.enabled }
              : item
          ),
        }));
        showStatus("Alliance partner updated! Click 'Save Changes' to publish.");
      }
    } else {
      if (modal.mode === "create") {
        const newItem = {
          id: `cert-${Date.now()}`,
          name: itemForm.name.trim(),
          logo: itemForm.logo.trim(),
          enabled: itemForm.enabled,
        };
        setFormConfig((prev) => ({
          ...prev,
          certifications: [...prev.certifications, newItem],
        }));
        showStatus("Certification added! Click 'Save Changes' to publish.");
      } else {
        setFormConfig((prev) => ({
          ...prev,
          certifications: prev.certifications.map((item) =>
            item.id === modal.id
              ? { ...item, name: itemForm.name.trim(), logo: itemForm.logo.trim(), enabled: itemForm.enabled }
              : item
          ),
        }));
        showStatus("Certification updated! Click 'Save Changes' to publish.");
      }
    }

    setModal({ show: false, type: "alliance", mode: "create", id: null });
  };

  // Delete item
  const handleDeleteItem = (type, id) => {
    if (!window.confirm("Are you sure you want to remove this item?")) return;

    if (type === "alliance") {
      setFormConfig((prev) => ({
        ...prev,
        alliances: prev.alliances.filter((item) => item.id !== id),
      }));
    } else {
      setFormConfig((prev) => ({
        ...prev,
        certifications: prev.certifications.filter((item) => item.id !== id),
      }));
    }
    showStatus("Item removed. Remember to click 'Save Changes' to persist.");
  };

  // Toggle single item visibility
  const handleToggleItemVisibility = (type, id) => {
    if (type === "alliance") {
      setFormConfig((prev) => ({
        ...prev,
        alliances: prev.alliances.map((item) =>
          item.id === id ? { ...item, enabled: !item.enabled } : item
        ),
      }));
    } else {
      setFormConfig((prev) => ({
        ...prev,
        certifications: prev.certifications.map((item) =>
          item.id === id ? { ...item, enabled: !item.enabled } : item
        ),
      }));
    }
  };

  // Reset to initial defaults
  const handleResetDefaults = () => {
    if (!window.confirm("Reset Alliances and Certifications to default values?")) return;
    setFormConfig({
      showAlliances: true,
      alliancesTitle: "Strategic Alliances",
      showCertifications: true,
      certificationsTitle: "Our Certification",
      alliances: INITIAL_ALLIANCES,
      certifications: INITIAL_CERTIFICATIONS,
    });
    showStatus("Reset to default configuration. Click 'Save Changes' to persist.");
  };

  // Save to database
  const handleSaveAll = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      await updateSectionContent("home-alliances", {
        title: "Alliances & Certifications",
        subtitle: "",
        content: {
          showAlliances: formConfig.showAlliances,
          alliancesTitle: formConfig.alliancesTitle,
          showCertifications: formConfig.showCertifications,
          certificationsTitle: formConfig.certificationsTitle,
          alliances: formConfig.alliances,
          certifications: formConfig.certifications,
        },
      });
      showStatus("Alliances and Certifications saved successfully!");
    } catch (err) {
      console.error("Failed to save alliances:", err);
      showStatus("", "Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <Handshake className="text-brand-blue" />
            Manage Alliances & Certifications
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Configure partner logos, accreditation badges, and section visibility on the Homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            title="Reset to original default logos"
          >
            <RotateCcw size={14} /> Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/15 flex items-center gap-2 disabled:bg-gray-400"
          >
            {saving ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={15} /> Save All Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Notifications */}
      {statusMessage.success && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-sm font-medium animate-in fade-in">
          <CheckCircle size={18} className="shrink-0" /> {statusMessage.success}
        </div>
      )}
      {statusMessage.error && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium animate-in fade-in">
          <AlertCircle size={18} className="shrink-0" /> {statusMessage.error}
        </div>
      )}

      {/* 1. Global Section Settings Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 pb-3 border-b border-gray-100">
          <span className="w-3 h-3 rounded-full bg-brand-orange"></span> Section Display & Column Titles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Strategic Alliances Column Settings */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                <Handshake size={18} className="text-brand-blue" />
                Strategic Alliances Column
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formConfig.showAlliances}
                  onChange={(e) => setFormConfig({ ...formConfig, showAlliances: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Column Heading Title
              </label>
              <input
                type="text"
                value={formConfig.alliancesTitle}
                onChange={(e) => setFormConfig({ ...formConfig, alliancesTitle: e.target.value })}
                placeholder="e.g. Strategic Alliances"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue"
              />
            </div>
            <p className="text-xs text-gray-400">
              Active Partners: {formConfig.alliances.filter((a) => a.enabled !== false).length} of{" "}
              {formConfig.alliances.length}
            </p>
          </div>

          {/* Certifications Column Settings */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                <Award size={18} className="text-brand-green" />
                Certifications Column
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formConfig.showCertifications}
                  onChange={(e) => setFormConfig({ ...formConfig, showCertifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-green"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Column Heading Title
              </label>
              <input
                type="text"
                value={formConfig.certificationsTitle}
                onChange={(e) => setFormConfig({ ...formConfig, certificationsTitle: e.target.value })}
                placeholder="e.g. Our Certification"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green"
              />
            </div>
            <p className="text-xs text-gray-400">
              Active Badges: {formConfig.certifications.filter((c) => c.enabled !== false).length} of{" "}
              {formConfig.certifications.length}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Management Tabs: Partners vs Certifications */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("alliances")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
            activeTab === "alliances"
              ? "bg-brand-blue text-white shadow-brand-blue/20"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Handshake size={18} />
          <span>Strategic Partners ({formConfig.alliances.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("certifications")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
            activeTab === "certifications"
              ? "bg-brand-green text-white shadow-brand-green/20"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Award size={18} />
          <span>Certifications ({formConfig.certifications.length})</span>
        </button>
      </div>

      {/* Tab 1: Strategic Alliances */}
      {activeTab === "alliances" && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Alliance Partners Logos</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Brand partners displayed in the carousel slider.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenCreate("alliance")}
              className="px-4 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-brand-blue/20"
            >
              <Plus size={16} /> Add Partner
            </button>
          </div>

          {formConfig.alliances.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Handshake size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No alliance partners added yet.</p>
              <button
                type="button"
                onClick={() => handleOpenCreate("alliance")}
                className="mt-3 text-xs font-bold text-brand-blue hover:underline"
              >
                + Add your first partner
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {formConfig.alliances.map((partner) => {
                const isEnabled = partner.enabled !== false;
                const safeUrl = getSafeMediaUrl(partner.logo, "/assets/placeholder-product.png");

                return (
                  <div
                    key={partner.id}
                    className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      isEnabled
                        ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
                        : "bg-gray-50/70 border-dashed border-gray-300 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isEnabled ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isEnabled ? "Visible" : "Hidden"}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleItemVisibility("alliance", partner.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          title={isEnabled ? "Hide from website" : "Show on website"}
                        >
                          {isEnabled ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit("alliance", partner)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-brand-blue hover:bg-blue-50 transition-colors"
                          title="Edit Partner"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem("alliance", partner.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Partner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Logo Preview Container */}
                    <div className="w-full h-28 bg-gray-50 rounded-xl flex items-center justify-center p-3 mb-3 border border-gray-100">
                      <img
                        src={safeUrl}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.src = "/assets/placeholder-product.png";
                        }}
                      />
                    </div>

                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 text-sm truncate" title={partner.name}>
                        {partner.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5" title={partner.logo}>
                        {partner.logo}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Certifications */}
      {activeTab === "certifications" && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Certification Badges</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                ISO, CE, and accreditation certificates displayed in the slider.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenCreate("certification")}
              className="px-4 py-2.5 bg-brand-green hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20"
            >
              <Plus size={16} /> Add Certification
            </button>
          </div>

          {formConfig.certifications.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Award size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No certifications added yet.</p>
              <button
                type="button"
                onClick={() => handleOpenCreate("certification")}
                className="mt-3 text-xs font-bold text-brand-green hover:underline"
              >
                + Add your first certification
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {formConfig.certifications.map((cert) => {
                const isEnabled = cert.enabled !== false;
                const safeUrl = getSafeMediaUrl(cert.logo, "/assets/placeholder-product.png");

                return (
                  <div
                    key={cert.id}
                    className={`relative rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      isEnabled
                        ? "bg-white border-gray-200 shadow-sm hover:shadow-md"
                        : "bg-gray-50/70 border-dashed border-gray-300 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isEnabled ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {isEnabled ? "Visible" : "Hidden"}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleItemVisibility("certification", cert.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                          title={isEnabled ? "Hide from website" : "Show on website"}
                        >
                          {isEnabled ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit("certification", cert)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-brand-green hover:bg-green-50 transition-colors"
                          title="Edit Certification"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem("certification", cert.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Certification"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Logo Preview Container */}
                    <div className="w-full h-28 bg-gray-50 rounded-xl flex items-center justify-center p-3 mb-3 border border-gray-100">
                      <img
                        src={safeUrl}
                        alt={cert.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.src = "/assets/placeholder-product.png";
                        }}
                      />
                    </div>

                    <div className="text-center">
                      <h4 className="font-bold text-gray-800 text-sm truncate" title={cert.name}>
                        {cert.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5" title={cert.logo}>
                        {cert.logo}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-2xl font-bold text-sm shadow-2xl shadow-brand-blue/30 hover:scale-105 active:scale-95 transition-all disabled:bg-gray-400 disabled:scale-100"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
        </button>
      </div>

      {/* Add / Edit Modal */}
      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-gray-100 relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                {modal.type === "alliance" ? (
                  <Handshake size={20} className="text-brand-blue" />
                ) : (
                  <Award size={20} className="text-brand-green" />
                )}
                {modal.mode === "create" ? "Add New " : "Edit "}
                {modal.type === "alliance" ? "Alliance Partner" : "Certification"}
              </h3>
              <button
                type="button"
                onClick={() => setModal({ ...modal, show: false })}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveModalItem} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  {modal.type === "alliance" ? "Partner Name *" : "Certification Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  placeholder={modal.type === "alliance" ? "e.g. Chainway or Zebra" : "e.g. ISO 9001:2015"}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                    Logo Image URL / Path *
                  </label>
                  {uploading && (
                    <span className="text-[10px] text-brand-orange font-bold flex items-center gap-1 animate-pulse">
                      <Loader2 size={12} className="animate-spin" /> Uploading...
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  value={itemForm.logo}
                  onChange={(e) => setItemForm({ ...itemForm, logo: e.target.value })}
                  placeholder="/assets/alliance/chainway.png or https://..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                />

                {/* File Upload Button */}
                <div className="mt-2.5">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 cursor-pointer transition-colors">
                    <Upload size={14} />
                    <span>Upload New Logo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Logo Preview */}
              {itemForm.logo && (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                  <div className="w-20 h-16 bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
                    <img
                      src={getSafeMediaUrl(itemForm.logo, "/assets/placeholder-product.png")}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = "/assets/placeholder-product.png";
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    <p className="font-semibold text-gray-700">Logo Preview</p>
                    <p className="text-[11px] truncate max-w-[200px]">{itemForm.logo}</p>
                  </div>
                </div>
              )}

              {/* Visibility Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="item-enabled"
                  checked={itemForm.enabled}
                  onChange={(e) => setItemForm({ ...itemForm, enabled: e.target.checked })}
                  className="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                />
                <label htmlFor="item-enabled" className="text-xs font-semibold text-gray-700 select-none cursor-pointer">
                  Display on website (Enabled)
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModal({ ...modal, show: false })}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold transition-all shadow-md shadow-brand-blue/20 disabled:bg-gray-400"
                >
                  {modal.mode === "create" ? "Add Item" : "Update Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
