"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [siteContent, setSiteContent] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [team, setTeam] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [adminToken, setAdminToken] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  // Load token on client-side mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setAdminToken(token);
      }
    }
  }, []);

  // Fetch initial public data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [contentData, blogsData, teamData, productsData] = await Promise.all([
        api.getContent().catch(err => { console.warn("Backend not running. Content fallback active."); return {}; }),
        api.getBlogs().catch(err => []),
        api.getTeam().catch(err => []),
        api.getProducts().catch(err => [])
      ]);
      
      setSiteContent(contentData);
      setBlogs(blogsData);
      setTeam(teamData);
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to load dynamic content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch admin profile if token exists
  useEffect(() => {
    const verifyToken = async () => {
      if (adminToken) {
        try {
          const profile = await api.getProfile(adminToken);
          setAdminUser(profile);
          // Load contacts once admin is authenticated
          loadContacts();
        } catch (error) {
          console.error('Token verification failed, logging out:', error);
          logoutAdmin();
        }
      }
    };
    verifyToken();
  }, [adminToken]);

  // Admin Actions
  const loginAdmin = async (username, password) => {
    try {
      const data = await api.login(username, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', data.token);
      }
      setAdminToken(data.token);
      setAdminUser({ username: data.username });
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logoutAdmin = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
    setAdminToken(null);
    setAdminUser(null);
    setContacts([]);
  };

  // Content Editors
  const updateSectionContent = async (key, data) => {
    if (!adminToken) return false;
    try {
      const updated = await api.updateContent(key, data, adminToken);
      setSiteContent(prev => ({
        ...prev,
        [key]: {
          title: updated.title,
          subtitle: updated.subtitle,
          content: updated.content
        }
      }));
      return true;
    } catch (error) {
      console.error(`Failed to update section ${key}:`, error);
      throw error;
    }
  };

  // Blog Managers
  const addBlog = async (blogData) => {
    if (!adminToken) return false;
    try {
      const newBlog = await api.createBlog(blogData, adminToken);
      setBlogs(prev => [newBlog, ...prev]);
      return newBlog;
    } catch (error) {
      console.error('Failed to create blog:', error);
      throw error;
    }
  };

  const editBlog = async (id, blogData) => {
    if (!adminToken) return false;
    try {
      const updatedBlog = await api.updateBlog(id, blogData, adminToken);
      setBlogs(prev => prev.map(blog => blog._id === id ? updatedBlog : blog));
      return updatedBlog;
    } catch (error) {
      console.error('Failed to update blog:', error);
      throw error;
    }
  };

  const removeBlog = async (id) => {
    if (!adminToken) return false;
    try {
      await api.deleteBlog(id, adminToken);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
      return true;
    } catch (error) {
      console.error('Failed to delete blog:', error);
      throw error;
    }
  };

  // Team Managers
  const addTeamMember = async (memberData) => {
    if (!adminToken) return false;
    try {
      const newMember = await api.createTeamMember(memberData, adminToken);
      setTeam(prev => [...prev, newMember]);
      return newMember;
    } catch (error) {
      console.error('Failed to add team member:', error);
      throw error;
    }
  };

  const editTeamMember = async (id, memberData) => {
    if (!adminToken) return false;
    try {
      const updatedMember = await api.updateTeamMember(id, memberData, adminToken);
      setTeam(prev => prev.map(m => m._id === id ? updatedMember : m));
      return updatedMember;
    } catch (error) {
      console.error('Failed to update team member:', error);
      throw error;
    }
  };

  const removeTeamMember = async (id) => {
    if (!adminToken) return false;
    try {
      await api.deleteTeamMember(id, adminToken);
      setTeam(prev => prev.filter(m => m._id !== id));
      return true;
    } catch (error) {
      console.error('Failed to delete team member:', error);
      throw error;
    }
  };

  // Contacts
  const loadContacts = async () => {
    if (!adminToken) return;
    try {
      const submissions = await api.getContacts(adminToken);
      setContacts(submissions);
    } catch (error) {
      console.error('Failed to load contact submissions:', error);
    }
  };

  const submitContactForm = async (contactData) => {
    try {
      return await api.submitContact(contactData);
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  };

  const removeContact = async (id) => {
    if (!adminToken) return false;
    try {
      await api.deleteContact(id, adminToken);
      setContacts(prev => prev.filter(c => c._id !== id));
      return true;
    } catch (error) {
      console.error('Failed to delete contact submission:', error);
      throw error;
    }
  };

  // Products Managers
  const addProduct = async (productData) => {
    if (!adminToken) return false;
    try {
      const newProduct = await api.createProduct(productData, adminToken);
      setProducts(prev => [newProduct, ...prev]);
      return newProduct;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  };

  const editProduct = async (id, productData) => {
    if (!adminToken) return false;
    try {
      const updatedProduct = await api.updateProduct(id, productData, adminToken);
      setProducts(prev => prev.map(p => p._id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      throw error;
    }
  };

  const removeProduct = async (id) => {
    if (!adminToken) return false;
    try {
      await api.deleteProduct(id, adminToken);
      setProducts(prev => prev.filter(p => p._id !== id));
      return true;
    } catch (error) {
      console.error('Failed to delete product:', error);
      throw error;
    }
  };

  // Dynamic Content Retrieval Helper with defaults
  const getContent = (key, defaults = {}) => {
    const dbValue = siteContent[key];
    if (!dbValue) {
      return {
        title: defaults.title || '',
        subtitle: defaults.subtitle || '',
        ...defaults.content
      };
    }
    return {
      title: dbValue.title,
      subtitle: dbValue.subtitle,
      ...(dbValue.content || {})
    };
  };

  return (
    <ContentContext.Provider
      value={{
        siteContent,
        blogs,
        team,
        contacts,
        products,
        loading,
        adminUser,
        adminToken,
        loginAdmin,
        logoutAdmin,
        updateSectionContent,
        addBlog,
        editBlog,
        removeBlog,
        addTeamMember,
        editTeamMember,
        removeTeamMember,
        submitContactForm,
        removeContact,
        addProduct,
        editProduct,
        removeProduct,
        getContent,
        refreshData: fetchData
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
