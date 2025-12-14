import axios from 'axios';

const swapDevTunnelHost = (hostname) => {
  const match = hostname.match(/-(\d+)\./);
  if (!match) {
    return hostname;
  }
  const numeric = Number.parseInt(match[1], 10);
  if (Number.isNaN(numeric) || numeric <= 0) {
    return hostname;
  }
  const target = Math.max(1, numeric - 1);
  return hostname.replace(`-${match[1]}.`, `-${target}.`);
};

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    try {
      const url = new URL(window.location.href);
      if (url.port) {
        const numericPort = Number.parseInt(url.port, 10);
        if (!Number.isNaN(numericPort) && numericPort > 0) {
          url.port = String(Math.max(1, numericPort - 1));
          return url.origin;
        }
      } else {
        const swappedHost = swapDevTunnelHost(url.hostname);
        if (swappedHost !== url.hostname) {
          return `${url.protocol}//${swappedHost}`;
        }
        return url.origin;
      }
    } catch {
      /* noop */
    }
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

export const buildAssetUrl = (path = '') => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
};

const makeRequest = async (method, url, data, adminKey) => {
  try {
    const response = await apiClient.request({
      method,
      url,
      data,
      headers: {
        'x-admin-key': adminKey
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('edu-admin-key');
    }
    const message = error.response?.data?.message || 'Request failed. Please try again.';
    throw new Error(message);
  }
};

export const getRecords = (collection, adminKey) => makeRequest('get', `/admin/${collection}`, null, adminKey);
export const createRecord = (collection, payload, adminKey) => makeRequest('post', `/admin/${collection}`, payload, adminKey);
export const updateRecord = (collection, id, payload, adminKey) =>
  makeRequest('put', `/admin/${collection}/${id}`, payload, adminKey);
export const deleteRecord = (collection, id, adminKey) => makeRequest('delete', `/admin/${collection}/${id}`, null, adminKey);

export const uploadProgramImage = async (file, adminKey) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const { data } = await apiClient.post('/admin/programs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-admin-key': adminKey
      }
    });
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('edu-admin-key');
    }
    const message = error.response?.data?.message || 'Image upload failed.';
    throw new Error(message);
  }
};

export const uploadHomeImage = async (file, adminKey) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const { data } = await apiClient.post('/admin/home/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-admin-key': adminKey
      }
    });
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('edu-admin-key');
    }
    const message = error.response?.data?.message || 'Image upload failed.';
    throw new Error(message);
  }
};
