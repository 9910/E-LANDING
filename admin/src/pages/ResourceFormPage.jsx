import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getResourceByKey } from '../config/resources';
import { buildAssetUrl, createRecord, getRecords, updateRecord } from '../services/api';
import AdminLayout from '../components/AdminLayout';

const buildInitialState = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'file-multi' ? [] : '';
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

  const hydrateRecord = (record) => {
    if (!record) return record;
    if (resource?.hydrateFormData) {
      return resource.hydrateFormData(record);
    }
    return record;
  };

  useEffect(() => {
    if (!resource) return;
    const loadEntry = async () => {
      if (!isEdit) {
        setFormData(initialFormState);
        return;
      }
      if (state?.entry) {
        setFormData((prev) => ({ ...prev, ...hydrateRecord(state.entry) }));
        return;
      }
      try {
        const data = await getRecords(resource.resourceKey, adminKey);
        const match = data.find((item) => item._id === entryId);
        if (match) {
          setFormData((prev) => ({ ...prev, ...hydrateRecord(match) }));
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
    const inputEl = event.target;
    const file = inputEl.files?.[0];
    const uploader = resourceUploadHandlers[field.name];
    if (!file || !uploader) {
      return;
    }
    try {
      const { path } = await uploader(file, adminKey);
      setFormData((prev) => ({ ...prev, [field.name]: path }));
    } catch (err) {
      setError(err.message);
    } finally {
      inputEl.value = '';
    }
  };

  const handleMultiFileUpload = async (event, field, resourceUploadHandlers) => {
    const inputEl = event.target;
    const files = Array.from(inputEl.files || []);
    const uploader = resourceUploadHandlers[field.name];
    if (files.length === 0 || !uploader) {
      return;
    }
    try {
      const maxItems = field.maxItems || 4;
      const uploadedPaths = [];
      for (const file of files.slice(0, maxItems)) {
        const { path } = await uploader(file, adminKey);
        uploadedPaths.push(path);
      }
      setFormData((prev) => {
        const existing = Array.isArray(prev[field.name]) ? prev[field.name] : [];
        const next = [...existing, ...uploadedPaths].slice(0, maxItems);
        return { ...prev, [field.name]: next };
      });
    } catch (err) {
      setError(err.message);
    } finally {
      inputEl.value = '';
    }
  };

  const handleRemoveMedia = (fieldName, index) => {
    setFormData((prev) => {
      const existing = Array.isArray(prev[fieldName]) ? prev[fieldName] : [];
      return { ...prev, [fieldName]: existing.filter((_, idx) => idx !== index) };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = resource?.preparePayload ? resource.preparePayload(formData) : formData;
      if (isEdit) {
        await updateRecord(resource.resourceKey, entryId, payload, adminKey);
      } else {
        await createRecord(resource.resourceKey, payload, adminKey);
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
            {resource.fields.map((field) => {
              const value = formData[field.name];
              const isFileField = field.type === 'file' || field.type === 'file-multi';
              return (
                <label key={field.name} className={`resource__field ${isFileField ? 'resource__field--file' : ''}`}>
                  {field.type === 'textarea' ? (
                    <>
                      <span>
                        {field.label}
                        {field.required ? '*' : ''}
                      </span>
                      <textarea
                        name={field.name}
                        rows="3"
                        value={value ?? ''}
                        onChange={handleChange}
                        required={field.required}
                      />
                    </>
                  ) : field.type === 'file' ? (
                    <>
                      <span>
                        {field.label}
                        {field.required ? '*' : ''}
                      </span>
                      {value && (
                        <div className="resource__image-preview">
                          <img src={buildAssetUrl(value)} alt={`${field.label} preview`} />
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={(event) => handleFileUpload(event, field, resourceUploadHandlers)} />
                    </>
                  ) : field.type === 'file-multi' ? (
                    <>
                      <div className="resource__field-heading">
                        <span>
                          {field.label}
                          {field.required ? '*' : ''}
                        </span>
                        <small>First image becomes the primary hero frame.</small>
                      </div>
                      <div className="resource__gallery">
                        {Array.isArray(value) &&
                          value.map((path, idx) => (
                            <div key={`${path}-${idx}`} className="resource__gallery-item">
                              <img src={buildAssetUrl(path)} alt={`${field.label} ${idx + 1}`} />
                              <button type="button" className="btn btn--ghost" onClick={() => handleRemoveMedia(field.name, idx)}>
                                Remove
                              </button>
                            </div>
                          ))}
                        {(!Array.isArray(value) || value.length < (field.maxItems || 4)) && (
                          <label className="resource__upload-tile">
                            <span>Upload image</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(event) => handleMultiFileUpload(event, field, resourceUploadHandlers)}
                            />
                          </label>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <span>
                        {field.label}
                        {field.required ? '*' : ''}
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        value={value ?? ''}
                        onChange={handleChange}
                        required={field.required}
                      />
                    </>
                  )}
                </label>
              );
            })}

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
