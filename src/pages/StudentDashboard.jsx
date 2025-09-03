import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentCourses from '../components/student/StudentCourses';
import CourseEnrollment from '../components/student/CourseEnrollment';
import MyCoursesNew from '../components/student/MyCoursesNew';
import StudentResults from '../components/student/StudentResults';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

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
          <div className="fade-in">
            {/* Dashboard Header */}
            <div className="modern-dashboard-header">
              <h1 className="modern-dashboard-title">
                Welcome, {user?.firstName || user?.username}!
              </h1>
              <p className="modern-dashboard-subtitle">
                Manage your academic journey from your student portal
              </p>
            </div>

            {/* Quick Stats */}
            <div className="modern-grid modern-grid-cols-4 mb-8">
              <div className="modern-card text-center">
                <div className="modern-card-icon mx-auto">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">5</h3>
                <p className="text-gray-600">Enrolled Courses</p>
              </div>
              <div className="modern-card text-center">
                <div className="modern-card-icon mx-auto bg-green-500">✅</div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">3</h3>
                <p className="text-gray-600">Completed</p>
              </div>
              <div className="modern-card text-center">
                <div className="modern-card-icon mx-auto bg-orange-500">⏱️</div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">2</h3>
                <p className="text-gray-600">In Progress</p>
              </div>
              <div className="modern-card text-center">
                <div className="modern-card-icon mx-auto bg-purple-500">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mt-4">85%</h3>
                <p className="text-gray-600">Overall Grade</p>
              </div>
            </div>

            {/* Main Actions */}
            <div className="modern-grid modern-grid-cols-2 mb-8">
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('enrollment')}
              >
                <div className="feature-icon">🔍</div>
                <h3 className="modern-card-title">Course Enrollment</h3>
                <p className="modern-card-description">
                  Browse and register for available courses. Discover new subjects and expand your knowledge.
                </p>
                <button className="btn btn-primary mt-4">
                  Browse Courses
                </button>
              </div>
              
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('my-courses')}
              >
                <div className="feature-icon">📖</div>
                <h3 className="modern-card-title">My Courses</h3>
                <p className="modern-card-description">
                  Access your registered courses, view materials, and track your progress.
                </p>
                <button className="btn btn-success mt-4">
                  View My Courses
                </button>
              </div>
            </div>

            <div className="modern-grid modern-grid-cols-2">
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('results')}
              >
                <div className="feature-icon">📊</div>
                <h3 className="modern-card-title">Academic Results</h3>
                <p className="modern-card-description">
                  Check your grades, view detailed performance reports, and track academic achievements.
                </p>
                <button className="btn btn-outline mt-4">
                  View Results
                </button>
              </div>
              
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('courses')}
              >
                <div className="feature-icon">📋</div>
                <h3 className="modern-card-title">Course Management</h3>
                <p className="modern-card-description">
                  Manage your course schedule, access course materials, and stay organized.
                </p>
                <button className="btn btn-outline mt-4">
                  Manage Courses
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="modern-dashboard-container">
      {/* Enhanced Navigation Tabs */}
      <div className="dashboard-tab-navigation">
        <div className="flex flex-wrap gap-1">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
            { key: 'enrollment', label: 'Enroll', icon: '📚' },
            { key: 'my-courses', label: 'My Courses', icon: '✅' },
            { key: 'results', label: 'Results', icon: '📊' },
            { key: 'courses', label: 'Browse', icon: '📋' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key)}
              className={`tab-button ${activeView === tab.key ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="hidden sm:inline font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active View Content */}
      <div className="min-h-96">
        {renderActiveView()}
      </div>
    </div>
  );
};

export default StudentDashboard;
