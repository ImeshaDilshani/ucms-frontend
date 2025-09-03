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
    console.log('Course Registration API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Course Registration API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('Course Registration API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Course Registration API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const courseRegistrationService = {
  // Get available courses for enrollment
  getAvailableCoursesForEnrollment: async () => {
    try {
      console.log('Fetching courses available for enrollment...');
      const response = await api.get('/students/courses/enrollment/available');
      return response.data;
    } catch (error) {
      console.error('Error fetching courses available for enrollment:', error);
      throw error;
    }
  },

  // Register for a course
  registerForCourse: async (courseId) => {
    try {
      console.log('Registering for course with ID:', courseId);
      const response = await api.post('/students/course-registrations/register', {
        courseId: courseId
      });
      return response.data;
    } catch (error) {
      console.error('Error registering for course:', error);
      if (error.response?.status === 400) {
        // Handle specific error cases
        const errorMessage = error.response?.data?.message || 'Registration failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  // Get my registered courses
  getMyRegisteredCourses: async () => {
    try {
      console.log('Fetching my registered courses...');
      const response = await api.get('/students/course-registrations/my-courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching my registered courses:', error);
      throw error;
    }
  },

  // Check registration status for a course
  checkRegistrationStatus: async (courseId) => {
    try {
      console.log('Checking registration status for course ID:', courseId);
      const response = await api.get(`/students/course-registrations/check/${courseId}`);
      return response.data; // Returns boolean
    } catch (error) {
      console.error('Error checking registration status:', error);
      throw error;
    }
  },

  // Unregister from a course
  unregisterFromCourse: async (courseId) => {
    try {
      console.log('Unregistering from course with ID:', courseId);
      const response = await api.delete(`/students/course-registrations/unregister/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error unregistering from course:', error);
      throw error;
    }
  },

  // Get student registrations (admin endpoint)
  getStudentRegistrations: async (studentNumber) => {
    try {
      console.log('Fetching registrations for student:', studentNumber);
      const response = await api.get(`/students/course-registrations/student/${studentNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student registrations:', error);
      throw error;
    }
  },

  // Get all course registrations (admin endpoint)
  getAllCourseRegistrations: async (page = 0, size = 20) => {
    try {
      console.log('Fetching all course registrations...');
      const response = await api.get(`/students/course-registrations`, {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all course registrations:', error);
      throw error;
    }
  },

  // Get registrations for a specific course (admin endpoint)
  getCourseRegistrations: async (courseId) => {
    try {
      console.log('Fetching registrations for course ID:', courseId);
      const response = await api.get(`/students/course-registrations/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course registrations:', error);
      throw error;
    }
  }
};

export default courseRegistrationService;
