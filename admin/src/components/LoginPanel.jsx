import { useState } from 'react';

const LoginPanel = ({ onSubmit }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!key.trim()) {
      setError('Please enter the admin key.');
      return;
    }
    setError('');
    onSubmit(key.trim());
  };

  return (
    <div className="login-panel">
      <form className="login-panel__form" onSubmit={handleSubmit}>
        <h1>Admin Access</h1>
        <p>Enter the admin API key configured on the server.</p>
        <label htmlFor="adminKey">Admin Key</label>
        <input
          id="adminKey"
          type="password"
          value={key}
          onChange={(event) => setKey(event.target.value)}
          placeholder="Enter admin key"
        />
        {error && <p className="form-status form-status--error">{error}</p>}
        <button type="submit" className="btn btn--primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginPanel;
