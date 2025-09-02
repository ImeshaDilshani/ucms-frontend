import React, { useState, useEffect } from 'react';
import courseService from '../../services/courseService';

const StudentCourses = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Search and filter states
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCredits, setSelectedCredits] = useState('');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Course details modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);

  useEffect(() => {
    loadCourses();
    extractDepartments();
  }, [currentPage, pageSize, selectedDepartment, showOnlyAvailable]);

  useEffect(() => {
    if (searchKeyword.trim()) {
      handleSearch();
    } else {
      loadCourses();
    }
  }, [searchKeyword]);

  const loadCourses = async () => {
    setLoading(true);
    setError('');
    
    try {
      let response;
      
      if (showOnlyAvailable) {
        if (selectedDepartment) {
          response = await courseService.getCoursesAvailableForEnrollmentByDepartment(selectedDepartment);
        } else {
          response = await courseService.getCoursesAvailableForEnrollment();
        }
        setCourses(Array.isArray(response) ? response : []);
        setTotalElements(Array.isArray(response) ? response.length : 0);
        setTotalPages(1);
      } else if (selectedDepartment) {
        response = await courseService.getCoursesByDepartment(selectedDepartment);
        setCourses(Array.isArray(response) ? response : []);
        setTotalElements(Array.isArray(response) ? response.length : 0);
        setTotalPages(1);
      } else {
        const filters = {
          page: currentPage,
          size: pageSize,
          sortBy: 'code',
          sortDir: 'asc'
        };
        
        if (selectedDepartment) {
          filters.department = selectedDepartment;
        }
        
        response = await courseService.getAvailableCoursesForStudents(filters);
        
        if (response && response.content) {
          setCourses(response.content);
          setTotalPages(response.totalPages);
          setTotalElements(response.totalElements);
        } else if (Array.isArray(response)) {
          setCourses(response);
          setTotalElements(response.length);
          setTotalPages(1);
        }
      }
      
      console.log('Loaded courses:', response);
    } catch (error) {
      console.error('Error loading courses:', error);
      if (error.response?.status === 401) {
        setError('Please log in to view courses.');
      } else if (error.response?.status === 403) {
        setError('You do not have permission to view courses.');
      } else {
        setError(`Failed to load courses: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadCourses();
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const filters = {
        page: 0,
        size: 100, // Get more results for search
        sortBy: 'code',
        sortDir: 'asc'
      };
      
      const response = await courseService.searchCourses(searchKeyword.trim(), filters);
      
      if (response && response.content) {
        setSearchResults(response.content);
        setCourses(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } else if (Array.isArray(response)) {
        setSearchResults(response);
        setCourses(response);
        setTotalElements(response.length);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error searching courses:', error);
      setError('Failed to search courses: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const extractDepartments = async () => {
    try {
      const allCourses = await courseService.getAllAvailableCoursesForStudents();
      const uniqueDepartments = [...new Set(allCourses.map(course => course.department))].filter(Boolean);
      setDepartments(uniqueDepartments.sort());
    } catch (error) {
      console.error('Error extracting departments:', error);
    }
  };

  const handleCourseDetails = async (course) => {
    try {
      const detailedCourse = await courseService.getStudentCourseDetailsById(course.id);
      setSelectedCourse(detailedCourse);
      setShowCourseDetails(true);
    } catch (error) {
      console.error('Error loading course details:', error);
      setError('Failed to load course details');
    }
  };

  const handleFilterByCredits = async () => {
    if (!selectedCredits) {
      loadCourses();
      return;
    }
    
    setLoading(true);
    try {
      const response = await courseService.getCoursesByCredits(parseInt(selectedCredits));
      setCourses(Array.isArray(response) ? response : []);
      setTotalElements(Array.isArray(response) ? response.length : 0);
      setTotalPages(1);
    } catch (error) {
      console.error('Error filtering by credits:', error);
      setError('Failed to filter courses by credits');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchKeyword('');
    setSelectedDepartment('');
    setSelectedCredits('');
    setShowOnlyAvailable(false);
    setCurrentPage(0);
    setSearchResults([]);
    loadCourses();
  };

  const renderFilters = () => (
    <div className="course-filters">
      <div className="filter-row">
        <div className="search-group">
          <input
            type="text"
            placeholder="Search courses by name or description..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary btn-sm"
            disabled={loading}
          >
            🔍 Search
          </button>
        </div>
      </div>
      
      <div className="filter-row">
        <div className="form-group">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="filter-select"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <select
            value={selectedCredits}
            onChange={(e) => setSelectedCredits(e.target.value)}
            className="filter-select"
          >
            <option value="">All Credits</option>
            <option value="1">1 Credit</option>
            <option value="2">2 Credits</option>
            <option value="3">3 Credits</option>
            <option value="4">4 Credits</option>
            <option value="5">5 Credits</option>
            <option value="6">6 Credits</option>
          </select>
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={showOnlyAvailable}
              onChange={(e) => setShowOnlyAvailable(e.target.checked)}
            />
            Available for Enrollment Only
          </label>
        </div>
        
        <button
          onClick={clearFilters}
          className="btn btn-secondary btn-sm"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    return (
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0 || loading}
          className="btn btn-secondary btn-sm"
        >
          Previous
        </button>
        
        <span className="pagination-info">
          Page {currentPage + 1} of {totalPages} ({totalElements} courses)
        </span>
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage >= totalPages - 1 || loading}
          className="btn btn-secondary btn-sm"
        >
          Next
        </button>
      </div>
    );
  };

  const renderCourseCard = (course) => (
    <div key={course.id} className="course-card">
      <div className="course-header">
        <h3>{course.code}</h3>
        <div className="course-badges">
          <span className={`enrollment-badge ${course.isAvailable ? 'available' : 'full'}`}>
            {course.isAvailable ? 'Available' : 'Full'}
          </span>
          <span className="credits-badge">{course.credits} Credits</span>
        </div>
      </div>
      
      <h4>{course.name}</h4>
      <p className="course-description">{course.description}</p>
      
      <div className="course-details">
        <div className="detail-row">
          <span className="detail-label">Department:</span>
          <span>{course.department}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Enrollment:</span>
          <span>{course.currentEnrollments}/{course.maxEnrollments}</span>
        </div>
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="detail-row">
            <span className="detail-label">Prerequisites:</span>
            <span>
              {course.prerequisites.map(prereq => prereq.code || prereq.name).join(', ')}
            </span>
          </div>
        )}
      </div>
      
      <div className="course-actions">
        <button
          onClick={() => handleCourseDetails(course)}
          className="btn btn-outline btn-sm"
        >
          View Details
        </button>
        {course.isAvailable && (
          <button
            className="btn btn-primary btn-sm"
            disabled={!course.isAvailable}
          >
            Enroll
          </button>
        )}
      </div>
    </div>
  );

  const renderCourseDetails = () => {
    if (!selectedCourse) return null;
    
    return (
      <div className="modal-overlay" onClick={() => setShowCourseDetails(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{selectedCourse.code} - {selectedCourse.name}</h3>
            <button 
              onClick={() => setShowCourseDetails(false)}
              className="modal-close"
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            <div className="course-info-section">
              <h4>Course Information</h4>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Department:</strong> {selectedCourse.department}
                </div>
                <div className="info-item">
                  <strong>Credits:</strong> {selectedCourse.credits}
                </div>
                <div className="info-item">
                  <strong>Enrollment:</strong> {selectedCourse.currentEnrollments}/{selectedCourse.maxEnrollments}
                </div>
                <div className="info-item">
                  <strong>Status:</strong> 
                  <span className={`status ${selectedCourse.isAvailable ? 'available' : 'full'}`}>
                    {selectedCourse.isAvailable ? 'Available for Enrollment' : 'Full'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="course-info-section">
              <h4>Description</h4>
              <p>{selectedCourse.description}</p>
            </div>
            
            {selectedCourse.prerequisites && selectedCourse.prerequisites.length > 0 && (
              <div className="course-info-section">
                <h4>Prerequisites</h4>
                <div className="prerequisites-list">
                  {selectedCourse.prerequisites.map((prereq, index) => (
                    <div key={index} className="prerequisite-item">
                      <strong>{prereq.code}</strong> - {prereq.name}
                      {prereq.credits && <span className="prereq-credits">({prereq.credits} credits)</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            {selectedCourse.isAvailable && (
              <button className="btn btn-primary">
                Enroll in Course
              </button>
            )}
            <button 
              onClick={() => setShowCourseDetails(false)}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCoursesList = () => {
    if (loading) {
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading courses...</p>
        </div>
      );
    }

    if (courses.length === 0) {
      return (
        <div className="no-courses-message">
          <div className="icon">📚</div>
          <h3>No Courses Found</h3>
          <p>
            {searchKeyword.trim() 
              ? `No courses found matching "${searchKeyword}"`
              : 'No courses are currently available.'
            }
          </p>
          {searchKeyword.trim() && (
            <button 
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Show All Courses
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="courses-container">
        <div className="courses-grid">
          {courses.map(course => renderCourseCard(course))}
        </div>
        {renderPagination()}
      </div>
    );
  };

  return (
    <div className="student-courses">
      <div className="courses-header">
        <h2>Course Catalog</h2>
        <p>Browse and explore available courses</p>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          <strong>Success:</strong> {successMessage}
        </div>
      )}

      {renderFilters()}
      {renderCoursesList()}
      {showCourseDetails && renderCourseDetails()}
    </div>
  );
};

export default StudentCourses;
