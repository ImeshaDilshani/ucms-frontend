import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CourseManagement from '../components/admin/CourseManagement';
import CourseRegistrationManagement from '../components/admin/CourseRegistrationManagement';
import APITestingComponent from '../components/admin/APITestingComponent';
import AdminStudentResults from '../components/admin/AdminStudentResults';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {/* Header */}
      <header style={{ borderBottom: '1px solid #ccc', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Admin Dashboard</h1>
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

      {/* Navigation Tabs */}
      <nav style={{ borderBottom: '1px solid #ccc', padding: '10px 20px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeTab === 'overview' ? '#007bff' : 'transparent',
              color: activeTab === 'overview' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeTab === 'courses' ? '#007bff' : 'transparent',
              color: activeTab === 'courses' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            Course Management
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeTab === 'registrations' ? '#007bff' : 'transparent',
              color: activeTab === 'registrations' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            Course Registrations
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeTab === 'users' ? '#007bff' : 'transparent',
              color: activeTab === 'users' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeTab === 'reports' ? '#007bff' : 'transparent',
              color: activeTab === 'reports' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab('api-testing')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeTab === 'api-testing' ? '#007bff' : 'transparent',
              color: activeTab === 'api-testing' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            API Testing
          </button>
          <button
            onClick={() => setActiveTab('student-results')}
            style={{
              padding: '10px 15px',
              border: 'none',
              backgroundColor: activeTab === 'student-results' ? '#007bff' : 'transparent',
              color: activeTab === 'student-results' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            Student Results
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '20px' }}>
        {activeTab === 'overview' && (
          <div>
            <h2>Administrator Panel</h2>
            <p>Manage the university course management system from this central dashboard.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>User Management</h3>
                <p>Manage students, lecturers, and administrators</p>
                <button 
                  onClick={() => setActiveTab('users')}
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Go to Users
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Course Management</h3>
                <p>Create and manage university courses</p>
                <button 
                  onClick={() => setActiveTab('courses')}
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Manage Courses
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Department Management</h3>
                <p>Manage university departments</p>
                <button 
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'not-allowed' }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Course Registrations</h3>
                <p>View and manage student course registrations</p>
                <button 
                  onClick={() => setActiveTab('registrations')}
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Manage Registrations
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Enrollment Management</h3>
                <p>Monitor student enrollments</p>
                <button 
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'not-allowed' }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Reports & Analytics</h3>
                <p>View system reports and analytics</p>
                <button 
                  onClick={() => setActiveTab('reports')}
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#17a2b8', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  View Reports
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>Student Results</h3>
                <p>View student academic results and grades</p>
                <button 
                  onClick={() => setActiveTab('student-results')}
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#8B5CF6', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  View Results
                </button>
              </div>
              
              <div style={{ border: '1px solid #ccc', padding: '20px' }}>
                <h3>System Settings</h3>
                <p>Configure system settings</p>
                <button 
                  style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'not-allowed' }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && <CourseManagement />}
        
        {activeTab === 'registrations' && <CourseRegistrationManagement />}

        {activeTab === 'users' && (
          <div>
            <h2>User Management</h2>
            <p>User management functionality will be implemented here.</p>
          </div>
        )}

        {activeTab === 'reports' && (
          <div>
            <h2>Reports & Analytics</h2>
            <p>Reports and analytics functionality will be implemented here.</p>
          </div>
        )}
        
        {activeTab === 'api-testing' && <APITestingComponent />}
        
        {activeTab === 'student-results' && <AdminStudentResults />}
      </main>
    </div>
  );
};

export default AdminDashboard;
