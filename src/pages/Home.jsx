import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  if (isAuthenticated && user) {
    switch (user.role) {
      case 'ADMIN':
        window.location.href = '/admin/dashboard';
        break;
      case 'LECTURER':
        window.location.href = '/lecturer/dashboard';
        break;
      case 'STUDENT':
        window.location.href = '/student/dashboard';
        break;
      default:
        break;
    }
  }

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            University Course Management System
          </h1>
          <p className="hero-subtitle">
            Empowering students, lecturers, and administrators with a comprehensive 
            academic management platform designed for modern university education.
          </p>
          {!isAuthenticated && (
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary btn-lg">
                <span>🔐</span> Sign In
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                <span>✨</span> Join UCMS
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="modern-dashboard-container">
          <div className="modern-dashboard-header">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Academic Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides comprehensive tools and features designed to streamline 
              academic processes and enhance the learning experience.
            </p>
          </div>

          <div className="modern-grid modern-grid-cols-3 mt-12">
            {/* Student Features */}
            <div className="feature-card">
              <div className="feature-icon">👨‍🎓</div>
              <h3 className="text-xl font-semibold mb-4">For Students</h3>
              <p className="text-gray-600 mb-6">
                Access courses, track progress, and manage your academic journey with ease.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Course enrollment & materials
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Real-time grade tracking
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Academic progress monitoring
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Course schedule management
                </li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-primary w-full">
                  Join as Student
                </Link>
              )}
            </div>

            {/* Lecturer Features */}
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3 className="text-xl font-semibold mb-4">For Lecturers</h3>
              <p className="text-gray-600 mb-6">
                Manage courses, grade assignments, and engage with students effectively.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Course content management
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Student assessment tools
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Grade recording & analytics
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Student progress insights
                </li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-primary w-full">
                  Join as Lecturer
                </Link>
              )}
            </div>

            {/* Admin Features */}
            <div className="feature-card">
              <div className="feature-icon">👨‍💼</div>
              <h3 className="text-xl font-semibold mb-4">For Administrators</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive system management and oversight capabilities.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  User & role management
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  Course administration
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  System-wide analytics
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-2">✓</span>
                  Academic oversight tools
                </li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-primary w-full">
                  Admin Access
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="modern-dashboard-container">
          <div className="modern-dashboard-header">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Academic Institutions
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of users who trust UCMS for their academic management needs.
            </p>
          </div>

          <div className="modern-grid modern-grid-cols-4 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Lecturers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600">Available Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">99%</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!isAuthenticated && (
        <section className="py-16 bg-gray-900 text-white">
          <div className="modern-dashboard-container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Academic Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join UCMS today and discover how our platform can streamline your 
              academic processes and enhance your educational journey.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-900">
                Sign In
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
