import React, { useState, useEffect } from 'react';
import courseRegistrationService from '../../services/courseRegistrationService';
import courseService from '../../services/courseService';

const CourseRegistrationManagement = () => {
  const [registrations, setRegistrations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [studentRegistrations, setStudentRegistrations] = useState([]);
  const [loadingStudent, setLoadingStudent] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [registrationsData, coursesData] = await Promise.all([
        courseRegistrationService.getAllCourseRegistrations(),
        courseService.getAllCourses()
      ]);
      
      setRegistrations(Array.isArray(registrationsData) ? registrationsData : registrationsData.content || []);
      setCourses(Array.isArray(coursesData) ? coursesData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load registration data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchStudentRegistrations = async () => {
    if (!studentSearchTerm.trim()) {
      alert('Please enter a student number to search');
      return;
    }

    setLoadingStudent(true);
    try {
      const data = await courseRegistrationService.getStudentRegistrations(studentSearchTerm.trim());
      setStudentRegistrations(Array.isArray(data) ? data : []);
      setActiveTab('student');
    } catch (error) {
      console.error('Error searching student registrations:', error);
      alert('Student not found or no registrations available');
      setStudentRegistrations([]);
    } finally {
      setLoadingStudent(false);
    }
  };

  const getCourseRegistrations = async (courseId) => {
    if (!courseId) return;
    
    setLoading(true);
    try {
      const data = await courseRegistrationService.getCourseRegistrations(courseId);
      setRegistrations(Array.isArray(data) ? data : []);
      setActiveTab('course');
    } catch (error) {
      console.error('Error fetching course registrations:', error);
      setError('Failed to load course registrations');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRegistrations = () => {
    let filtered = registrations;
    
    if (searchTerm) {
      filtered = filtered.filter(reg => 
        reg.studentNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.courseCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getRegistrationStats = () => {
    const total = registrations.length;
    const active = registrations.filter(reg => reg.status === 'ACTIVE').length;
    const inactive = registrations.filter(reg => reg.status === 'INACTIVE').length;
    const dropped = registrations.filter(reg => reg.status === 'DROPPED').length;
    
    return { total, active, inactive, dropped };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading registration data...</div>
      </div>
    );
  }

  const stats = getRegistrationStats();
  const displayedRegistrations = activeTab === 'student' ? studentRegistrations : filteredRegistrations();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Course Registration Management</h2>
        <p className="text-gray-600">View and manage student course registrations</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900">Total Registrations</h3>
          <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-900">Active</h3>
          <p className="text-2xl font-bold text-green-700">{stats.active}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-900">Inactive</h3>
          <p className="text-2xl font-bold text-yellow-700">{stats.inactive}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900">Dropped</h3>
          <p className="text-2xl font-bold text-red-700">{stats.dropped}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => {
              setActiveTab('all');
              fetchInitialData();
            }}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Registrations
          </button>
          <button
            onClick={() => setActiveTab('course')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'course'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            By Course
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'student'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            By Student
          </button>
        </nav>
      </div>

      {/* Search Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        {activeTab === 'all' && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Registrations</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student number, course code, or course title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchInitialData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        )}

        {activeTab === 'course' && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => getCourseRegistrations(selectedCourse)}
                disabled={!selectedCourse}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Get Registrations
              </button>
            </div>
          </div>
        )}

        {activeTab === 'student' && (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Number</label>
              <input
                type="text"
                value={studentSearchTerm}
                onChange={(e) => setStudentSearchTerm(e.target.value)}
                placeholder="Enter student number (e.g., CS/2020/001)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={searchStudentRegistrations}
                disabled={loadingStudent}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loadingStudent ? 'Searching...' : 'Search Student'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">
            {activeTab === 'all' && 'All Registrations'}
            {activeTab === 'course' && 'Course Registrations'}
            {activeTab === 'student' && `Student Registrations${studentSearchTerm ? ` - ${studentSearchTerm}` : ''}`}
          </h3>
          <span className="text-sm text-gray-600">
            Showing {displayedRegistrations.length} registration(s)
          </span>
        </div>

        {displayedRegistrations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500">No registrations found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedRegistrations.map((registration) => (
              <div key={registration.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h4 className="text-lg font-semibold text-gray-900 mr-3">
                        {registration.courseCode}: {registration.courseTitle || registration.courseName}
                      </h4>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        registration.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800' 
                          : registration.status === 'INACTIVE'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {registration.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{registration.courseDescription}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Student Number:</span>
                        <span className="ml-2 font-medium">{registration.studentNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Credits:</span>
                        <span className="ml-2 font-medium">{registration.credits}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Department:</span>
                        <span className="ml-2 font-medium">{registration.department}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Registered:</span>
                        <span className="ml-2 font-medium">
                          {formatDate(registration.registeredAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => alert('View details functionality coming soon')}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRegistrationManagement;
