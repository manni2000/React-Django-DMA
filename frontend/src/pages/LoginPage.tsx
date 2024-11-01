import React, { useState } from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../store/slices/authSlice';
import { login } from '../services/api';
import { Lock, ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await login(username, password);
      dispatch(setToken(token));
      navigate('/documents');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-sm rounded-3 border-0">
          <div className="card-body p-5">
            <h2 className="text-center text-primary fw-bold mb-4" style={{ fontSize: '1.75rem' }}>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <button type="submit" className="btn btn-primary w-100 rounded-pill">
                <Lock className="me-2" />
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/signup" className="text-decoration-none">Don't have an account? <span className="text-primary fw-bold">Sign up</span></Link>
            </div>
            <div className="mt-3 text-center">
              <Link to="/" className="btn btn-link text-decoration-none">
                <ArrowLeft className="me-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
