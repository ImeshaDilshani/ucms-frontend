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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Portal</h2>
              <p className="text-gray-600 mb-8">
                Access your courses, assignments, and academic information from this dashboard.
              </p>
              
              {/* Student Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">My Courses</h3>
                  <p className="text-gray-600 text-sm">View your enrolled courses</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Assignments</h3>
                  <p className="text-gray-600 text-sm">View and submit course assignments</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Grades</h3>
                  <p className="text-gray-600 text-sm">Check your grades and academic progress</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule</h3>
                  <p className="text-gray-600 text-sm">View your class schedule</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Materials</h3>
                  <p className="text-gray-600 text-sm">Access course materials and resources</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollment</h3>
                  <p className="text-gray-600 text-sm">Enroll in new courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
