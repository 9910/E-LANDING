import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getResourceByKey } from '../config/resources';
import { buildAssetUrl, createRecord, getRecords, updateRecord } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const buildInitialState = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

const ResourceFormPage = ({ adminKey, uploadHandlers, onLogout }) => {
  const { resourceKey, entryId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const resource = getResourceByKey(resourceKey);
  const isEdit = Boolean(entryId);
  const initialFormState = useMemo(() => (resource ? buildInitialState(resource.fields) : {}), [resource]);
  const [formData, setFormData] = useState(initialFormState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!resource) return;
    const loadEntry = async () => {
      if (!isEdit) {
        setFormData(initialFormState);
        return;
      }
      if (state?.entry) {
        setFormData((prev) => ({ ...prev, ...state.entry }));
        return;
      }
      try {
        const data = await getRecords(resource.resourceKey, adminKey);
        const match = data.find((item) => item._id === entryId);
        if (match) {
          setFormData((prev) => ({ ...prev, ...match }));
        }
      } catch (err) {
        setError(err.message);
      }
    };
    loadEntry();
  }, [resource, entryId, isEdit, state, initialFormState, adminKey]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (event, field, resourceUploadHandlers) => {
    const file = event.target.files?.[0];
    const uploader = resourceUploadHandlers[field.name];
    if (!file || !uploader) {
      return;
    }
    try {
      const { path } = await uploader(file, adminKey);
      setFormData((prev) => ({ ...prev, [field.name]: path }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (isEdit) {
        await updateRecord(resource.resourceKey, entryId, formData, adminKey);
      } else {
        await createRecord(resource.resourceKey, formData, adminKey);
      }
      navigate(`/resource/${resource.resourceKey}/display`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!resource) {
    return (
      <AdminLayout onLogout={onLogout}>
        <p className="resource__hint">Unknown resource.</p>
      </AdminLayout>
    );
  }

  const resourceUploadHandlers = uploadHandlers[resource.resourceKey] || {};

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="resource-page">
        <div className="resource-page__inner">
          <div className="resource-page__header">
            <h2>{isEdit ? `Edit ${resource.label}` : `Add ${resource.label}`}</h2>
            <button type="button" className="btn btn--ghost" onClick={() => navigate(`/resource/${resource.resourceKey}/display`)}>
              Back to {resource.label}
            </button>
          </div>

          {error && <p className="form-status form-status--error">{error}</p>}

          <form className="resource__form" onSubmit={handleSubmit}>
            {resource.fields.map((field) => (
              <label key={field.name} className={`resource__field ${field.type === 'file' ? 'resource__field--file' : ''}`}>
                {field.type !== 'file' && (
                  <span>
                    {field.label}
                    {field.required ? '*' : ''}
                  </span>
                )}
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    rows="3"
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                ) : field.type === 'file' ? (
                  <>
                    {formData[field.name] && (
                      <div className="resource__image-preview">
                        <img src={buildAssetUrl(formData[field.name])} alt={`${field.label} preview`} />
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(event) => handleFileUpload(event, field, resourceUploadHandlers)} />
                  </>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </label>
            ))}

            <div className="resource__actions">
              <button type="submit" className="btn btn--primary" disabled={saving}>
                {saving ? 'Saving...' : isEdit ? 'Update Entry' : 'Create Entry'}
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => navigate(`/resource/${resource.resourceKey}/display`)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ResourceFormPage;
