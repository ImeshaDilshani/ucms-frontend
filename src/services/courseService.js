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
  }
};

export default courseService;
