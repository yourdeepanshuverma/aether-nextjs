"use client";
import { useState, useMemo, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { supabase } from '@/utils/supabase';
import { Plus, Edit, Trash2, X, CheckCircle, AlertCircle, Save, Layers } from 'lucide-react';

export default function ProductsManager() {
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ success: '', error: '' });
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'rfid-hardware' | 'rfid-tags'
  const [search, setSearch] = useState('');
  
  const [productModal, setProductModal] = useState({ show: false, mode: 'create', id: null });
  const [productForm, setProductForm] = useState({
    name: '',
    image: '',
    category: 'rfid-hardware',
    specs: {}
  });

  const { 
    products, 
    addProduct, 
    editProduct, 
    removeProduct,
    loadProducts,
    refreshData 
  } = useContent();

  useEffect(() => {
    loadProducts();
  }, []);

  const uniqueSubcategories = useMemo(() => {
    const types = new Set();
    products.forEach(p => {
      if (p.specs?.type) types.add(p.specs.type);
    });
    // Add default suggestions depending on selected category
    if (productForm.category === 'rfid-hardware') {
      types.add("Handheld Reader");
      types.add("Fixed Reader");
      types.add("Antenna");
    } else {
      types.add("Smart Label / Inlay");
      types.add("ABS/PCB On-Metal");
      types.add("NFC Keychain & Card");
      types.add("Specialty Tag");
    }
    return Array.from(types).sort();
  }, [products, productForm.category]);

  const showStatus = (success = '', error = '') => {
    setStatusMessage({ success, error });
    setTimeout(() => setStatusMessage({ success: '', error: '' }), 4000);
  };

  const handleImageUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      callback(publicUrlData.publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const openProductCreate = () => {
    setProductForm({
      name: '',
      image: '',
      category: 'rfid-hardware',
      specs: {}
    });
    setProductModal({ show: true, mode: 'create', id: null });
  };

  const openProductEdit = (product) => {
    setProductForm({
      name: product.name,
      image: product.image,
      category: product.category,
      specs: product.specs || {}
    });
    setProductModal({ show: true, mode: 'edit', id: product._id });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    try {
      setSaving(true);
      // Clean up empty specifications
      const cleanedSpecs = {};
      Object.entries(productForm.specs).forEach(([key, value]) => {
        if (value && value.toString().trim() !== '') {
          cleanedSpecs[key] = value;
        }
      });

      const submissionData = {
        name: productForm.name,
        image: productForm.image,
        category: productForm.category,
        specs: cleanedSpecs
      };

      if (productModal.mode === 'create') {
        await addProduct(submissionData);
        showStatus("Product added successfully!");
      } else {
        await editProduct(productModal.id, submissionData);
        showStatus("Product updated successfully!");
      }
      setProductModal({ show: false, mode: 'create', id: null });
    } catch (err) {
      const errMsg = err.message || "";
      if (errMsg.includes("unique_name_category") || errMsg.includes("duplicate key")) {
        showStatus("", "A product with this name already exists in this category. Please use a unique name.");
      } else {
        showStatus("", errMsg || "Failed to save product.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleProductDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await removeProduct(id);
        showStatus("Product deleted successfully!");
      } catch (err) {
        showStatus("", "Failed to delete product.");
      }
    }
  };

  // Predefined lists of standard specification fields based on Category
  const hardwareSpecFields = [
    { key: 'description', label: 'Description', placeholder: 'e.g. C72 Hand Held Reader' },
    { key: 'frequency', label: 'Frequency', placeholder: 'e.g. UHF (860-960)' },
    { key: 'polarisation', label: 'Polarisation', placeholder: 'e.g. Circular' },
    { key: 'read_range', label: 'Read Range', placeholder: 'e.g. Long Range upto 10 Meters' },
    { key: 'read_capacity', label: 'Read Capacity', placeholder: 'e.g. 1100 tags/sec' },
    { key: 'application', label: 'Application/Usage', placeholder: 'e.g. Retail, Warehouse management' },
    { key: 'main_features', label: 'Main Features', placeholder: 'e.g. Android based, POE, RS232' },
    { key: 'operating_system', label: 'Operating System', placeholder: 'e.g. Android 11' },
    { key: 'operating_temperature', label: 'Operating Temperature', placeholder: 'e.g. -20C to 55C' },
    { key: 'max_reciever_sensitivity', label: 'Max Receiver Sensitivity', placeholder: 'e.g. 86dBm' },
    { key: 'moq', label: 'MOQ (Min Order Qty)', placeholder: 'e.g. 1' }
  ];

  const tagsSpecFields = [
    { key: 'chip', label: 'Chip Model', placeholder: 'e.g. Impinj M730' },
    { key: 'frequency_band', label: 'Frequency Band', placeholder: 'e.g. UHF (860-960)' },
    { key: 'dimension', label: 'Dimension (W x H)', placeholder: 'e.g. 45 X 18 mm' },
    { key: 'inlay_size', label: 'Inlay Size', placeholder: 'e.g. 40 X 15 mm' },
    { key: 'label_size', label: 'Label Size', placeholder: 'e.g. Customizable' },
    { key: 'epc_memory', label: 'EPC Memory', placeholder: 'e.g. 128 bits TID' },
    { key: 'memory', label: 'User Memory', placeholder: 'e.g. 96-bit' },
    { key: 'application', label: 'Application/Usage', placeholder: 'e.g. Apparel tagging, Windshield' },
    { key: 'printing', label: 'Printing Capability', placeholder: 'e.g. Yes / Customizable' },
    { key: 'encoding', label: 'Encoding Support', placeholder: 'e.g. Yes' },
    { key: 'form_factor', label: 'Form Factor', placeholder: 'e.g. Coin, Wet Inlay, Label' },
    { key: 'personalisation', label: 'Personalization', placeholder: 'e.g. Yes' },
    { key: 'out_body', label: 'Outer Body Material', placeholder: 'e.g. ABS, PCB, PVC' },
    { key: 'fixing_mechanism', label: 'Fixing Mechanism', placeholder: 'e.g. Adhesive, Stitch, Screw' }
  ];

  // Filtering products
  const filteredList = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
        (p.specs?.description || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.specs?.chip || '').toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, filterCategory, search]);

  return (
    <>
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200/60 pb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
            Manage Products
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage database records in real-time</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => { refreshData(); showStatus("Data refreshed from database."); }} 
            className="px-4 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Refresh Data
          </button>
          <button 
            onClick={openProductCreate}
            className="px-4 py-2 bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-md shadow-brand-orange/15"
          >
            <Plus size={14} /> Add Product
          </button>
        </div>
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

      {/* Search & Category Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products by name or spec..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/10 focus:border-brand-blue transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'rfid-hardware', 'rfid-tags'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all capitalize border ${
                filterCategory === cat 
                  ? 'bg-brand-blue border-brand-blue text-white shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat.replace('rfid-', 'RFID ')}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredList.map((product) => (
          <div key={product._id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 bg-gray-50 flex items-center justify-center p-4">
                <img 
                  src={product.image || "/assets/placeholder-product.png"} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3 ${
                product.category === 'rfid-hardware' 
                  ? 'text-brand-orange bg-brand-orange/10' 
                  : 'text-brand-blue bg-brand-blue/10'
              }`}>
                {product.category === 'rfid-hardware' ? 'RFID Hardware' : 'RFID Tags'}
              </span>
              <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1">{product.name}</h3>
              
              {/* Short Specs list preview */}
              <div className="mt-3 space-y-1 text-xs text-gray-500 border-t border-gray-50 pt-3">
                {product.specs?.description && <p><span className="font-semibold text-gray-700">Desc:</span> {product.specs.description}</p>}
                {product.specs?.chip && <p><span className="font-semibold text-gray-700">Chip:</span> {product.specs.chip}</p>}
                {product.specs?.frequency || product.specs?.frequency_band ? (
                  <p><span className="font-semibold text-gray-700">Freq:</span> {product.specs.frequency || product.specs.frequency_band}</p>
                ) : null}
                {product.specs?.dimension && <p><span className="font-semibold text-gray-700">Size:</span> {product.specs.dimension}</p>}
                {product.specs?.read_range && <p><span className="font-semibold text-gray-700">Range:</span> {product.specs.read_range}</p>}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
              <span className="text-[9px] text-gray-400 font-medium">Specs: {Object.keys(product.specs || {}).length} variables</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openProductEdit(product)} 
                  className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all"
                  title="Edit Product"
                >
                  <Edit size={14} />
                </button>
                <button 
                  onClick={() => handleProductDelete(product._id)} 
                  className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                  title="Delete Product"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredList.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-gray-100 text-gray-400 font-medium">
            No products found in database matching your filter.
          </div>
        )}
      </div>

      {/* MODAL: ADD/EDIT PRODUCT */}
      {productModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                {productModal.mode === 'create' ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button 
                onClick={() => setProductModal({ show: false, mode: 'create', id: null })} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. C72-Reader"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                  required
                />
              </div>

              {/* Product Category & Sub-Category Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Category Type</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ 
                      ...productForm, 
                      category: e.target.value, 
                      specs: { type: e.target.value === 'rfid-hardware' ? 'Handheld Reader' : 'Smart Label / Inlay' } 
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="rfid-hardware">RFID Hardware</option>
                    <option value="rfid-tags">RFID Tags</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Sub-Category Type</label>
                  <input
                    type="text"
                    list="subcategories-list"
                    value={productForm.specs.type || ''}
                    onChange={(e) => setProductForm({ ...productForm, specs: { ...productForm.specs, type: e.target.value } })}
                    placeholder="Select or type a subcategory..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                    required
                  />
                  <datalist id="subcategories-list">
                    {uniqueSubcategories.map(cat => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Product Image URL & Upload */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Product Image URL</label>
                  {uploading && <span className="text-[10px] text-brand-orange animate-pulse font-bold">Uploading...</span>}
                </div>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="e.g. /assets/RFID products/...png"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                />
                <div className="mt-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => handleImageUpload(e, (url) => setProductForm({ ...productForm, image: url }))}
                    className="text-xs text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-blue/10 file:text-brand-blue hover:file:bg-brand-blue/20 cursor-pointer disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Dynamic Specifications Editor */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-xs font-bold text-gray-700 uppercase mb-4 flex items-center gap-2">
                  <Layers size={14} className="text-brand-blue" /> 
                  Product Specifications ({productForm.category === 'rfid-hardware' ? 'RFID Hardware Specs' : 'RFID Tags Specs'})
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-2 bg-gray-50 rounded-2xl border border-gray-100">
                  {/* Render Hardware inputs */}
                  {productForm.category === 'rfid-hardware' && hardwareSpecFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1 capitalize">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={productForm.specs[field.key] || ''}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs, [field.key]: e.target.value }
                        })}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-gray-200 focus:outline-none"
                      />
                    </div>
                  ))}

                  {/* Render Tags inputs */}
                  {productForm.category === 'rfid-tags' && tagsSpecFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1 capitalize">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={productForm.specs[field.key] || ''}
                        onChange={(e) => setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs, [field.key]: e.target.value }
                        })}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-gray-200 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setProductModal({ show: false, mode: 'create', id: null })}
                  className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={uploading || saving}
                  className="px-6 py-3 bg-brand-orange text-white rounded-xl text-sm font-bold hover:bg-brand-orange/90 shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : (productModal.mode === 'create' ? 'Publish Product' : 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
