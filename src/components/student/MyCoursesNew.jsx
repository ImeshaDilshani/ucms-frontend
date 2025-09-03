import React, { useState, useEffect } from 'react';
import courseRegistrationService from '../../services/courseRegistrationService';

const MyCourses = () => {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('courseCode');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchRegisteredCourses();
  }, []);

  const fetchRegisteredCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const courses = await courseRegistrationService.getMyRegisteredCourses();
      setRegisteredCourses(courses);
    } catch (error) {
      console.error('Error fetching registered courses:', error);
      setError('Failed to load your registered courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async (courseId, courseName) => {
    if (!window.confirm(`Are you sure you want to unregister from ${courseName}?`)) {
      return;
    }

    setError(null);
    setSuccess(null);
    try {
      await courseRegistrationService.unregisterFromCourse(courseId);
      setSuccess(`Successfully unregistered from ${courseName}!`);
      
      // Refresh the courses list
      await fetchRegisteredCourses();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Unregistration error:', error);
      setError('Failed to unregister from the course. Please try again.');
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

  const filteredAndSortedCourses = () => {
    let filtered = registeredCourses.filter(course => {
      const matchesSearch = course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'courseCode':
          return a.courseCode.localeCompare(b.courseCode);
        case 'courseTitle':
          return a.courseTitle.localeCompare(b.courseTitle);
        case 'department':
          return a.department.localeCompare(b.department);
        case 'credits':
          return b.credits - a.credits;
        case 'registeredAt':
          return new Date(b.registeredAt) - new Date(a.registeredAt);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const calculateTotalCredits = () => {
    return registeredCourses
      .filter(course => course.status === 'ACTIVE')
      .reduce((total, course) => total + course.credits, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading your courses...</div>
      </div>
    );
  }

  const displayedCourses = filteredAndSortedCourses();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Registered Courses</h2>
        <p className="text-gray-600">Manage and view your course registrations</p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <strong>Success:</strong> {success}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900">Total Courses</h3>
          <p className="text-2xl font-bold text-blue-700">{registeredCourses.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-900">Active Courses</h3>
          <p className="text-2xl font-bold text-green-700">
            {registeredCourses.filter(course => course.status === 'ACTIVE').length}
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-900">Total Credits</h3>
          <p className="text-2xl font-bold text-purple-700">{calculateTotalCredits()}</p>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Courses</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by code, name, or department..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="courseCode">Course Code</option>
              <option value="courseTitle">Course Title</option>
              <option value="department">Department</option>
              <option value="credits">Credits</option>
              <option value="registeredAt">Registration Date</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DROPPED">Dropped</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {displayedCourses.length} of {registeredCourses.length} courses
          </span>
          <button
            onClick={fetchRegisteredCourses}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Courses List */}
      {displayedCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-gray-500">
            {registeredCourses.length === 0 
              ? "You haven't registered for any courses yet." 
              : "No courses match your current filters."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedCourses.map((registration) => (
            <div key={registration.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <h4 className="text-lg font-semibold text-gray-900 mr-3">
                      {registration.courseCode}: {registration.courseTitle}
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
                      <span className="text-gray-500">Credits:</span>
                      <span className="ml-2 font-medium">{registration.credits}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <span className="ml-2 font-medium">{registration.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Student Number:</span>
                      <span className="ml-2 font-medium">{registration.studentNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Registered:</span>
                      <span className="ml-2 font-medium">
                        {formatDate(registration.registeredAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex flex-col space-y-2">
                  <button
                    onClick={() => handleUnregister(registration.courseId || registration.id, registration.courseTitle)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Unregister
                  </button>
                  <button
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    disabled
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
  );
};

export default MyCourses;
