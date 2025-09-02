import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      const { user } = response;

      // Navigate based on user role
      switch (user.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'LECTURER':
          navigate('/lecturer/dashboard');
          break;
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, var(--primary-green-light) 0%, var(--secondary-green-light) 100%)'
    }}>
      <div className="card slide-up" style={{ 
        maxWidth: '400px', 
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, var(--primary-green), var(--secondary-green))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '36px'
            }}>
              🎓
            </div>
            <h2 style={{ color: 'var(--primary-green-dark)', marginBottom: '10px', fontSize: '28px' }}>
              Welcome Back
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '16px' }}>
              University Course Management System
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-error" style={{ marginBottom: '20px' }}>
                <p>{error}</p>
              </div>
            )}

            <div>
              <button 
                type="submit" 
                disabled={loading}
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                style={{ width: '100%', fontSize: '16px', padding: '12px' }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span className="spinner"></span>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <div style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--text-light)' }}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  style={{ 
                    color: 'var(--primary-green)', 
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'var(--primary-green-dark)'}
                  onMouseOut={(e) => e.target.style.color = 'var(--primary-green)'}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
