import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResourceByKey } from '../config/resources';
import { deleteRecord, getRecords, buildAssetUrl } from '../services/api';
import ResourceManager from '../components/resources/ResourceManager';
import AdminLayout from '../components/AdminLayout';

const ResourceDisplayPage = ({ adminKey, onLogout }) => {
  const { resourceKey } = useParams();
  const navigate = useNavigate();
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

  const searchableFields = useMemo(() => resource?.fields.filter((field) => field.type !== 'file').map((field) => field.name) || [], [resource]);

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

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this entry?')) return;
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

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="resource-page">
        <div className="resource-page__inner">
          <div className="resource-page__header">
            <ResourceManager {...resource} />
            <button type="button" className="btn btn--ghost" onClick={() => navigate('/')}>Back to dashboard</button>
          </div>

          {error && <p className="form-status form-status--error">{error}</p>}

          <div className="resource__filters">
            <label>
              <span>Filter by name</span>
              <input name="search" value={filters.search} onChange={handleFilterChange} placeholder="Search" />
            </label>
            <label>
              <span>Updated from</span>
              <input type="date" name="from" value={filters.from} onChange={handleFilterChange} />
            </label>
            <label>
              <span>Updated to</span>
              <input type="date" name="to" value={filters.to} onChange={handleFilterChange} />
            </label>
            <label>
              <span>Start #</span>
              <input type="number" min="1" name="start" value={filters.start} onChange={handleFilterChange} />
            </label>
            <label>
              <span>End #</span>
              <input type="number" min="1" name="end" value={filters.end} onChange={handleFilterChange} />
            </label>
          </div>

          <div className="resource__list">
            {loading ? (
              <p>Loading...</p>
            ) : paginatedItems.length === 0 ? (
              <p>No entries matched the filters.</p>
            ) : (
              paginatedItems.map((item) => (
                <article key={item._id} className="resource-card">
                  <div>
                    {resource.fields.map((field) => (
                      <div key={field.name} className={`resource-card__row ${field.type === 'file' ? 'resource-card__row--media' : ''}`}>
                        <strong>{field.label}:</strong>
                        {field.type === 'file' ? (
                          item[field.name] ? (
                            <div className="resource-card__thumbnail">
                              <img src={buildAssetUrl(item[field.name])} alt={`${field.label}`} />
                            </div>
                          ) : (
                            <span>—</span>
                          )
                        ) : (
                          <span>{item[field.name] || '—'}</span>
                        )}
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
              ))
            )}
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

export default ResourceDisplayPage;
