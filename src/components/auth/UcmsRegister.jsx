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
    indexNo: '',
    firstName: '',
    lastName: '',
    program: '',
    year: '',
    adminKey: '',
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
      let userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      // Format data based on user type and API requirements
      if (userType === 'student') {
        userData = {
          ...userData,
          indexNo: formData.indexNo,
          firstName: formData.firstName,
          lastName: formData.lastName,
          program: formData.program,
          year: parseInt(formData.year),
        };
      } else if (userType === 'lecturer') {
        userData = {
          ...userData,
          staffNo: formData.staffNo,
          firstName: formData.firstName || 'First', // Add required fields if missing
          lastName: formData.lastName || 'Last',
          department: formData.department,
          lecturerSecretKey: formData.lecturerSecretKey,
        };
      } else if (userType === 'admin') {
        userData = {
          ...userData,
          adminKey: formData.adminKey,
        };
      }

      console.log('Submitting registration:', { userType, userData });
      
      const response = await register(userData, userType);
      
      console.log('Registration successful:', response);
      
      // Store tokens and user data
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSpecificFields = () => {
    switch (userType) {
      case 'student':
        return (
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
                placeholder="e.g., CS20240642"
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
                placeholder="e.g., Computer Science"
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
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </select>
            </div>
          </>
        );

      case 'lecturer':
        return (
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
                placeholder="Enter staff number"
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
                placeholder="Enter department"
                value={formData.department}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lecturerSecretKey" className="form-label">Lecturer Access Key</label>
              <input
                id="lecturerSecretKey"
                name="lecturerSecretKey"
                type="password"
                required
                placeholder="Enter lecturer access key"
                value={formData.lecturerSecretKey}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </>
        );

      case 'admin':
        return (
          <div className="form-group">
            <label htmlFor="adminKey" className="form-label">Admin Key</label>
            <input
              id="adminKey"
              name="adminKey"
              type="password"
              required
              placeholder="Enter admin access key"
              value={formData.adminKey}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        );

      default:
        return null;
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

          {error && (
            <div style={{ 
              background: '#fee', 
              color: '#c00', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}

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
                placeholder="Create a strong password"
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
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {renderRoleSpecificFields()}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                marginTop: '20px',
                padding: '15px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '25px', 
            paddingTop: '20px', 
            borderTop: '1px solid var(--border-light)' 
          }}>
            <p style={{ color: 'var(--text-light)', marginBottom: '10px' }}>
              Already have an account?
            </p>
            <Link 
              to="/login" 
              className="btn btn-outline"
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UcmsRegister;
