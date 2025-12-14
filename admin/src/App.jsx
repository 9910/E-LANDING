import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ResourceDisplayPage from './pages/ResourceDisplayPage';
import ResourceFormPage from './pages/ResourceFormPage';
import LoginPanel from './components/LoginPanel';
import { uploadHomeImage, uploadProgramImage } from './services/api';

const App = () => {
  const [adminKey, setAdminKey] = useState(() => window.localStorage.getItem('edu-admin-key') || '');

  const handleLogin = (key) => {
    setAdminKey(key);
    window.localStorage.setItem('edu-admin-key', key);
  };

  const handleLogout = () => {
    setAdminKey('');
    window.localStorage.removeItem('edu-admin-key');
  };

  if (!adminKey) {
    return <LoginPanel onSubmit={handleLogin} />;
  }

  const uploadHandlers = {
    programs: {
      image: (file) => uploadProgramImage(file, adminKey)
    },
    home: {
      heroImage: (file) => uploadHomeImage(file, adminKey),
      heroImage1: (file) => uploadHomeImage(file, adminKey),
      heroImage2: (file) => uploadHomeImage(file, adminKey),
      heroImage3: (file) => uploadHomeImage(file, adminKey),
      heroImage4: (file) => uploadHomeImage(file, adminKey)
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
      <Route
        path="/resource/:resourceKey/display"
        element={<ResourceDisplayPage adminKey={adminKey} onLogout={handleLogout} />}
      />
      <Route
        path="/resource/:resourceKey/new"
        element={<ResourceFormPage adminKey={adminKey} uploadHandlers={uploadHandlers} onLogout={handleLogout} />}
      />
      <Route
        path="/resource/:resourceKey/edit/:entryId"
        element={<ResourceFormPage adminKey={adminKey} uploadHandlers={uploadHandlers} onLogout={handleLogout} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
