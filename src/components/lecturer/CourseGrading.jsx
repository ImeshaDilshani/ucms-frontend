import React, { useState, useEffect } from 'react';
import gradingService from '../../services/gradingService';

const CourseGrading = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('grade'); // 'grade' or 'results'

  // Fetch available courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const coursesData = await gradingService.getGradableCourses();
      setCourses(coursesData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = async (course) => {
    setSelectedCourse(course);
    setActiveTab('grade');
    await Promise.all([
      fetchStudents(course.id),
      fetchResults(course.id)
    ]);
  };

  const fetchStudents = async (courseId) => {
    try {
      setLoading(true);
      const studentsData = await gradingService.getEnrolledStudents(courseId);
      setStudents(studentsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async (courseId) => {
    try {
      const resultsData = await gradingService.getCourseResults(courseId);
      setResults(resultsData);
    } catch (err) {
      console.error('Error fetching results:', err);
    }
  };

  const handleGradeSubmit = async (studentId, marks, remarks) => {
    try {
      const gradeData = {
        studentId,
        courseId: selectedCourse.id,
        marks: parseFloat(marks),
        remarks
      };

      await gradingService.submitGrade(gradeData);
      
      // Refresh students and results after grading
      await Promise.all([
        fetchStudents(selectedCourse.id),
        fetchResults(selectedCourse.id)
      ]);

      setError(null);
    } catch (err) {
      setError('Failed to submit grade');
      console.error('Error submitting grade:', err);
    }
  };

  const handleReleaseResults = async () => {
    if (!selectedCourse) return;
    
    try {
      await gradingService.releaseResults(selectedCourse.id);
      await fetchResults(selectedCourse.id);
      setError(null);
      alert('Results released successfully!');
    } catch (err) {
      setError('Failed to release results');
      console.error('Error releasing results:', err);
    }
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'text-green-700 bg-green-100',
      'A': 'text-green-600 bg-green-50',
      'A-': 'text-blue-600 bg-blue-50',
      'B+': 'text-blue-500 bg-blue-50',
      'B': 'text-yellow-600 bg-yellow-50',
      'B-': 'text-yellow-500 bg-yellow-50',
      'C+': 'text-orange-600 bg-orange-50',
      'C': 'text-orange-500 bg-orange-50',
      'C-': 'text-red-500 bg-red-50',
      'D': 'text-red-600 bg-red-100',
      'F': 'text-red-700 bg-red-100'
    };
    return gradeColors[grade] || 'text-gray-600 bg-gray-50';
  };

  if (loading && !selectedCourse) {
    return <div className="text-center py-8">Loading courses...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Grading</h2>
        <p className="text-gray-600">Grade students and manage course results</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!selectedCourse ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select a Course to Grade</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseSelect(course)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900">{course.code}</h4>
                  <p className="text-gray-600 text-sm mt-1">{course.name}</p>
                  <p className="text-gray-500 text-xs mt-2">{course.department}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-500">Credits: {course.credits}</span>
                    <span className="text-sm text-blue-600">
                      {course.currentEnrollments}/{course.maxEnrollments} enrolled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedCourse.code} - {selectedCourse.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{selectedCourse.department}</p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back to Courses
              </button>
            </div>
            
            <div className="mt-4">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('grade')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'grade'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Grade Students ({students.length})
                </button>
                <button
                  onClick={() => setActiveTab('results')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'results'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  View Results ({results.length})
                </button>
              </nav>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'grade' && (
              <StudentGradingTab
                students={students}
                onGradeSubmit={handleGradeSubmit}
                loading={loading}
              />
            )}
            
            {activeTab === 'results' && (
              <CourseResultsTab
                results={results}
                onReleaseResults={handleReleaseResults}
                getGradeColor={getGradeColor}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Component for grading students
const StudentGradingTab = ({ students, onGradeSubmit, loading }) => {
  const [gradingData, setGradingData] = useState({});

  const handleInputChange = (studentId, field, value) => {
    setGradingData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const handleSubmitGrade = (studentId) => {
    const data = gradingData[studentId];
    if (!data?.marks) {
      alert('Please enter marks');
      return;
    }
    
    const marks = parseFloat(data.marks);
    if (marks < 0 || marks > 100) {
      alert('Marks must be between 0 and 100');
      return;
    }

    onGradeSubmit(studentId, marks, data.remarks || '');
    
    // Clear the form
    setGradingData(prev => ({
      ...prev,
      [studentId]: { marks: '', remarks: '' }
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading students...</div>;
  }

  if (students.length === 0) {
    return <div className="text-center py-8 text-gray-500">No students enrolled in this course</div>;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900">Grade Students</h4>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.studentId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                  <div className="text-sm text-gray-500">{student.studentNumber}</div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.program}</div>
                  <div className="text-sm text-gray-500">Year {student.year}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.hasGrade ? (
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        student.existingResult?.grade === 'A+' || student.existingResult?.grade === 'A' 
                          ? 'bg-green-100 text-green-800'
                          : student.existingResult?.grade?.startsWith('B')
                          ? 'bg-blue-100 text-blue-800'
                          : student.existingResult?.grade?.startsWith('C')
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.existingResult?.grade}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {student.existingResult?.marks}%
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Not graded</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="0-100"
                    value={gradingData[student.studentId]?.marks || ''}
                    onChange={(e) => handleInputChange(student.studentId, 'marks', e.target.value)}
                    className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    placeholder="Optional remarks"
                    value={gradingData[student.studentId]?.remarks || ''}
                    onChange={(e) => handleInputChange(student.studentId, 'remarks', e.target.value)}
                    className="w-32 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleSubmitGrade(student.studentId)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    {student.hasGrade ? 'Update' : 'Grade'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Component for viewing course results
const CourseResultsTab = ({ results, onReleaseResults, getGradeColor }) => {
  const releasedResults = results.filter(r => r.isReleased);
  const unreleasedResults = results.filter(r => !r.isReleased);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-gray-900">Course Results</h4>
        {unreleasedResults.length > 0 && (
          <button
            onClick={onReleaseResults}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Release All Results ({unreleasedResults.length})
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No grades submitted yet</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Graded Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.studentName}</div>
                    <div className="text-sm text-gray-500">{result.studentNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.marks}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(result.grade)}`}>
                      {result.gradeDisplay}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={result.remarks}>
                      {result.remarks || 'No remarks'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      result.isReleased ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {result.isReleased ? 'Released' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(result.gradedAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(result.gradedAt).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseGrading;
