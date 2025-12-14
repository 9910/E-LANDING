import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getResourceByKey } from '../config/resources';
import { deleteRecord, getRecords, buildAssetUrl } from '../services/api';
import ResourceManager from '../components/resources/ResourceManager';
import AdminLayout from '../components/AdminLayout';

const filterConfig = [
  { name: 'search', label: 'Filter by name', type: 'text', placeholder: 'Search' },
  { name: 'from', label: 'Updated from', type: 'date' },
  { name: 'to', label: 'Updated to', type: 'date' },
  { name: 'start', label: 'Start #', type: 'number', inputProps: { min: 1 } },
  { name: 'end', label: 'End #', type: 'number', inputProps: { min: 1 } }
];

const ResourceDisplayPage = ({ adminKey, onLogout }) => {
  const { resourceKey } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editIntent = location.state?.focus === 'edit';
  const resource = getResourceByKey(resourceKey);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ search: '', start: 1, end: '', from: '', to: '' });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!resource) return;
    const loadItems = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getRecords(resource.resourceKey, adminKey);
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, [resourceKey, resource, adminKey]);

  const searchableFields = useMemo(() => {
    if (!resource?.fields) {
      return [];
    }
    return resource.fields
      .filter((field) => field.type !== 'file' && field.type !== 'file-multi')
      .map((field) => field.name);
  }, [resource]);

  const filteredItems = useMemo(() => {
    let data = [...items];
    if (filters.search.trim()) {
      const term = filters.search.trim().toLowerCase();
      data = data.filter((item) => searchableFields.some((field) => String(item[field] || '').toLowerCase().includes(term)));
    }
    if (filters.from) {
      const fromDate = new Date(filters.from);
      data = data.filter((item) => new Date(item.updatedAt || item.createdAt) >= fromDate);
    }
    if (filters.to) {
      const toDate = new Date(filters.to);
      data = data.filter((item) => new Date(item.updatedAt || item.createdAt) <= toDate);
    }
    const startIndex = Number.parseInt(filters.start, 10);
    const endIndex = Number.parseInt(filters.end, 10);
    const hasStart = !Number.isNaN(startIndex) && startIndex > 0;
    const hasEnd = !Number.isNaN(endIndex) && endIndex > 0;
    if (hasStart || hasEnd) {
      const startPos = hasStart ? startIndex - 1 : 0;
      const endPos = hasEnd ? endIndex : data.length;
      data = data.slice(startPos, endPos);
    }
    return data;
  }, [items, filters, searchableFields]);

  const ITEMS_PER_PAGE = 10;
  const paginatedItems = useMemo(() => {
    const page = Math.max(1, currentPage);
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredItems.slice(start, end);
  }, [filteredItems, currentPage]);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const EMPTY_PLACEHOLDER = '\u2014';

  const renderFieldValue = (field, itemRecord) => {
    const value = itemRecord[field.name];
    if (field.type === 'file') {
      if (value) {
        return (
          <div className="resource-card__thumbnail">
            <img src={buildAssetUrl(value)} alt={`${field.label}`} />
          </div>
        );
      }
      return <span>{EMPTY_PLACEHOLDER}</span>;
    }
    if (field.type === 'file-multi') {
      if (Array.isArray(value) && value.length > 0) {
        return (
          <div className="resource-card__gallery">
            {value.map((path, idx) => (
              <div key={`${path}-${idx}`} className="resource-card__thumbnail resource-card__thumbnail--small">
                <img src={buildAssetUrl(path)} alt={`${field.label} ${idx + 1}`} />
              </div>
            ))}
          </div>
        );
      }
      return <span>{EMPTY_PLACEHOLDER}</span>;
    }
    return <span>{value || EMPTY_PLACEHOLDER}</span>;
  };

  const handleDelete = async (id) => {
    const canPrompt = typeof globalThis !== 'undefined' && typeof globalThis.confirm === 'function';
    if (!canPrompt || !globalThis.confirm('Delete this entry?')) return;
    try {
      await deleteRecord(resource.resourceKey, id, adminKey);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!resource) {
    return (
      <AdminLayout onLogout={onLogout}>
        <p className="resource__hint">Unknown resource.</p>
      </AdminLayout>
    );
  }

  const renderResourceList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (paginatedItems.length === 0) {
      return <p>No entries matched the filters.</p>;
    }
    return paginatedItems.map((item) => (
      <article key={item._id} className="resource-card">
        <div>
          {resource.fields.map((field) => (
            <div key={field.name} className={`resource-card__row ${field.type === 'file' ? 'resource-card__row--media' : ''}`}>
              <strong>{field.label}:</strong>
              {renderFieldValue(field, item)}
            </div>
          ))}
          <p className="resource-card__meta">Last updated: <span>{new Date(item.updatedAt || item.createdAt).toLocaleString()}</span></p>
        </div>
        <div className="resource-card__actions">
          <button type="button" className="btn btn--ghost" onClick={() => navigate(`/resource/${resource.resourceKey}/edit/${item._id}`, { state: { entry: item } })}>
            Edit
          </button>
          <button type="button" className="btn btn--secondary" onClick={() => handleDelete(item._id)}>
            Delete
          </button>
        </div>
      </article>
    ));
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="resource-page">
        <div className="resource-page__inner">
          <div className="resource-page__header">
            <ResourceManager {...resource} />
            <button type="button" className="btn btn--ghost" onClick={() => navigate('/')}>Back to dashboard</button>
          </div>

          {error && <p className="form-status form-status--error">{error}</p>}
          {editIntent && <p className="resource__hint">Select an entry below and use Edit to update it.</p>}

          <div className="resource__filters">
            {filterConfig.map(({ name, label, type, placeholder, inputProps }) => (
              <label key={name}>
                <span>{label}</span>
                <input
                  type={type}
                  name={name}
                  value={filters[name] ?? ''}
                  onChange={handleFilterChange}
                  placeholder={placeholder}
                  {...(inputProps || {})}
                />
              </label>
            ))}
          </div>

          <div className="resource__list">
            {renderResourceList()}
          </div>

          <div className="resource-modal__pagination">
            <button type="button" className="btn btn--ghost" disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}>
              Prev
            </button>
            <button type="button" className="btn btn--primary" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}>
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

ResourceDisplayPage.propTypes = {
  adminKey: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default ResourceDisplayPage;
