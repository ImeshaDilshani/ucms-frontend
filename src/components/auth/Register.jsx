import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UcmsRegister = () => {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Student specific fields
    indexNo: '',
    firstName: '',
    lastName: '',
    program: '',
    year: '',
    // Admin specific fields
    adminKey: '',
    // Lecturer specific fields
    staffNo: '',
    department: '',
    lecturerSecretKey: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Prepare data based on user type
      let registrationData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      if (userType === 'student') {
        registrationData = {
          ...registrationData,
          indexNo: formData.indexNo,
          firstName: formData.firstName,
          lastName: formData.lastName,
          program: formData.program,
          year: parseInt(formData.year),
        };
      } else if (userType === 'admin') {
        registrationData = {
          ...registrationData,
          adminKey: formData.adminKey,
        };
      } else if (userType === 'lecturer') {
        registrationData = {
          ...registrationData,
          staffNo: formData.staffNo,
          firstName: formData.firstName,
          lastName: formData.lastName,
          department: formData.department,
          lecturerSecretKey: formData.lecturerSecretKey,
        };
      }

      await register(registrationData, userType);
      
      // Show success message and redirect to login
      alert('Registration successful! Please login with your credentials.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response?.data);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
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
        maxWidth: '500px', 
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        maxHeight: '90vh',
        overflowY: 'auto'
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
              📝
            </div>
            <h2 style={{ color: 'var(--primary-green-dark)', marginBottom: '10px', fontSize: '28px' }}>
              Join UCMS
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '16px' }}>
              University Course Management System
            </p>
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <p style={{ color: 'var(--text-dark)', marginBottom: '15px', fontWeight: '600' }}>
              Select your role:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['student', 'lecturer', 'admin'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleUserTypeChange(type)}
                  className={userType === type ? 'btn btn-primary' : 'btn btn-outline'}
                  style={{ flex: '1', minWidth: '100px' }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Student specific fields */}
            {userType === 'student' && (
              <>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="indexNo" className="form-label">Index Number</label>
                  <input
                    id="indexNo"
                    name="indexNo"
                    type="text"
                    required
                    placeholder="Enter student index number"
                    value={formData.indexNo}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="program" className="form-label">Program</label>
                  <input
                    id="program"
                    name="program"
                    type="text"
                    required
                    placeholder="Enter your program of study"
                    value={formData.program}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="year" className="form-label">Academic Year</label>
                  <select
                    id="year"
                    name="year"
                    required
                    value={formData.year}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </>
            )}

            {/* Admin specific fields */}
            {userType === 'admin' && (
              <div className="form-group">
                <label htmlFor="adminKey" className="form-label">Admin Secret Key</label>
                <input
                  id="adminKey"
                  name="adminKey"
                  type="password"
                  required
                  placeholder="Enter admin secret key"
                  value={formData.adminKey}
                  onChange={handleChange}
                  className="form-input"
                />
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-light)', 
                  marginTop: '5px',
                  fontStyle: 'italic'
                }}>
                  Contact system administrator for the secret key
                </p>
              </div>
            )}

            {/* Lecturer specific fields */}
            {userType === 'lecturer' && (
              <>
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="staffNo" className="form-label">Staff Number</label>
                  <input
                    id="staffNo"
                    name="staffNo"
                    type="text"
                    required
                    placeholder="Enter your staff number"
                    value={formData.staffNo}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department" className="form-label">Department</label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    required
                    placeholder="Enter your department"
                    value={formData.department}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lecturerSecretKey" className="form-label">Lecturer Secret Key</label>
                  <input
                    id="lecturerSecretKey"
                    name="lecturerSecretKey"
                    type="password"
                    required
                    placeholder="Enter lecturer secret key"
                    value={formData.lecturerSecretKey}
                    onChange={handleChange}
                    className="form-input"
                  />
                  <p style={{ 
                    fontSize: '14px', 
                    color: 'var(--text-light)', 
                    marginTop: '5px',
                    fontStyle: 'italic'
                  }}>
                    Contact academic office for the secret key
                  </p>
                </div>
              </>
            )}

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
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-light)' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: 'var(--primary-green)', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary-green-dark)'}
                onMouseOut={(e) => e.target.style.color = 'var(--primary-green)'}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UcmsRegister;
