import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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

      <main style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Student Portal</h2>
          <p>Access your courses, assignments, and academic information from this dashboard.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px' }}>
              <h3>My Courses</h3>
              <p>View your enrolled courses</p>
            </div>
            
            <div style={{ border: '1px solid #ccc', padding: '20px' }}>
              <h3>Assignments</h3>
              <p>View and submit course assignments</p>
            </div>
            
            <div style={{ border: '1px solid #ccc', padding: '20px' }}>
              <h3>Grades</h3>
              <p>Check your grades and academic progress</p>
            </div>
            
            <div style={{ border: '1px solid #ccc', padding: '20px' }}>
              <h3>Schedule</h3>
              <p>View your class schedule</p>
            </div>
            
            <div style={{ border: '1px solid #ccc', padding: '20px' }}>
              <h3>Course Materials</h3>
              <p>Access course materials and resources</p>
            </div>
            
            <div style={{ border: '1px solid #ccc', padding: '20px' }}>
              <h3>Enrollment</h3>
              <p>Enroll in new courses</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
