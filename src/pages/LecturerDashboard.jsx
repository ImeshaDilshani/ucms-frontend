import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CourseGrading from '../components/lecturer/CourseGrading';

const LecturerDashboard = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'grading':
        return <CourseGrading />;
      case 'courses':
        return (
          <div className="modern-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">My Courses</h3>
              <button className="btn btn-primary">Add New Course</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'CS101 - Introduction to Programming', students: 45, status: 'Active' },
                { name: 'CS201 - Data Structures', students: 32, status: 'Active' },
                { name: 'CS301 - Algorithms', students: 28, status: 'Active' },
              ].map((course, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">{course.name}</h4>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{course.students} students</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{course.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="modern-card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Management</h3>
            <div className="space-y-4">
              {[
                { name: 'John Doe', course: 'CS101', grade: 'A', attendance: '95%' },
                { name: 'Jane Smith', course: 'CS201', grade: 'B+', attendance: '88%' },
                { name: 'Mike Johnson', course: 'CS301', grade: 'A-', attendance: '92%' },
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{student.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{student.grade}</p>
                      <p className="text-gray-600">Grade</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{student.attendance}</p>
                      <p className="text-gray-600">Attendance</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="modern-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Assignments</h3>
              <button className="btn btn-primary">Create Assignment</button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Programming Assignment 1', course: 'CS101', dueDate: '2025-09-15', submissions: 35 },
                { title: 'Data Structure Quiz', course: 'CS201', dueDate: '2025-09-20', submissions: 28 },
                { title: 'Algorithm Analysis', course: 'CS301', dueDate: '2025-09-25', submissions: 22 },
              ].map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">{assignment.title}</h4>
                    <p className="text-sm text-gray-600">{assignment.course} • Due: {assignment.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{assignment.submissions} submissions</span>
                    <button className="btn btn-outline btn-sm">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="modern-card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Class Schedule</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">This Week</h4>
                <div className="space-y-3">
                  {[
                    { day: 'Monday', time: '9:00 AM - 11:00 AM', course: 'CS101', room: 'Room 201' },
                    { day: 'Wednesday', time: '2:00 PM - 4:00 PM', course: 'CS201', room: 'Room 301' },
                    { day: 'Friday', time: '10:00 AM - 12:00 PM', course: 'CS301', room: 'Room 401' },
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{schedule.course}</p>
                        <p className="text-sm text-gray-600">{schedule.day} • {schedule.time}</p>
                      </div>
                      <span className="text-sm text-gray-600">{schedule.room}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Office Hours</h4>
                <div className="space-y-3">
                  {[
                    { day: 'Tuesday', time: '2:00 PM - 4:00 PM', location: 'Office 205' },
                    { day: 'Thursday', time: '1:00 PM - 3:00 PM', location: 'Office 205' },
                  ].map((office, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-gray-900">{office.day}</p>
                      <p className="text-sm text-gray-600">{office.time} • {office.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="fade-in">
            {/* Dashboard Header */}
            <div className="modern-dashboard-header">
              <h1 className="modern-dashboard-title">
                Welcome, Dr. {user?.firstName || user?.username}!
              </h1>
              <p className="modern-dashboard-subtitle">
                Manage your courses, students, and academic activities from your lecturer portal
              </p>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="modern-grid modern-grid-cols-4 mb-8">
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-blue-500">📚</div>
                <div className="card-value">8</div>
                <p className="card-label">Active Courses</p>
              </div>
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-green-500">👥</div>
                <div className="card-value">156</div>
                <p className="card-label">Total Students</p>
              </div>
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-orange-500">📝</div>
                <div className="card-value">12</div>
                <p className="card-label">Pending Grades</p>
              </div>
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-purple-500">⭐</div>
                <div className="card-value">4.8</div>
                <p className="card-label">Avg Rating</p>
              </div>
            </div>

            {/* Main Actions */}
            <div className="modern-grid modern-grid-cols-3 mb-8">
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('courses')}
              >
                <div className="feature-icon text-blue-500">📚</div>
                <h3 className="modern-card-title">Course Management</h3>
                <p className="modern-card-description">
                  Manage your assigned courses, upload materials, and track course progress.
                </p>
                <button className="btn btn-primary mt-4 w-full">
                  Manage Courses
                </button>
              </div>
              
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('grading')}
              >
                <div className="feature-icon text-green-500">🎯</div>
                <h3 className="modern-card-title">Grade Students</h3>
                <p className="modern-card-description">
                  Grade assignments, exams, and provide feedback to your students.
                </p>
                <button className="btn btn-success mt-4 w-full">
                  Start Grading
                </button>
              </div>

              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('students')}
              >
                <div className="feature-icon text-purple-500">👥</div>
                <h3 className="modern-card-title">Student Management</h3>
                <p className="modern-card-description">
                  View student profiles, track attendance, and monitor academic progress.
                </p>
                <button className="btn btn-outline mt-4 w-full">
                  View Students
                </button>
              </div>
            </div>

            <div className="modern-grid modern-grid-cols-2">
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('assignments')}
              >
                <div className="feature-icon text-orange-500">📝</div>
                <h3 className="modern-card-title">Assignments</h3>
                <p className="modern-card-description">
                  Create, manage, and track assignments for your courses.
                </p>
                <button className="btn btn-outline mt-4 w-full">
                  Manage Assignments
                </button>
              </div>
              
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveView('schedule')}
              >
                <div className="feature-icon text-indigo-500">📅</div>
                <h3 className="modern-card-title">Class Schedule</h3>
                <p className="modern-card-description">
                  View and manage your class schedules and office hours.
                </p>
                <button className="btn btn-outline mt-4 w-full">
                  View Schedule
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="modern-card">
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">📚</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New assignment submitted</p>
                      <p className="text-xs text-gray-500">CS101 - Data Structures • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 text-sm">✅</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Grades published</p>
                      <p className="text-xs text-gray-500">CS202 - Algorithms • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-600 text-sm">👥</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New student enrollment</p>
                      <p className="text-xs text-gray-500">CS301 - Database Systems • Yesterday</p>
                    </div>
                  </div>
                </div>
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
            { key: 'dashboard', label: 'Dashboard', icon: '🏠', color: 'blue' },
            { key: 'courses', label: 'Courses', icon: '📚', color: 'indigo' },
            { key: 'grading', label: 'Grading', icon: '🎯', color: 'green' },
            { key: 'students', label: 'Students', icon: '👥', color: 'purple' },
            { key: 'assignments', label: 'Assignments', icon: '📝', color: 'orange' },
            { key: 'schedule', label: 'Schedule', icon: '📅', color: 'teal' }
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

export default LecturerDashboard;
