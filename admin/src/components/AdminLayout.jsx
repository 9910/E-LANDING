const AdminLayout = ({ onLogout, children }) => (
  <div className="admin-shell">
    <header className="admin-topbar">
      <div>
        <p className="admin-badge">EduElevate</p>
        <h1>Content Operations</h1>
        <p>Craft the campus story, manage leads touchpoints, and keep blog posts fresh.</p>
      </div>
      <button type="button" className="btn btn--ghost admin-topbar__logout" onClick={onLogout}>
        Log Out
      </button>
    </header>
    {children}
  </div>
);

export default AdminLayout;
