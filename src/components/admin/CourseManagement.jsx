import React, { useState, useEffect } from 'react';
import courseService from '../../services/courseService';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    credits: '',
    department: '',
    maxEnrollments: '',
    prerequisiteCodes: []
  });

  // Load all courses on component mount
  useEffect(() => {
    console.log('CourseManagement component mounted');
    loadCourses();
  }, []);

  const loadCourses = async () => {
    console.log('Loading courses...');
    setLoading(true);
    setError('');
    try {
      const data = await courseService.getAllCourses();
      console.log('Data received from courseService:', data);
      console.log('Is data an array?', Array.isArray(data));
      console.log('Data length:', data ? data.length : 'undefined');
      
      const coursesArray = Array.isArray(data) ? data : [];
      setCourses(coursesArray);
      console.log('Courses set to state:', coursesArray);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError('Failed to load courses: ' + (err.response?.data?.message || err.message));
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrerequisitesChange = (e) => {
    const value = e.target.value;
    const codes = value.split(',').map(code => code.trim()).filter(code => code);
    setFormData(prev => ({
      ...prev,
      prerequisiteCodes: codes
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      credits: '',
      department: '',
      maxEnrollments: '',
      prerequisiteCodes: []
    });
    setEditingCourse(null);
    setShowForm(false);
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Log the form data before processing
      console.log('Form data before processing:', formData);

      const courseData = {
        name: formData.name?.trim(),
        code: formData.code?.trim(),
        description: formData.description?.trim() || '',
        credits: parseInt(formData.credits),
        department: formData.department?.trim(),
        maxEnrollments: parseInt(formData.maxEnrollments),
        prerequisiteCodes: formData.prerequisiteCodes || []
      };

      console.log('Processed course data:', courseData);

      // Validate required fields
      if (!courseData.name || !courseData.code || !courseData.department) {
        throw new Error('Name, Code, and Department are required fields');
      }

      if (isNaN(courseData.credits) || courseData.credits < 1 || courseData.credits > 10) {
        throw new Error('Credits must be a number between 1 and 10');
      }

      if (isNaN(courseData.maxEnrollments) || courseData.maxEnrollments < 1) {
        throw new Error('Max Enrollments must be a number greater than 0');
      }

      if (editingCourse) {
        await courseService.updateCourse(editingCourse.id, courseData);
        setSuccess('Course updated successfully!');
      } else {
        await courseService.createCourse(courseData);
        setSuccess('Course created successfully!');
      }

      resetForm();
      await loadCourses();
    } catch (err) {
      console.error('Submit error:', err);
      
      let errorMessage = 'Failed to save course: ';
      
      if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error;
      } else if (err.response?.data) {
        errorMessage += JSON.stringify(err.response.data);
      } else if (err.message) {
        errorMessage += err.message;
      } else {
        errorMessage += 'Unknown error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      credits: course.credits.toString(),
      department: course.department,
      maxEnrollments: course.maxEnrollments.toString(),
      prerequisiteCodes: course.prerequisites?.map(p => p.code) || []
    });
    setShowForm(true);
    setSuccess('');
    setError('');
  };

  const handleDelete = async (course) => {
    if (!window.confirm(`Are you sure you want to delete "${course.name}"?`)) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      await courseService.deleteCourse(course.id);
      setSuccess(`Course "${course.name}" deleted successfully!`);
      await loadCourses();
    } catch (err) {
      setError('Failed to delete course: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadCourses();
      return;
    }

    setLoading(true);
    setError('');
    try {
      let data;
      if (searchType === 'id') {
        data = [await courseService.getCourseById(parseInt(searchQuery))];
      } else if (searchType === 'code') {
        data = [await courseService.getCourseByCode(searchQuery)];
      } else {
        data = await courseService.getAllCourses();
      }
      setCourses(Array.isArray(data) ? data : []);
      setSuccess(`Search completed. Found ${data.length} course(s).`);
    } catch (err) {
      setError('Failed to search courses: ' + (err.response?.data?.message || err.message));
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Course Management System</h2>
      <p>Complete CRUD operations for university courses</p>

      {/* Status Messages */}
      {loading && (
        <div style={{ 
          color: 'blue', 
          backgroundColor: '#e3f2fd', 
          padding: '10px', 
          border: '1px solid blue', 
          marginBottom: '20px' 
        }}>
          Loading...
        </div>
      )}
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '10px', 
          border: '1px solid red', 
          marginBottom: '20px' 
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div style={{ 
          color: 'green', 
          backgroundColor: '#e8f5e8', 
          padding: '10px', 
          border: '1px solid green', 
          marginBottom: '20px' 
        }}>
          <strong>Success:</strong> {success}
        </div>
      )}

      {/* Search Section */}
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
        <h3>Search Courses</h3>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '15px' }}>
            <input
              type="radio"
              value="all"
              checked={searchType === 'all'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            All Courses
          </label>
          <label style={{ marginRight: '15px' }}>
            <input
              type="radio"
              value="id"
              checked={searchType === 'id'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            Search by ID
          </label>
          <label>
            <input
              type="radio"
              value="code"
              checked={searchType === 'code'}
              onChange={(e) => setSearchType(e.target.value)}
            />
            Search by Code
          </label>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {searchType !== 'all' && (
            <input
              type="text"
              placeholder={`Enter course ${searchType}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px', width: '200px' }}
            />
          )}
          
          <button 
            onClick={searchType === 'all' ? loadCourses : handleSearch}
            disabled={loading}
            style={{ 
              backgroundColor: '#17a2b8', 
              color: 'white', 
              padding: '8px 15px', 
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Searching...' : (searchType === 'all' ? 'Load All' : 'Search')}
          </button>
        </div>
      </div>

      {/* Add/Edit Course Form Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
              setEditingCourse(null);
            }
          }}
          style={{ 
            backgroundColor: showForm ? '#6c757d' : '#28a745', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add New Course'}
        </button>
      </div>

      {/* Course Form */}
      {showForm && (
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #007bff', backgroundColor: '#f0f8ff' }}>
          <h3>{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Course Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Course Code:</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Credits:</label>
                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="10"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Max Enrollments:</label>
                <input
                  type="number"
                  name="maxEnrollments"
                  value={formData.maxEnrollments}
                  onChange={handleInputChange}
                  required
                  min="1"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Prerequisites (comma-separated codes):</label>
                <input
                  type="text"
                  value={formData.prerequisiteCodes.join(', ')}
                  onChange={handlePrerequisitesChange}
                  placeholder="e.g., CS101, MATH201"
                  style={{ width: '100%', padding: '8px' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  padding: '10px 20px', 
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginRight: '10px'
                }}
              >
                {loading ? 'Saving...' : (editingCourse ? 'Update Course' : 'Create Course')}
              </button>
              
              <button 
                type="button" 
                onClick={resetForm}
                style={{ 
                  backgroundColor: '#6c757d', 
                  color: 'white', 
                  padding: '10px 20px', 
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      <div>
        <h3>Available Courses ({courses.length})</h3>
        
        {!loading && courses.length === 0 && !error && (
          <div style={{ 
            padding: '20px', 
            border: '1px dashed #ccc', 
            textAlign: 'center',
            backgroundColor: '#f9f9f9'
          }}>
            <p>No courses found.</p>
          </div>
        )}
        
        {courses.map((course) => (
          <div 
            key={course.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '20px', 
              margin: '10px 0',
              backgroundColor: course.isActive ? '#f8f9fa' : '#ffe6e6',
              position: 'relative'
            }}
          >
            {/* Course Info */}
            <div style={{ paddingRight: '120px' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
                {course.name} ({course.code})
              </h4>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Description:</strong> {course.description || 'No description'}
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                <strong>Department:</strong> {course.department}
              </p>
              <div style={{ display: 'flex', gap: '20px', margin: '5px 0' }}>
                <span><strong>Credits:</strong> {course.credits}</span>
                <span><strong>Enrollments:</strong> {course.currentEnrollments || 0}/{course.maxEnrollments}</span>
                <span><strong>Status:</strong> {course.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              {course.prerequisites && course.prerequisites.length > 0 && (
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Prerequisites:</strong> {course.prerequisites.map(p => p.code).join(', ')}
                </p>
              )}
              <p style={{ margin: '5px 0', color: '#888', fontSize: '12px' }}>
                Created: {new Date(course.createdAt).toLocaleDateString()} | 
                Updated: {new Date(course.updatedAt).toLocaleDateString()}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              display: 'flex', 
              gap: '10px' 
            }}>
              <button 
                onClick={() => handleEdit(course)}
                disabled={loading}
                style={{ 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  padding: '8px 15px', 
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                Edit
              </button>
              
              <button 
                onClick={() => handleDelete(course)}
                disabled={loading}
                style={{ 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  padding: '8px 15px', 
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e9ecef', border: '1px solid #adb5bd' }}>
        <h4>System Status</h4>
        <p><strong>API Endpoint:</strong> http://localhost:8080/api/v1/courses</p>
        <p><strong>Total Courses:</strong> {courses.length}</p>
        <p><strong>Component Status:</strong> ✅ All CRUD Operations Available</p>
      </div>
    </div>
  );
};

export default CourseManagement;
