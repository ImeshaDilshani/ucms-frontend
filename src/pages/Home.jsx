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
      <div className="header" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="header-content" style={{ flexDirection: 'column', gap: '20px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '15px' }}>
            UCMS - University Course Management System
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Your comprehensive academic management platform - empowering students, lecturers, and administrators
          </p>
          {!isAuthenticated && (
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
              <Link to="/login" className="btn btn-primary" style={{ fontSize: '16px', padding: '12px 25px' }}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-secondary" style={{ fontSize: '16px', padding: '12px 25px' }}>
                Join UCMS
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Welcome Message */}
        <div className="card slide-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="card-header">
            <h2>Welcome to UCMS</h2>
          </div>
          <div style={{ padding: '30px' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-light)', lineHeight: '1.6' }}>
              Seamlessly manage your academic journey with our comprehensive suite of tools designed 
              for modern university education. Connect, learn, and excel in your academic endeavors.
            </p>
          </div>
        </div>

        {/* Role-Based Features */}
        <div className="card-grid">
          <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
            <div style={{ textAlign: 'center' }}>
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
                👨‍🎓
              </div>
              <h3 style={{ color: 'var(--primary-green-dark)', marginBottom: '15px' }}>For Students</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '20px' }}>
                Access your courses, submit assignments, track academic progress, and connect with your learning community.
              </p>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--text-light)', 
                marginBottom: '25px',
                listStyle: 'none',
                paddingLeft: '0'
              }}>
                <li style={{ padding: '5px 0' }}>✅ Course enrollment & materials</li>
                <li style={{ padding: '5px 0' }}>✅ Assignment submission</li>
                <li style={{ padding: '5px 0' }}>✅ Grade tracking & progress</li>
                <li style={{ padding: '5px 0' }}>✅ Academic schedule management</li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-primary">Join as Student</Link>
              )}
            </div>
          </div>

          <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, var(--secondary-green), var(--accent-green))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '36px'
              }}>
                👨‍🏫
              </div>
              <h3 style={{ color: 'var(--primary-green-dark)', marginBottom: '15px' }}>For Lecturers</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '20px' }}>
                Manage courses, grade assignments, interact with students, and streamline your teaching workflow.
              </p>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--text-light)', 
                marginBottom: '25px',
                listStyle: 'none',
                paddingLeft: '0'
              }}>
                <li style={{ padding: '5px 0' }}>✅ Course & student management</li>
                <li style={{ padding: '5px 0' }}>✅ Assignment creation & grading</li>
                <li style={{ padding: '5px 0' }}>✅ Teaching schedule & materials</li>
                <li style={{ padding: '5px 0' }}>✅ Performance analytics</li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-secondary">Join as Lecturer</Link>
              )}
            </div>
          </div>

          <div className="card slide-up" style={{ animationDelay: '0.3s' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'linear-gradient(135deg, var(--accent-green), var(--primary-green))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '36px'
              }}>
                👨‍💼
              </div>
              <h3 style={{ color: 'var(--primary-green-dark)', marginBottom: '15px' }}>For Administrators</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '20px' }}>
                Oversee the entire system, manage users, courses, departments, and institutional settings.
              </p>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--text-light)', 
                marginBottom: '25px',
                listStyle: 'none',
                paddingLeft: '0'
              }}>
                <li style={{ padding: '5px 0' }}>✅ System & user management</li>
                <li style={{ padding: '5px 0' }}>✅ Reports & analytics</li>
                <li style={{ padding: '5px 0' }}>✅ Institutional settings</li>
                <li style={{ padding: '5px 0' }}>✅ Database administration</li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-warning">Join as Admin</Link>
              )}
            </div>
          </div>
        </div>

        {/* Platform Benefits */}
        <div className="card slide-up" style={{ animationDelay: '0.4s', marginTop: '40px' }}>
          <div className="card-header">
            <h2>Why Choose UCMS?</h2>
          </div>
          <div style={{ padding: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🚀</div>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Modern & Fast</h4>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                  Built with cutting-edge technology for optimal performance and user experience.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔒</div>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>Secure & Reliable</h4>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                  Advanced security measures protect your academic data and personal information.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎯</div>
                <h4 style={{ color: 'var(--primary-green)', marginBottom: '10px' }}>User-Focused</h4>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>
                  Intuitive design tailored to meet the unique needs of academic institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
