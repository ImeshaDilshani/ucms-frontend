import React, { useState, useEffect } from 'react';
import courseRegistrationService from '../../services/courseRegistrationService';

const CourseEnrollment = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({});
  const [activeTab, setActiveTab] = useState('available');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [available, registered] = await Promise.all([
        courseRegistrationService.getAvailableCoursesForEnrollment(),
        courseRegistrationService.getMyRegisteredCourses()
      ]);

      setAvailableCourses(available);
      setRegisteredCourses(registered);

      // Check registration status for each available course
      const statusPromises = available.map(async (course) => {
        try {
          const isRegistered = await courseRegistrationService.checkRegistrationStatus(course.id);
          return { courseId: course.id, isRegistered };
        } catch (error) {
          console.error(`Error checking status for course ${course.id}:`, error);
          return { courseId: course.id, isRegistered: false };
        }
      });

      const statusResults = await Promise.all(statusPromises);
      const statusMap = {};
      statusResults.forEach(({ courseId, isRegistered }) => {
        statusMap[courseId] = isRegistered;
      });
      setRegistrationStatus(statusMap);

    } catch (error) {
      console.error('Error fetching course data:', error);
      setError('Failed to load course data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (courseId, courseName) => {
    setError(null);
    setSuccess(null);
    try {
      await courseRegistrationService.registerForCourse(courseId);
      setSuccess(`Successfully registered for ${courseName}!`);
      
      // Update registration status
      setRegistrationStatus(prev => ({
        ...prev,
        [courseId]: true
      }));
      
      // Refresh data
      await fetchData();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register for the course. Please try again.');
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
      
      // Update registration status
      setRegistrationStatus(prev => ({
        ...prev,
        [courseId]: false
      }));
      
      // Refresh data
      await fetchData();
      
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Course Enrollment</h2>
        <p className="text-gray-600">Browse available courses and manage your registrations</p>
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

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Available Courses ({availableCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('registered')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'registered'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Registered Courses ({registeredCourses.length})
          </button>
        </nav>
      </div>

      {/* Available Courses Tab */}
      {activeTab === 'available' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Available Courses</h3>
            <button
              onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {availableCourses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No courses available for enrollment at this time.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {course.code}: {course.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Credits:</span>
                        <span className="font-medium">{course.credits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium">{course.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Enrollment:</span>
                        <span className="font-medium">
                          {course.currentEnrollments || 0}/{course.maxEnrollments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Available:</span>
                        <span className={`font-medium ${course.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                          {course.isAvailable ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>

                    {/* Prerequisites */}
                    {course.prerequisites && course.prerequisites.length > 0 && (
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">Prerequisites:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {course.prerequisites.map((prereq, index) => (
                            <span
                              key={index}
                              className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                            >
                              {typeof prereq === 'object' ? prereq.code : prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4">
                    {registrationStatus[course.id] ? (
                      <button
                        onClick={() => handleUnregister(course.id, course.name)}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Unregister
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(course.id, course.name)}
                        disabled={!course.isAvailable}
                        className={`w-full py-2 px-4 rounded-lg transition-colors ${
                          course.isAvailable
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {course.isAvailable ? 'Register' : 'Not Available'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Registered Courses Tab */}
      {activeTab === 'registered' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">My Registered Courses</h3>
            <button
              onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {registeredCourses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              You haven't registered for any courses yet.
            </div>
          ) : (
            <div className="space-y-4">
              {registeredCourses.map((registration) => (
                <div key={registration.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {registration.courseCode}: {registration.courseTitle}
                      </h4>
                      <p className="text-gray-600 mb-3">{registration.courseDescription}</p>
                      
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
                          <span className="text-gray-500">Status:</span>
                          <span className={`ml-2 font-medium ${
                            registration.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {registration.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Registered:</span>
                          <span className="ml-2 font-medium">
                            {formatDate(registration.registeredAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={() => handleUnregister(registration.courseId || registration.id, registration.courseTitle)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Unregister
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseEnrollment;
