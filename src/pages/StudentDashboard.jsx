import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StudentCourses from '../components/student/StudentCourses';
import CourseEnrollment from '../components/student/CourseEnrollment';
import MyCoursesNew from '../components/student/MyCoursesNew';
import StudentResults from '../components/student/StudentResults';

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
      case 'enrollment':
        return <CourseEnrollment />;
      case 'my-courses':
        return <MyCoursesNew />;
      case 'results':
        return <StudentResults />;
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Portal</h2>
            <p className="text-gray-600 mb-8">Access your courses, assignments, and academic information from this dashboard.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div 
                className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                onClick={() => setActiveView('enrollment')}
              >
                <div className="text-blue-600 text-3xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Course Enrollment</h3>
                <p className="text-gray-600">Browse and register for available courses</p>
              </div>
              
              <div 
                className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                onClick={() => setActiveView('my-courses')}
              >
                <div className="text-green-600 text-3xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">My Registered Courses</h3>
                <p className="text-gray-600">View and manage your enrolled courses</p>
              </div>

              <div 
                className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                onClick={() => setActiveView('results')}
              >
                <div className="text-purple-600 text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">My Results</h3>
                <p className="text-gray-600">View your academic results and grades</p>
              </div>
              
              <div 
                className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
                onClick={() => setActiveView('courses')}
              >
                <div className="text-purple-600 text-3xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Browse All Courses</h3>
                <p className="text-gray-600">Explore all available courses</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 opacity-50">
                <div className="text-gray-400 text-3xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-500">Assignments</h3>
                <p className="text-gray-500">View and submit course assignments</p>
                <button 
                  className="mt-3 px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 opacity-50">
                <div className="text-gray-400 text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-500">Grades</h3>
                <p className="text-gray-500">Check your grades and academic progress</p>
                <button 
                  className="mt-3 px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 opacity-50">
                <div className="text-gray-400 text-3xl mb-4">📅</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-500">Class Schedule</h3>
                <p className="text-gray-500">View your class timetable</p>
                <button 
                  className="mt-3 px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">University Course Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">Welcome, {user?.username}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeView === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🏠 Dashboard
            </button>
            <button
              onClick={() => setActiveView('enrollment')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeView === 'enrollment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📚 Course Enrollment
            </button>
            <button
              onClick={() => setActiveView('my-courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeView === 'my-courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ✅ My Courses
            </button>
            <button
              onClick={() => setActiveView('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeView === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              � Browse Courses
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default StudentDashboard;
