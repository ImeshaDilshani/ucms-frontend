import React, { useState } from 'react';
import courseRegistrationService from '../../services/courseRegistrationService';
import courseService from '../../services/courseService';

const APITestingComponent = () => {
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState('1');
  const [studentNumber, setStudentNumber] = useState('CS/2020/001');

  const logResult = (label, data) => {
    const timestamp = new Date().toLocaleTimeString();
    const resultText = `[${timestamp}] ${label}:\n${JSON.stringify(data, null, 2)}\n\n`;
    setResults(prev => prev + resultText);
  };

  const testAPI = async (testFunction, label) => {
    setLoading(true);
    try {
      const result = await testFunction();
      logResult(`✅ ${label} - SUCCESS`, result);
    } catch (error) {
      logResult(`❌ ${label} - ERROR`, {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => setResults('');

  const testCases = [
    {
      label: 'Get Available Courses for Enrollment',
      action: () => testAPI(
        () => courseRegistrationService.getAvailableCoursesForEnrollment(),
        'Get Available Courses for Enrollment'
      )
    },
    {
      label: 'Get My Registered Courses',
      action: () => testAPI(
        () => courseRegistrationService.getMyRegisteredCourses(),
        'Get My Registered Courses'
      )
    },
    {
      label: 'Register for Course',
      action: () => testAPI(
        () => courseRegistrationService.registerForCourse(parseInt(courseId)),
        `Register for Course ID: ${courseId}`
      )
    },
    {
      label: 'Check Registration Status',
      action: () => testAPI(
        () => courseRegistrationService.checkRegistrationStatus(parseInt(courseId)),
        `Check Registration Status for Course ID: ${courseId}`
      )
    },
    {
      label: 'Unregister from Course',
      action: () => testAPI(
        () => courseRegistrationService.unregisterFromCourse(parseInt(courseId)),
        `Unregister from Course ID: ${courseId}`
      )
    },
    {
      label: 'Get Student Registrations (Admin)',
      action: () => testAPI(
        () => courseRegistrationService.getStudentRegistrations(studentNumber),
        `Get Student Registrations for: ${studentNumber}`
      )
    },
    {
      label: 'Get All Course Registrations (Admin)',
      action: () => testAPI(
        () => courseRegistrationService.getAllCourseRegistrations(),
        'Get All Course Registrations'
      )
    },
    {
      label: 'Get Course Registrations by Course ID (Admin)',
      action: () => testAPI(
        () => courseRegistrationService.getCourseRegistrations(parseInt(courseId)),
        `Get Course Registrations for Course ID: ${courseId}`
      )
    },
    {
      label: 'Get All Courses',
      action: () => testAPI(
        () => courseService.getAllCourses(),
        'Get All Courses'
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">API Testing Panel</h2>
        <p className="text-gray-600">Test the course registration API endpoints</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Test Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                <input
                  type="number"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter course ID (e.g., 1)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Number</label>
                <input
                  type="text"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter student number (e.g., CS/2020/001)"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">API Tests</h3>
            <div className="space-y-2">
              {testCases.map((testCase, index) => (
                <button
                  key={index}
                  onClick={testCase.action}
                  disabled={loading}
                  className="w-full text-left px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {loading ? '⏳ Testing...' : testCase.label}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={clearResults}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Clear Results
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Test Results</h3>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto h-96 font-mono text-sm">
            {results || 'No tests run yet. Click on any test button to start testing the API endpoints.'}
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">API Endpoints Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Student Endpoints:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• GET /api/v1/students/courses/enrollment/available</li>
              <li>• POST /api/v1/students/course-registrations/register</li>
              <li>• GET /api/v1/students/course-registrations/my-courses</li>
              <li>• GET /api/v1/students/course-registrations/check/{'{courseId}'}</li>
              <li>• DELETE /api/v1/students/course-registrations/unregister/{'{courseId}'}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Admin Endpoints:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• GET /api/v1/students/course-registrations</li>
              <li>• GET /api/v1/students/course-registrations/student/{'{studentNumber}'}</li>
              <li>• GET /api/v1/students/course-registrations/course/{'{courseId}'}</li>
              <li>• GET /api/v1/courses</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Make sure your Spring Boot backend is running on http://localhost:8080</li>
            <li>• You need to be logged in to access the API endpoints</li>
            <li>• Admin endpoints require admin role</li>
            <li>• Some tests may fail if the course doesn't exist or you're already registered</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default APITestingComponent;
