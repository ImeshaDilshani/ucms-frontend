# UCMS Frontend - University Course Management System

A modern, responsive React frontend for the University Course Management System with comprehensive course registration functionality.

## 🚀 Features

### Student Features
- **Course Enrollment**: Browse and register for available courses
- **My Courses**: View and manage registered courses with filtering and search
- **Course Browser**: Explore all available courses with detailed information
- **Registration Management**: Register/unregister from courses with real-time validation
- **Dashboard Overview**: Quick access to all student functions

### Admin Features
- **Course Management**: Create, update, and delete courses
- **Registration Management**: View and manage all student course registrations
- **Student Search**: Find specific student registrations
- **Course-specific Registrations**: View registrations for specific courses
- **API Testing Panel**: Test all API endpoints directly from the admin dashboard

### Technical Features
- **Responsive Design**: Modern Tailwind CSS styling
- **Real-time Updates**: Automatic data refresh and state management
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **JWT Authentication**: Secure authentication with token management
- **API Integration**: Full integration with Spring Boot backend APIs

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **Vite**: Fast build tool and dev server

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Spring Boot backend running on `http://localhost:8080`
- Modern web browser with JavaScript enabled

## 🚦 Getting Started

### 1. Clone and Install
```bash
git clone <repository-url>
cd ucms-ui
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🔗 API Integration

### Backend Requirements
The frontend requires a Spring Boot backend with the following endpoints:

#### Authentication Endpoints
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

#### Course Registration Endpoints (Student)
- `GET /api/v1/students/courses/enrollment/available` - Get available courses
- `POST /api/v1/students/course-registrations/register` - Register for course
- `GET /api/v1/students/course-registrations/my-courses` - Get my registered courses
- `GET /api/v1/students/course-registrations/check/{courseId}` - Check registration status
- `DELETE /api/v1/students/course-registrations/unregister/{courseId}` - Unregister from course

#### Course Registration Endpoints (Admin)
- `GET /api/v1/students/course-registrations` - Get all registrations
- `GET /api/v1/students/course-registrations/student/{studentNumber}` - Get student registrations
- `GET /api/v1/students/course-registrations/course/{courseId}` - Get course registrations

#### Course Management Endpoints
- `GET /api/v1/courses` - Get all courses
- `POST /api/v1/courses` - Create course (admin)
- `PUT /api/v1/courses/{id}` - Update course (admin)
- `DELETE /api/v1/courses/{id}` - Delete course (admin)

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── CourseManagement.jsx
│   │   ├── CourseRegistrationManagement.jsx
│   │   └── APITestingComponent.jsx
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── UcmsRegister.jsx
│   ├── student/
│   │   ├── CourseEnrollment.jsx
│   │   ├── MyCourses.jsx
│   │   ├── MyCoursesNew.jsx
│   │   └── StudentCourses.jsx
│   └── ErrorBoundary.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── AdminDashboard.jsx
│   ├── StudentDashboard.jsx
│   ├── LecturerDashboard.jsx
│   └── Home.jsx
├── services/
│   ├── authService.js
│   ├── courseService.js
│   └── courseRegistrationService.js
└── utils/
    └── ProtectedRoute.jsx
```

## 🎯 Usage Guide

### For Students

1. **Login**: Use your student credentials to access the system
2. **Browse Courses**: Navigate to "Browse Courses" to see all available courses
3. **Enroll in Courses**: 
   - Go to "Course Enrollment" tab
   - Browse available courses
   - Click "Register" on desired courses
4. **Manage Registrations**:
   - Visit "My Courses" to see registered courses
   - Use search and filters to find specific courses
   - Unregister from courses if needed

### For Administrators

1. **Course Management**: Create, update, and manage all courses
2. **Registration Oversight**: 
   - View all student registrations
   - Search by student number or course
   - Monitor enrollment statistics
3. **API Testing**: Use the built-in API testing panel to verify endpoints

## 🔧 Configuration

### Authentication
The app uses JWT tokens stored in localStorage:
- `accessToken`: Main authentication token
- `refreshToken`: Token refresh capability
- `user`: User profile information

### API Configuration
API base URL and interceptors are configured in service files:
- Automatic token attachment to requests
- Request/response logging for debugging
- Error handling with user-friendly messages

## 🎨 Styling

The application uses Tailwind CSS for styling with:
- Responsive design patterns
- Modern component styling
- Consistent color scheme
- Accessible UI components

## 🚨 Error Handling

Comprehensive error handling includes:
- Network error handling
- 401/403 authentication errors
- Validation error display
- User-friendly error messages
- Automatic error recovery

## 📱 Responsive Design

The interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen orientations

## 🧪 Testing the API

Use the built-in API Testing Component (Admin > API Testing) to:
1. Test all course registration endpoints
2. Verify API connectivity
3. Debug request/response data
4. Validate authentication flows

## 🔒 Security Features

- JWT token-based authentication
- Protected routes based on user roles
- Automatic token refresh
- Secure API communication
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:
1. Check the API Testing panel for connectivity issues
2. Verify backend server is running
3. Check browser console for error messages
4. Refer to the comprehensive error messages in the UI

## 🔄 Updates and Maintenance

Regular updates include:
- New feature additions
- Bug fixes
- Security updates
- Performance improvements
- UI/UX enhancements
