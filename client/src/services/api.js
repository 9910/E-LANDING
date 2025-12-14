import axios from 'axios';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location) {
    const { protocol, hostname, port, origin } = window.location;

    // Default to backend port when developing locally (avoids hitting the Vite dev server).
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      const apiPort = 5000;
      const portSuffix = apiPort === 80 ? '' : `:${apiPort}`;
      return `${protocol}//${hostname}${portSuffix}`;
    }

    return origin;
  }
  return 'http://localhost:5000';
};

const API_BASE_URL = getBaseUrl();

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleRequest = async (promise) => {
  try {
    const { data } = await promise;
    return data;
  } catch (error) {
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    throw new Error(message);
  }
};

export const buildAssetUrl = (path = '') => {
  if (!path) {
    return '';
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
};

export const submitLead = (leadData) => handleRequest(apiClient.post('/leads', leadData));
export const getBlogs = () => handleRequest(apiClient.get('/blogs'));
export const getBlogById = (id) => handleRequest(apiClient.get(`/blogs/${id}`));
export const getPrograms = (params = {}) => handleRequest(apiClient.get('/content/programs', { params }));
export const getProgramById = (id) => handleRequest(apiClient.get(`/content/programs/${id}`));
export const getHighlights = () => handleRequest(apiClient.get('/content/highlights'));
export const getTestimonials = () => handleRequest(apiClient.get('/content/testimonials'));
export const getHomeContent = () => handleRequest(apiClient.get('/content/home'));
export const getHomeVideo = () => handleRequest(apiClient.get('/content/home-video'));
