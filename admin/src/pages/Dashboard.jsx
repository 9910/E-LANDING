import { createRef, useMemo } from 'react';
import ResourceManager from '../components/resources/ResourceManager';
import { resources } from '../config/resources';
import AdminLayout from '../components/AdminLayout';

const Dashboard = ({ onLogout }) => {
  const sectionRefs = useMemo(() => {
    const refs = {};
    resources.forEach((resource) => {
      refs[resource.resourceKey] = createRef();
    });
    return refs;
  }, []);

  const scrollToResource = (resourceKey) => {
    const node = sectionRefs[resourceKey]?.current;
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <AdminLayout onLogout={onLogout}>
      <div className="admin-body">
        <aside className="admin-sidebar">
          <div className="admin-sidebar__intro">
            <h2>Workspace</h2>
            <p>Jump directly into any collection.</p>
          </div>
          <div className="admin-sidebar__list">
            {resources.map((resource) => (
              <button
                key={resource.resourceKey}
                type="button"
                className="admin-sidebar__item"
                onClick={() => scrollToResource(resource.resourceKey)}
              >
                <span>{resource.label}</span>
                <small>{resource.description}</small>
              </button>
            ))}
          </div>
        </aside>

        <main className="admin-content">
          {resources.map((resource) => (
            <section
              key={resource.resourceKey}
              ref={sectionRefs[resource.resourceKey]}
              className="admin-section"
              aria-label={resource.label}
            >
              <ResourceManager {...resource} />
            </section>
          ))}
        </main>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
