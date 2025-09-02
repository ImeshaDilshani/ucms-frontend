import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StudentCourses from '../components/student/StudentCourses';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'courses':
        return <StudentCourses />;
      default:
        return (
          <div style={{ textAlign: 'center' }}>
            <h2>Student Portal</h2>
            <p>Access your courses, assignments, and academic information from this dashboard.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
              <div 
                style={{ border: '1px solid #ccc', padding: '20px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => setActiveView('courses')}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                <h3>Browse Courses</h3>
                <p>Explore and view available courses</p>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>My Enrolled Courses</h3>
                <p>View your currently enrolled courses</p>
                <button 
                  style={{ 
                    marginTop: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'not-allowed' 
                  }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Assignments</h3>
                <p>View and submit course assignments</p>
                <button 
                  style={{ 
                    marginTop: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'not-allowed' 
                  }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Grades</h3>
                <p>Check your grades and academic progress</p>
                <button 
                  style={{ 
                    marginTop: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'not-allowed' 
                  }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Class Schedule</h3>
                <p>View your class timetable</p>
                <button 
                  style={{ 
                    marginTop: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'not-allowed' 
                  }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Course Materials</h3>
                <p>Access course materials and resources</p>
                <button 
                  style={{ 
                    marginTop: '10px', 
                    padding: '8px 15px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    cursor: 'not-allowed' 
                  }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <header style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Student Dashboard</h1>
            <p>University Course Management System</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div>
              <p><strong>Welcome, {user?.username}</strong></p>
              <p>{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              style={{ 
                backgroundColor: '#dc3545', 
                color: 'white', 
                padding: '8px 15px', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #ccc', padding: '10px 20px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => setActiveView('dashboard')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeView === 'dashboard' ? '#28a745' : 'transparent',
              color: activeView === 'dashboard' ? 'white' : 'black',
              cursor: 'pointer',
              borderRadius: '6px'
            }}
          >
            🏠 Dashboard
          </button>
          <button
            onClick={() => setActiveView('courses')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeView === 'courses' ? '#28a745' : 'transparent',
              color: activeView === 'courses' ? 'white' : 'black',
              cursor: 'pointer',
              borderRadius: '6px'
            }}
          >
            📚 Browse Courses
          </button>
        </div>
      </nav>

      <main style={{ padding: '20px' }}>
        {renderActiveView()}
      </main>
    </div>
  );
};

export default StudentDashboard;
