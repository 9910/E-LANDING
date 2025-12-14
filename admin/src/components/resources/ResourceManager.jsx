import { useNavigate } from 'react-router-dom';

const ResourceManager = ({ resourceKey, label, description, fields }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/resource/${resourceKey}/display`);
  };

  const handleEdit = () => {
    navigate(`/resource/${resourceKey}/display`, { state: { focus: 'edit' } });
  };

  const handleAdd = () => {
    navigate(`/resource/${resourceKey}/new`);
  };

  return (
    <section className="resource" id={`resource-${resourceKey}`}>
      <div className="resource__header">
        <div>
          <p className="resource__eyebrow">{resourceKey}</p>
          <h2>{label}</h2>
          <p>{description}</p>
        </div>
        <div className="resource__header-actions">
          <button type="button" className="btn btn--primary" onClick={handleAdd}>
            Add Entry
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleEdit}>
            Edit Entries
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleView}>
            Display
          </button>
        </div>
      </div>
      <p className="resource__hint">{fields.length} fields configured for this resource.</p>
    </section>
  );
};

export default ResourceManager;
