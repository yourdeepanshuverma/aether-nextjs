const API_BASE_URL = '/api';

const request = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  // Auth
  login: (username, password) => 
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
    
  getProfile: (token) => 
    request('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Page Content
  getContent: () => 
    request('/content'),
    
  updateContent: (key, data, token) => 
    request(`/content/${key}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    }),

  // Blogs
  getBlogs: () => 
    request('/blogs'),
    
  getBlogById: (id) => 
    request(`/blogs/${id}`),
    
  createBlog: (blogData, token) => 
    request('/blogs', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(blogData)
    }),
    
  updateBlog: (id, blogData, token) => 
    request(`/blogs/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(blogData)
    }),
    
  deleteBlog: (id, token) => 
    request(`/blogs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Team Members
  getTeam: () => 
    request('/team'),
    
  createTeamMember: (memberData, token) => 
    request('/team', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(memberData)
    }),
    
  updateTeamMember: (id, memberData, token) => 
    request(`/team/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(memberData)
    }),
    
  deleteTeamMember: (id, token) => 
    request(`/team/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Contacts
  submitContact: (contactData) => 
    request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData)
    }),
    
  getContacts: (token) => 
    request('/contacts', {
      headers: { Authorization: `Bearer ${token}` }
    }),
    
  deleteContact: (id, token) => 
    request(`/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
};
