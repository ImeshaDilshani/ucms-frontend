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
          {
            enrollmentId: 2,
            enrolledAt: '2025-09-02T16:45:00',
            course: {
              id: 2,
              code: 'MATH101',
              name: 'Calculus I',
              description: 'Differential and integral calculus',
              credits: 4,
              department: 'Mathematics',
              maxEnrollments: 40,
              currentEnrollments: 30,
              isActive: true
            }
          },
          {
            enrollmentId: 3,
            enrolledAt: '2025-09-02T09:15:00',
            course: {
              id: 3,
              code: 'ENG102',
              name: 'English Composition',
              description: 'Writing and communication skills',
              credits: 3,
              department: 'English',
              maxEnrollments: 35,
              currentEnrollments: 20,
              isActive: true
            }
          }
        ]);
      } else {
        setError('Failed to load your enrolled courses. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyCourses();
  }, []);

  const handleViewDetails = async (enrollment) => {
    try {
      // For the detailed view, we can use the enrollment data we already have
      // Plus get enrollment count for additional info
      const enrollmentCount = await courseService.getCourseEnrollmentCount(enrollment.course.id);
      setSelectedCourse({ 
        ...enrollment, 
        course: { 
          ...enrollment.course, 
          currentEnrollments: enrollmentCount.enrollmentCount 
        } 
      });
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Error loading course details:', err);
      // Show basic details if API call fails
      setSelectedCourse(enrollment);
      setShowDetailsModal(true);
    }
  };

  const handleUnenroll = async (enrollment) => {
    if (!window.confirm(`Are you sure you want to unenroll from ${enrollment.course.name}? This action cannot be undone.`)) {
      return;
    }

    try {
      setUnenrolling(prev => ({ ...prev, [enrollment.course.id]: true }));
      
      // Get current user information
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const studentNumber = user.username || user.studentNumber || user.id;
      
      if (!studentNumber) {
        alert('Student information not found. Please log in again.');
        return;
      }
      
      await courseService.unenrollStudentFromCourse(studentNumber, enrollment.course.id);
      
      // Remove the course from local state after successful unenrollment
      setEnrolledCourses(prev => prev.filter(c => c.course.id !== enrollment.course.id));
      
      alert('Successfully unenrolled from the course!');
    } catch (err) {
      console.error('Error unenrolling from course:', err);
      
      let errorMessage = 'Failed to unenroll from course. ';
      if (err.response?.status === 400) {
        errorMessage += 'You may not be allowed to unenroll at this time.';
      } else if (err.response?.status === 404) {
        errorMessage += 'Course enrollment not found.';
      } else {
        errorMessage += 'Please try again.';
      }
      
      alert(errorMessage);
    } finally {
      setUnenrolling(prev => ({ ...prev, [enrollment.course.id]: false }));
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalCredits = () => {
    return enrolledCourses.reduce((total, course) => total + (course.course?.credits || 0), 0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading your courses...</div>
      </div>
    );
  }

  return (
    <div className="my-courses">
      <div className="my-courses-header">
        <h2>My Courses</h2>
        <p>View and manage your enrolled courses for the current semester</p>
        <div className="enrollment-summary">
          <span className="total-courses">📚 {enrolledCourses.length} Course{enrolledCourses.length !== 1 ? 's' : ''}</span>
          <span className="total-credits">🎓 {getTotalCredits()} Total Credits</span>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
          <button onClick={loadMyCourses} style={{ marginLeft: '10px' }}>
            Try Again
          </button>
        </div>
      )}

      {enrolledCourses.length === 0 ? (
        <div className="no-courses">
          <div className="empty-state">
            <span style={{ fontSize: '48px' }}>📚</span>
            <h3>No enrolled courses found</h3>
            <p>You are not currently enrolled in any courses. Browse course offerings to enroll in courses.</p>
          </div>
        </div>
      ) : (
        <div className="courses-list">
          {enrolledCourses.map((enrollment) => (
            <div key={enrollment.enrollmentId || enrollment.course.id} className="my-course-card">
              <div className="course-header">
                <div className="course-info">
                  <h3>{enrollment.course.code}: {enrollment.course.name}</h3>
                  <p className="course-description">{enrollment.course.description}</p>
                  <div className="course-meta">
                    <span className="department">🏛️ {enrollment.course.department}</span>
                    <span className="credits">🎓 {enrollment.course.credits} Credits</span>
                    <span className="semester">📅 {enrollment.semester}</span>
                  </div>
                </div>
                <div className="enrollment-status">
                  <span className="status-badge enrolled">✅ Enrolled</span>
                </div>
              </div>

              <div className="course-details">
                {enrollment.instructor && (
                  <div className="instructor-info">
                    <strong>👨‍🏫 Instructor:</strong> {enrollment.instructor.name}
                    <br />
                    <strong>📧 Email:</strong> {enrollment.instructor.email}
                  </div>
                )}
                
                <div className="enrollment-info">
                  <strong>📝 Enrolled:</strong> {formatDateTime(enrollment.enrolledAt)}
                  {enrollment.grade && (
                    <div><strong>📊 Grade:</strong> {enrollment.grade}</div>
                  )}
                </div>
              </div>

              <div className="course-actions">
                <button
                  className="view-details-button"
                  onClick={() => handleViewDetails(enrollment)}
                >
                  👁️ View Details
                </button>
                
                <button
                  className="unenroll-button"
                  onClick={() => handleUnenroll(enrollment)}
                  disabled={unenrolling[enrollment.course.id]}
                >
                  {unenrolling[enrollment.course.id] ? 'Unenrolling...' : '🚫 Unenroll'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Details Modal */}
      {showDetailsModal && selectedCourse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedCourse.course.code}: {selectedCourse.course.name}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDetailsModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="course-detail-section">
                <h4>Course Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Course Code</strong>
                    <span>{selectedCourse.course.code}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Credits</strong>
                    <span>{selectedCourse.course.credits}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Department</strong>
                    <span>{selectedCourse.course.department}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Semester</strong>
                    <span>{selectedCourse.semester}</span>
                  </div>
                </div>
                
                <div style={{ marginTop: '15px' }}>
                  <strong>Description:</strong>
                  <p style={{ marginTop: '5px', lineHeight: '1.5' }}>{selectedCourse.course.description}</p>
                </div>
              </div>

              {selectedCourse.instructor && (
                <div className="course-detail-section">
                  <h4>Instructor Information</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <strong>Name</strong>
                      <span>{selectedCourse.instructor.name}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Email</strong>
                      <span>{selectedCourse.instructor.email}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="course-detail-section">
                <h4>Enrollment Details</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Enrollment Date</strong>
                    <span>{formatDateTime(selectedCourse.enrollmentDate)}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Status</strong>
                    <span className="status-badge enrolled">Enrolled</span>
                  </div>
                </div>
                
                {selectedCourse.grade && (
                  <div style={{ marginTop: '15px' }}>
                    <strong>Current Grade:</strong> {selectedCourse.grade}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </button>
              <button 
                className="unenroll-button"
                onClick={() => {
                  setShowDetailsModal(false);
                  handleUnenroll(selectedCourse);
                }}
                disabled={unenrolling[selectedCourse.courseId]}
              >
                {unenrolling[selectedCourse.courseId] ? 'Unenrolling...' : '🚫 Unenroll'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
