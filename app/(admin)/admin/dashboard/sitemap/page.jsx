"use client";
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  FileCode, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink, 
  Code, 
  List, 
  Plus, 
  Trash2, 
  Globe 
} from 'lucide-react';

export default function SitemapEditor() {
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editorMode, setEditorMode] = useState('raw'); // 'raw' or 'visual'

  const { getContent, updateSectionContent, siteContent } = useContent();

  const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aetherrfid.com/</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/about/company-overview</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/about/team</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/about/career</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/technologies/rfid</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/technologies/iot</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/technologies/barcodes</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/rfid/hardware</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/rfid/tags</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/iot/data-loggers</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/iot/gps-gnss</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/iot/lorawan-sensors</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/software/retail-automation</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/software/assets-tracking</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/software/warehouse-management</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/software/facility-management</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/products/software/factory-automation</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/industries/retail</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/industries/manufacturing</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/industries/logistics</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/industries/ecommerce-quickcommerce</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/industries/renewable-energy</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/blogs</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/case-studies</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://aetherrfid.com/contact</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  const sitemapDefaults = getContent("sitemap-xml", { content: { xml: defaultXml } });
  const [xmlContent, setXmlContent] = useState(defaultXml);
  const [urlList, setUrlList] = useState([]);

  const showStatus = (success = '', error = '') => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: '', error: '' }), 4000);
  };

  useEffect(() => {
    const activeXml = sitemapDefaults?.content?.xml || defaultXml;
    setXmlContent(activeXml);
    parseXmlToUrlList(activeXml);
  }, [siteContent]);

  // Convert XML string to URL objects array
  const parseXmlToUrlList = (xmlStr) => {
    try {
      const urlRegex = /<url>[\s\S]*?<loc>(.*?)<\/loc>(?:[\s\S]*?<lastmod>(.*?)<\/lastmod>)?(?:[\s\S]*?<changefreq>(.*?)<\/changefreq>)?(?:[\s\S]*?<priority>(.*?)<\/priority>)?[\s\S]*?<\/url>/gi;
      const urls = [];
      let match;
      while ((match = urlRegex.exec(xmlStr)) !== null) {
        urls.push({
          loc: match[1] || '',
          lastmod: match[2] || new Date().toISOString().split('T')[0],
          changefreq: match[3] || 'weekly',
          priority: match[4] || '0.8'
        });
      }
      if (urls.length > 0) setUrlList(urls);
    } catch (e) {
      console.warn("Could not parse XML to visual URL list:", e);
    }
  };

  // Convert URL objects array back to XML string
  const rebuildXmlFromUrlList = (urls) => {
    const formattedUrls = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq || 'weekly'}</changefreq>
    <priority>${u.priority || '0.8'}</priority>
  </url>`).join('\n');

    const generatedXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${formattedUrls}
</urlset>`;
    setXmlContent(generatedXml);
  };

  const handleUrlChange = (index, field, value) => {
    const updated = [...urlList];
    updated[index][field] = value;
    setUrlList(updated);
    rebuildXmlFromUrlList(updated);
  };

  const addNewUrl = () => {
    const today = new Date().toISOString().split('T')[0];
    const updated = [...urlList, { loc: 'https://aetherrfid.com/new-page', lastmod: today, changefreq: 'weekly', priority: '0.8' }];
    setUrlList(updated);
    rebuildXmlFromUrlList(updated);
  };

  const removeUrl = (index) => {
    const updated = urlList.filter((_, i) => i !== index);
    setUrlList(updated);
    rebuildXmlFromUrlList(updated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // 1. Save to physical public/sitemap.xml via API
      await fetch('/api/sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xml: xmlContent })
      });

      // 2. Save to database / content context
      await updateSectionContent("sitemap-xml", {
        title: "Sitemap XML",
        subtitle: "Website Sitemap configuration",
        content: {
          xml: xmlContent
        }
      });

      setIsSaving(false);
      setSaveSuccess(true);
      showStatus("Sitemap updated successfully!");
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error("Save error:", err);
      setIsSaving(false);
      showStatus("", "Failed to save Sitemap XML.");
    }
  };

  const lineCount = xmlContent.split('\n').length;

  return (
    <>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-200/60 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <FileCode className="text-brand-orange" size={28} /> Manage Sitemap
          </h1>
          <p className="text-gray-500 text-sm mt-1">View, edit, and configure your website's sitemap.xml file</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a 
            href="/sitemap.xml" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
          >
            <Globe size={14} className="text-brand-blue" />
            <span>View Live Sitemap.xml</span>
            <ExternalLink size={12} />
          </a>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
          >
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            <span>{copied ? "Copied XML!" : "Copy XML"}</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm("Regenerate default sitemap XML with all static pages?")) {
                setXmlContent(defaultXml);
                parseXmlToUrlList(defaultXml);
                showStatus("Sitemap reset to default structure.");
              }
            }}
            className="px-4 py-2 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
          >
            <RefreshCw size={14} />
            <span>Reset Default Sitemap</span>
          </button>
        </div>
      </div>

      {/* Editor Mode Selector */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200/60">
            <button
              onClick={() => setEditorMode('raw')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                editorMode === 'raw' 
                  ? 'bg-brand-blue text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code size={14} /> Code Editor (Raw XML)
            </button>
            <button
              onClick={() => setEditorMode('visual')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                editorMode === 'visual' 
                  ? 'bg-brand-blue text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List size={14} /> Visual URL List ({urlList.length} URLs)
            </button>
          </div>

          <div className="text-xs text-gray-500 font-semibold">
            {editorMode === 'raw' ? `${lineCount} Lines in XML` : `${urlList.length} Indexed Pages`}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* RAW XML CODE EDITOR MODE */}
          {editorMode === 'raw' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span>Sitemap XML Source Code</span>
                <span className="text-[10px] text-gray-400 font-normal">Standard sitemaps.org format</span>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-[#0f172a] shadow-inner">
                <textarea
                  rows="22"
                  value={xmlContent}
                  onChange={(e) => {
                    setXmlContent(e.target.value);
                    parseXmlToUrlList(e.target.value);
                  }}
                  spellCheck="false"
                  className="w-full p-5 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none resize-y"
                  placeholder="Paste or write sitemap XML code here..."
                ></textarea>
              </div>
            </div>
          )}

          {/* VISUAL URL LIST EDITOR MODE */}
          {editorMode === 'visual' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Sitemap URLs</h3>
                <button
                  type="button"
                  onClick={addNewUrl}
                  className="px-3 py-1.5 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Plus size={14} /> Add New Page URL
                </button>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {urlList.map((urlObj, idx) => (
                  <div key={idx} className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200/80 grid grid-cols-1 md:grid-cols-12 gap-3 items-center relative group hover:border-gray-300 transition-all">
                    <div className="md:col-span-6">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Page URL (Loc)</label>
                      <input
                        type="text"
                        value={urlObj.loc}
                        onChange={(e) => handleUrlChange(idx, 'loc', e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs text-gray-800 font-mono focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Last Modified</label>
                      <input
                        type="date"
                        value={urlObj.lastmod || ''}
                        onChange={(e) => handleUrlChange(idx, 'lastmod', e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Change Frequency</label>
                      <select
                        value={urlObj.changefreq || 'weekly'}
                        onChange={(e) => handleUrlChange(idx, 'changefreq', e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs text-gray-700 focus:outline-none cursor-pointer"
                      >
                        <option value="always">always</option>
                        <option value="hourly">hourly</option>
                        <option value="daily">daily</option>
                        <option value="weekly">weekly</option>
                        <option value="monthly">monthly</option>
                        <option value="yearly">yearly</option>
                        <option value="never">never</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Priority</label>
                      <input
                        type="text"
                        value={urlObj.priority || '0.8'}
                        onChange={(e) => handleUrlChange(idx, 'priority', e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 text-xs text-gray-800 text-center font-bold focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => removeUrl(idx)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete URL entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-6">
            <span className="text-xs text-gray-400 font-medium">
              Sitemap changes apply directly to search engine crawlers.
            </span>

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
                  <span>Saving Sitemap XML...</span>
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle size={18} />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Save Sitemap XML</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Floating Toast Notification */}
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
