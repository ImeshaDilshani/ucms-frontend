import React, { useState, useEffect } from 'react';
import gradingService from '../../services/gradingService';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyResults();
  }, []);

  const fetchMyResults = async () => {
    try {
      setLoading(true);
      const resultsData = await gradingService.getMyResults();
      setResults(resultsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch your results');
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A+': 'text-green-700 bg-green-100 border-green-200',
      'A': 'text-green-600 bg-green-50 border-green-200',
      'A-': 'text-blue-600 bg-blue-50 border-blue-200',
      'B+': 'text-blue-500 bg-blue-50 border-blue-200',
      'B': 'text-yellow-600 bg-yellow-50 border-yellow-200',
      'B-': 'text-yellow-500 bg-yellow-50 border-yellow-200',
      'C+': 'text-orange-600 bg-orange-50 border-orange-200',
      'C': 'text-orange-500 bg-orange-50 border-orange-200',
      'C-': 'text-red-500 bg-red-50 border-red-200',
      'D': 'text-red-600 bg-red-100 border-red-200',
      'F': 'text-red-700 bg-red-100 border-red-200'
    };
    return gradeColors[grade] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getGradeDescription = (grade) => {
    const descriptions = {
      'A+': 'Excellent',
      'A': 'Very Good',
      'A-': 'Good',
      'B+': 'Above Average',
      'B': 'Average',
      'B-': 'Below Average',
      'C+': 'Satisfactory',
      'C': 'Pass',
      'C-': 'Marginal Pass',
      'D': 'Poor',
      'F': 'Fail'
    };
    return descriptions[grade] || 'Unknown';
  };

  const calculateGPA = () => {
    if (results.length === 0) return 0;
    
    const gradePoints = {
      'A+': 4.3, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    results.forEach(result => {
      const points = gradePoints[result.grade] || 0;
      totalPoints += points * result.credits;
      totalCredits += result.credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  const getTotalCredits = () => {
    return results.reduce((total, result) => total + result.credits, 0);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Academic Results</h2>
        <p className="text-gray-600">View your course grades and academic performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current GPA</p>
              <p className="text-2xl font-bold text-gray-900">{calculateGPA()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">🎓</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Credits</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalCredits()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">📝</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Courses Completed</p>
              <p className="text-2xl font-bold text-gray-900">{results.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Course Results</h3>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Available</h3>
            <p className="text-gray-500">Your course results will appear here once they are released by your lecturers.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
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
                    Lecturer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Released Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{result.courseCode}</div>
                      <div className="text-sm text-gray-500">{result.courseName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{result.credits}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{result.marks}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getGradeColor(result.grade)}`}>
                          {result.gradeDisplay}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({getGradeDescription(result.grade)})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs" title={result.remarks}>
                        {result.remarks || (
                          <span className="text-gray-400 italic">No remarks</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{result.lecturerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(result.releasedAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(result.releasedAt).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grade Scale Reference */}
      {results.length > 0 && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Grade Scale Reference</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { grade: 'A+', range: '85-100', points: '4.3' },
              { grade: 'A', range: '80-84', points: '4.0' },
              { grade: 'A-', range: '75-79', points: '3.7' },
              { grade: 'B+', range: '70-74', points: '3.3' },
              { grade: 'B', range: '65-69', points: '3.0' },
              { grade: 'B-', range: '60-64', points: '2.7' },
              { grade: 'C+', range: '55-59', points: '2.3' },
              { grade: 'C', range: '50-54', points: '2.0' },
              { grade: 'C-', range: '45-49', points: '1.7' },
              { grade: 'D', range: '40-44', points: '1.0' },
              { grade: 'F', range: '0-39', points: '0.0' },
            ].map((item) => (
              <div key={item.grade} className="text-center">
                <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getGradeColor(item.grade)}`}>
                  {item.grade}
                </div>
                <div className="text-xs text-gray-600 mt-1">{item.range}%</div>
                <div className="text-xs text-gray-500">{item.points} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResults;
