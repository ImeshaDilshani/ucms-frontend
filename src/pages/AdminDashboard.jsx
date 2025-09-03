import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CourseManagement from '../components/admin/CourseManagement';
import CourseRegistrationManagement from '../components/admin/CourseRegistrationManagement';
import APITestingComponent from '../components/admin/APITestingComponent';
import AdminStudentResults from '../components/admin/AdminStudentResults';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const renderActiveView = () => {
    switch (activeTab) {
      case 'courses':
        return <CourseManagement />;
      case 'registrations':
        return <CourseRegistrationManagement />;
      case 'api-testing':
        return <APITestingComponent />;
      case 'student-results':
        return <AdminStudentResults />;
      case 'users':
        return (
          <div className="modern-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">User Management</h3>
              <div className="flex gap-2">
                <button className="btn btn-outline">Export Users</button>
                <button className="btn btn-primary">Add New User</button>
              </div>
            </div>
            
            {/* User Statistics */}
            <div className="modern-grid modern-grid-cols-3 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600">🎓</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-900">1,890</p>
                    <p className="text-sm text-blue-700">Students</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600">👨‍🏫</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-900">87</p>
                    <p className="text-sm text-green-700">Lecturers</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600">⚙️</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-900">12</p>
                    <p className="text-sm text-purple-700">Admins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-900">User</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Role</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Status</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Last Active</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', lastActive: '2 hours ago' },
                    { name: 'Dr. Sarah Wilson', email: 'sarah@example.com', role: 'Lecturer', status: 'Active', lastActive: '1 hour ago' },
                    { name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'Inactive', lastActive: '2 days ago' },
                    { name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active', lastActive: '10 minutes ago' },
                  ].map((user, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <span className="text-gray-600 text-sm">{user.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'Lecturer' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-gray-600">{user.lastActive}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="modern-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Reports & Analytics</h3>
              <div className="flex gap-2">
                <button className="btn btn-outline">Export All</button>
                <button className="btn btn-primary">Generate Report</button>
              </div>
            </div>
            
            {/* Analytics Overview */}
            <div className="modern-grid modern-grid-cols-2 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trends</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">+15.2%</p>
                    <p className="text-sm text-gray-600">Growth this semester</p>
                  </div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-2xl">📈</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Completion</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-600">87.4%</p>
                    <p className="text-sm text-gray-600">Average completion rate</p>
                  </div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Categories */}
            <div className="modern-grid modern-grid-cols-3">
              <div className="feature-card">
                <div className="feature-icon text-blue-500">📊</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Academic Reports</h4>
                <p className="text-sm text-gray-600 mb-4">Student performance, grades, and academic analytics</p>
                <button className="btn btn-outline btn-sm w-full">Generate</button>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon text-green-500">👥</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Enrollment Reports</h4>
                <p className="text-sm text-gray-600 mb-4">Course registrations, enrollment trends, and capacity</p>
                <button className="btn btn-outline btn-sm w-full">Generate</button>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon text-purple-500">💰</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Financial Reports</h4>
                <p className="text-sm text-gray-600 mb-4">Revenue, payments, and financial analytics</p>
                <button className="btn btn-outline btn-sm w-full">Generate</button>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h4>
              <div className="space-y-3">
                {[
                  { name: 'Semester Grade Report', date: '2025-09-01', type: 'Academic', size: '2.4 MB' },
                  { name: 'Enrollment Summary', date: '2025-08-28', type: 'Enrollment', size: '1.8 MB' },
                  { name: 'Financial Overview', date: '2025-08-25', type: 'Financial', size: '3.2 MB' },
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600">📋</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{report.name}</p>
                        <p className="text-sm text-gray-600">{report.type} • {report.date} • {report.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="modern-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">System Settings</h3>
              <button className="btn btn-primary">Save Changes</button>
            </div>
            
            <div className="modern-grid modern-grid-cols-2">
              <div className="space-y-6">
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="University Course Management System"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>2024-2025</option>
                        <option>2025-2026</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Fall 2024</option>
                        <option>Spring 2025</option>
                        <option>Summer 2025</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Registration Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Auto-approve registrations</p>
                        <p className="text-sm text-gray-600">Automatically approve student registrations</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email notifications</p>
                        <p className="text-sm text-gray-600">Send email notifications for registrations</p>
                      </div>
                      <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>Strong (recommended)</option>
                        <option>Medium</option>
                        <option>Basic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                      <input 
                        type="number" 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="30"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Two-factor authentication</p>
                        <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Backup & Maintenance</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">Last Backup</p>
                        <span className="text-sm text-green-600">2 hours ago</span>
                      </div>
                      <button className="btn btn-outline btn-sm">Run Backup Now</button>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">System Status</p>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Healthy</span>
                      </div>
                      <button className="btn btn-outline btn-sm">Run Diagnostics</button>
                    </div>
                  </div>
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
                Welcome, Admin {user?.firstName || user?.username}!
              </h1>
              <p className="modern-dashboard-subtitle">
                Manage the entire university course system from your administrative portal
              </p>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="modern-grid modern-grid-cols-4 mb-8">
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-blue-500">👥</div>
                <div className="card-value">2,543</div>
                <p className="card-label">Total Users</p>
              </div>
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-green-500">📚</div>
                <div className="card-value">125</div>
                <p className="card-label">Active Courses</p>
              </div>
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-orange-500">🎓</div>
                <div className="card-value">1,890</div>
                <p className="card-label">Enrolled Students</p>
              </div>
              <div className="enhanced-stats-card text-center">
                <div className="card-icon mx-auto bg-purple-500">👨‍🏫</div>
                <div className="card-value">87</div>
                <p className="card-label">Active Lecturers</p>
              </div>
            </div>

            {/* Enhanced Main Actions */}
            <div className="modern-grid modern-grid-cols-2 mb-8">
              <div 
                className="enhanced-feature-card cursor-pointer"
                onClick={() => setActiveTab('courses')}
              >
                <div className="feature-icon text-blue-500">📚</div>
                <h3 className="modern-card-title">Course Management</h3>
                <p className="modern-card-description">
                  Create, edit, and manage all university courses. Control course availability and prerequisites.
                </p>
                <button className="btn-enhanced btn-primary-enhanced mt-4">
                  Manage Courses
                </button>
              </div>
              
              <div 
                className="enhanced-feature-card cursor-pointer"
                onClick={() => setActiveTab('users')}
              >
                <div className="feature-icon text-green-500">👥</div>
                <h3 className="modern-card-title">User Management</h3>
                <p className="modern-card-description">
                  Manage students, lecturers, and administrative staff. Control user roles and permissions.
                </p>
                <button className="btn-enhanced btn-primary-enhanced mt-4">
                  Manage Users
                </button>
              </div>
            </div>

            <div className="modern-grid modern-grid-cols-3 mb-8">
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveTab('registrations')}
              >
                <div className="feature-icon">📝</div>
                <h3 className="modern-card-title">Registration Management</h3>
                <p className="modern-card-description">
                  Monitor and manage student course registrations and enrollments.
                </p>
                <button className="btn btn-outline mt-4">
                  View Registrations
                </button>
              </div>
              
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveTab('student-results')}
              >
                <div className="feature-icon">📊</div>
                <h3 className="modern-card-title">Student Results</h3>
                <p className="modern-card-description">
                  View and manage student academic results and performance metrics.
                </p>
                <button className="btn btn-outline mt-4">
                  View Results
                </button>
              </div>

              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveTab('reports')}
              >
                <div className="feature-icon">📈</div>
                <h3 className="modern-card-title">Reports & Analytics</h3>
                <p className="modern-card-description">
                  Generate comprehensive reports and view system analytics.
                </p>
                <button className="btn btn-outline mt-4">
                  View Reports
                </button>
              </div>
            </div>

            <div className="modern-grid modern-grid-cols-2">
              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveTab('api-testing')}
              >
                <div className="feature-icon">🔧</div>
                <h3 className="modern-card-title">API Testing</h3>
                <p className="modern-card-description">
                  Test and monitor system APIs and backend functionality.
                </p>
                <button className="btn btn-outline mt-4">
                  API Testing
                </button>
              </div>

              <div 
                className="feature-card cursor-pointer"
                onClick={() => setActiveTab('settings')}
              >
                <div className="feature-icon">⚙️</div>
                <h3 className="modern-card-title">System Settings</h3>
                <p className="modern-card-description">
                  Configure system-wide settings and administrative preferences.
                </p>
                <button className="btn btn-outline mt-4">
                  System Settings
                </button>
              </div>
            </div>
            {/* System Activity & Alerts */}
            <div className="mt-8">
              <div className="modern-grid modern-grid-cols-2">
                <div className="modern-card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent System Activity</h3>
                  <div className="space-y-4">
                    <div className="activity-feed-item bg-green-50">
                      <div className="activity-icon-wrapper bg-green-100">
                        <span className="text-green-600 text-sm">✅</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">New student registration</p>
                        <p className="text-xs text-gray-500">Sarah Johnson • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="activity-feed-item bg-blue-50">
                      <div className="activity-icon-wrapper bg-blue-100">
                        <span className="text-blue-600 text-sm">📚</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Course updated</p>
                        <p className="text-xs text-gray-500">CS301 - Database Systems • 4 hours ago</p>
                      </div>
                    </div>
                    <div className="activity-feed-item bg-orange-50">
                      <div className="activity-icon-wrapper bg-orange-100">
                        <span className="text-orange-600 text-sm">👨‍🏫</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Lecturer account created</p>
                        <p className="text-xs text-gray-500">Dr. Michael Brown • Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modern-card">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-red-500 text-lg mr-3">⚠️</span>
                        <div>
                          <p className="text-sm font-medium text-red-800">Server Maintenance Due</p>
                          <p className="text-xs text-red-600">Scheduled for this weekend</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg mr-3">📊</span>
                        <div>
                          <p className="text-sm font-medium text-yellow-800">High Registration Volume</p>
                          <p className="text-xs text-yellow-600">250+ registrations today</p>
                        </div>
                      </div>
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
            { key: 'overview', label: 'Overview', icon: '🏠', color: 'blue' },
            { key: 'courses', label: 'Courses', icon: '📚', color: 'indigo' },
            { key: 'users', label: 'Users', icon: '👥', color: 'green' },
            { key: 'registrations', label: 'Registrations', icon: '📝', color: 'purple' },
            { key: 'student-results', label: 'Results', icon: '📊', color: 'orange' },
            { key: 'reports', label: 'Reports', icon: '📈', color: 'teal' },
            { key: 'api-testing', label: 'API', icon: '🔧', color: 'gray' },
            { key: 'settings', label: 'Settings', icon: '⚙️', color: 'red' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
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

export default AdminDashboard;
