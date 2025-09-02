import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Course API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Course API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('Course API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Course API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const courseService = {
  // Create a new course
  createCourse: async (courseData) => {
    try {
      console.log('Creating course with data:', courseData);
      
      // Ensure the data format matches what the backend expects
      const formattedData = {
        name: courseData.name,
        code: courseData.code,
        description: courseData.description || '',
        credits: parseInt(courseData.credits),
        department: courseData.department,
        maxEnrollments: parseInt(courseData.maxEnrollments),
        // Handle prerequisites - they might need to be in a different format
        prerequisites: courseData.prerequisiteCodes && courseData.prerequisiteCodes.length > 0 
          ? courseData.prerequisiteCodes.map(code => ({ code: code.trim() }))
          : []
      };
      
      console.log('Formatted data being sent:', formattedData);
      
      const response = await api.post('/courses', formattedData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      throw error;
    }
  },

  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await api.get('/courses');
      console.log('Raw API response:', response.data);
      
      // Handle different response formats
      if (response.data && response.data.content && Array.isArray(response.data.content)) {
        // Paginated response format
        console.log('Found courses in content array:', response.data.content);
        return response.data.content;
      } else if (Array.isArray(response.data)) {
        // Direct array format
        console.log('Found courses in direct array:', response.data);
        return response.data;
      } else {
        console.log('Unexpected response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching all courses:', error);
      throw error;
    }
  },

  // Get course by ID
  getCourseById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course by ID:', error);
      throw error;
    }
  },

  // Get course by code
  getCourseByCode: async (code) => {
    try {
      const response = await api.get(`/courses/code/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course by code:', error);
      throw error;
    }
  },

  // Update course
  updateCourse: async (id, courseData) => {
    try {
      console.log('Updating course with ID:', id, 'data:', courseData);
      
      // Ensure the data format matches what the backend expects
      const formattedData = {
        name: courseData.name,
        code: courseData.code,
        description: courseData.description || '',
        credits: parseInt(courseData.credits),
        department: courseData.department,
        maxEnrollments: parseInt(courseData.maxEnrollments),
        // Handle prerequisites - they might need to be in a different format
        prerequisites: courseData.prerequisiteCodes && courseData.prerequisiteCodes.length > 0 
          ? courseData.prerequisiteCodes.map(code => ({ code: code.trim() }))
          : []
      };
      
      console.log('Formatted update data being sent:', formattedData);
      
      const response = await api.put(`/courses/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  // Delete course
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },

  // Student course viewing methods (new API endpoints)
  // Get all available courses with pagination
  getAvailableCoursesForStudents: async (filters = {}) => {
    try {
      const params = {
        page: filters.page || 0,
        size: filters.size || 20,
        sortBy: filters.sortBy || 'code',
        sortDir: filters.sortDir || 'asc'
      };
      
      if (filters.code) params.code = filters.code;
      if (filters.name) params.name = filters.name;
      if (filters.department) params.department = filters.department;
      
      console.log('Fetching available courses for students with params:', params);
      const response = await api.get('/students/courses', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching available courses for students:', error);
      throw error;
    }
  },

  // Get all available courses (simple list without pagination)
  getAllAvailableCoursesForStudents: async () => {
    try {
      console.log('Fetching all available courses for students...');
      const response = await api.get('/students/courses/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching all available courses for students:', error);
      throw error;
    }
  },

  // Get course details by ID
  getStudentCourseDetailsById: async (courseId) => {
    try {
      console.log('Fetching course details by ID:', courseId);
      const response = await api.get(`/students/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course details by ID:', error);
      throw error;
    }
  },

  // Get course details by code
  getStudentCourseDetailsByCode: async (code) => {
    try {
      console.log('Fetching course details by code:', code);
      const response = await api.get(`/students/courses/code/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course details by code:', error);
      throw error;
    }
  },

  // Search courses by keyword
  searchCourses: async (keyword, filters = {}) => {
    try {
      const params = {
        keyword,
        page: filters.page || 0,
        size: filters.size || 20,
        sortBy: filters.sortBy || 'code',
        sortDir: filters.sortDir || 'asc'
      };
      
      console.log('Searching courses with params:', params);
      const response = await api.get('/students/courses/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching courses:', error);
      throw error;
    }
  },

  // Get courses by department
  getCoursesByDepartment: async (department) => {
    try {
      console.log('Fetching courses by department:', department);
      const response = await api.get(`/students/courses/department/${encodeURIComponent(department)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses by department:', error);
      throw error;
    }
  },

  // Get courses by credits
  getCoursesByCredits: async (credits) => {
    try {
      console.log('Fetching courses by credits:', credits);
      const response = await api.get(`/students/courses/credits/${credits}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses by credits:', error);
      throw error;
    }
  },

  // Get courses available for enrollment
  getCoursesAvailableForEnrollment: async () => {
    try {
      console.log('Fetching courses available for enrollment...');
      const response = await api.get('/students/courses/enrollment/available');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses available for enrollment:', error);
      throw error;
    }
  },

  // Get courses available for enrollment by department
  getCoursesAvailableForEnrollmentByDepartment: async (department) => {
    try {
      console.log('Fetching courses available for enrollment by department:', department);
      const response = await api.get(`/students/courses/enrollment/available/department/${encodeURIComponent(department)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses available for enrollment by department:', error);
      throw error;
    }
  },

  // Check course enrollment availability
  checkCourseEnrollmentAvailability: async (courseId) => {
    try {
      console.log('Checking course enrollment availability for ID:', courseId);
      const response = await api.get(`/students/courses/${courseId}/enrollment/check`);
      return response.data;
    } catch (error) {
      console.error('Error checking course enrollment availability:', error);
      throw error;
    }
  }
};

export default courseService;
