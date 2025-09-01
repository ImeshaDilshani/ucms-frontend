import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">University Course Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">Welcome, {user?.username}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Administrator Panel</h2>
              <p className="text-gray-600 mb-8">
                Manage the university course management system from this central dashboard.
              </p>
              
              {/* Admin Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600 text-sm">Manage students, lecturers, and administrators</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Management</h3>
                  <p className="text-gray-600 text-sm">Create and manage university courses</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Department Management</h3>
                  <p className="text-gray-600 text-sm">Manage university departments</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollment Management</h3>
                  <p className="text-gray-600 text-sm">Monitor student enrollments</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Reports & Analytics</h3>
                  <p className="text-gray-600 text-sm">View system reports and analytics</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
                  <p className="text-gray-600 text-sm">Configure system settings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
