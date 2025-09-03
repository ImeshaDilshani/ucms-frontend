import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CourseGrading from '../components/lecturer/CourseGrading';

const LecturerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'grading':
        return <CourseGrading />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lecturer Panel</h2>
            <p className="text-gray-600 mb-8">Manage your courses, students, and academic activities from this dashboard.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50">
                <div className="text-blue-600 text-3xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">My Courses</h3>
                <p className="text-gray-600">View and manage your assigned courses</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50">
                <div className="text-green-600 text-3xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-2">Student Management</h3>
                <p className="text-gray-600">View enrolled students and their progress</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50">
                <div className="text-purple-600 text-3xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">Assignments</h3>
                <p className="text-gray-600">Create and manage course assignments</p>
              </div>
              
              <div 
                className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                onClick={() => setActiveView('grading')}
              >
                <div className="text-red-600 text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Grade Students</h3>
                <p className="text-gray-600">Grade assignments and manage student grades</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50">
                <div className="text-indigo-600 text-3xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2">Schedule</h3>
                <p className="text-gray-600">View your teaching schedule</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50">
                <div className="text-yellow-600 text-3xl mb-4">📁</div>
                <h3 className="text-xl font-semibold mb-2">Course Materials</h3>
                <p className="text-gray-600">Upload and manage course materials</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => setActiveView('dashboard')}
                className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Lecturer Dashboard
              </button>
              <p className="ml-4 text-gray-600 hidden sm:block">University Course Management System</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-medium text-gray-900">Welcome, {user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default LecturerDashboard;
