import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
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
    <div>
      <div>
        <div>
          <div>
            <h2>Create Account</h2>
            <p>University Course Management System</p>
          </div>

          {/* User Type Selection */}
          <div>
            <div>
              {['student', 'lecturer', 'admin'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleUserTypeChange(type)}
                  style={{
                    backgroundColor: userType === type ? '#3b82f6' : '#f3f4f6',
                    color: userType === type ? 'white' : '#4b5563'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                {/* Common fields */}
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Student specific fields */}
                {userType === 'student' && (
                  <>
                    <div>
                      <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="indexNo">Index Number</label>
                      <input
                        id="indexNo"
                        name="indexNo"
                        type="text"
                        required
                        placeholder="e.g., CS20240642"
                        value={formData.indexNo}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <div>
                        <label htmlFor="program">Program</label>
                        <input
                          id="program"
                          name="program"
                          type="text"
                          required
                          placeholder="e.g., Computer Science"
                          value={formData.program}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="year">Academic Year</label>
                        <select
                          id="year"
                          name="year"
                          required
                          value={formData.year}
                          onChange={handleChange}
                        >
                          <option value="">Select Year</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Admin specific fields */}
                {userType === 'admin' && (
                  <div>
                    <label htmlFor="adminKey">Admin Secret Key</label>
                    <input
                      id="adminKey"
                      name="adminKey"
                      type="password"
                      required
                      placeholder="Enter admin secret key"
                      value={formData.adminKey}
                      onChange={handleChange}
                    />
                    <p>Contact system administrator for the secret key</p>
                  </div>
                )}

                {/* Lecturer specific fields */}
                {userType === 'lecturer' && (
                  <>
                    <div>
                      <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label htmlFor="staffNo">Staff Number</label>
                        <input
                          id="staffNo"
                          name="staffNo"
                          type="text"
                          required
                          placeholder="e.g., STAFF001"
                          value={formData.staffNo}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label htmlFor="department">Department</label>
                        <input
                          id="department"
                          name="department"
                          type="text"
                          required
                          placeholder="e.g., Computer Science"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lecturerSecretKey">Lecturer Secret Key</label>
                      <input
                        id="lecturerSecretKey"
                        name="lecturerSecretKey"
                        type="password"
                        required
                        placeholder="Enter lecturer secret key"
                        value={formData.lecturerSecretKey}
                        onChange={handleChange}
                      />
                      <p>Contact academic office for the secret key</p>
                    </div>
                  </>
                )}
              </div>

              {error && (
                <div>
                  <p>{error}</p>
                </div>
              )}

              <div>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <div>
              <div>
                <p>
                  Already have an account?{' '}
                  <Link to="/login">Sign in here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
