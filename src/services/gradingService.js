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
    console.log('Grading API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Grading API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('Grading API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Grading API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const gradingService = {
  // LECTURER ENDPOINTS

  // Get all courses available for grading
  getGradableCourses: async () => {
    try {
      console.log('Fetching courses available for grading...');
      const response = await api.get('/lecturers/grading/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching gradable courses:', error);
      throw error;
    }
  },

  // Get enrolled students for a specific course
  getEnrolledStudents: async (courseId) => {
    try {
      console.log('Fetching enrolled students for course ID:', courseId);
      const response = await api.get(`/lecturers/grading/courses/${courseId}/students`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
      throw error;
    }
  },

  // Submit grade for a student
  submitGrade: async (gradeData) => {
    try {
      console.log('Submitting grade:', gradeData);
      const response = await api.post('/lecturers/grading/submit-grade', gradeData);
      return response.data;
    } catch (error) {
      console.error('Error submitting grade:', error);
      throw error;
    }
  },

  // Get all results for a specific course
  getCourseResults: async (courseId) => {
    try {
      console.log('Fetching results for course ID:', courseId);
      const response = await api.get(`/lecturers/grading/courses/${courseId}/results`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course results:', error);
      throw error;
    }
  },

  // Release results for a course
  releaseResults: async (courseId) => {
    try {
      console.log('Releasing results for course ID:', courseId);
      const response = await api.post(`/lecturers/grading/courses/${courseId}/release-results`);
      return response.data;
    } catch (error) {
      console.error('Error releasing results:', error);
      throw error;
    }
  },

  // STUDENT ENDPOINTS

  // Get my results (student)
  getMyResults: async () => {
    try {
      console.log('Fetching my results...');
      const response = await api.get('/students/results/my-results');
      return response.data;
    } catch (error) {
      console.error('Error fetching my results:', error);
      throw error;
    }
  },

  // ADMIN/LECTURER ENDPOINTS

  // Get results for a specific student by student number
  getStudentResults: async (studentNumber) => {
    try {
      console.log('Fetching results for student number:', studentNumber);
      const response = await api.get(`/students/results/student/${studentNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student results:', error);
      throw error;
    }
  },
};

export default gradingService;
