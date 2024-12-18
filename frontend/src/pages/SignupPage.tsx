import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from '../store/slices/authSlice';
import { signup } from '../services/api';
import { UserPlus, ArrowLeft } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const token = await signup(username, password);
      dispatch(setToken(token));
      navigate('/documents');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card shadow-sm rounded-3 border-0">
          <div className="card-body p-5">
            <h2 className="text-center text-primary fw-bold mb-4" style={{ fontSize: '1.75rem' }}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <button 
                type="submit" 
                className="btn btn-primary w-100 rounded-pill"
                disabled={isLoading}
              >
                <UserPlus className="me-2" />
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/login" className="text-decoration-none">Already have an account? <span className="text-primary fw-bold">Login</span></Link>
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

export default SignupPage;
