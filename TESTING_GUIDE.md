# UCMS Course Registration Testing Guide

This guide walks you through testing the course registration functionality step by step.

## 🚀 Prerequisites

### Backend Setup
1. **Start your Spring Boot application:**
   ```bash
   ./mvnw spring-boot:run
   ```
   Ensure it's running on `http://localhost:8080`

2. **Verify API is accessible:**
   Open `http://localhost:8080/api/v1/courses` in your browser (may require authentication)

### Frontend Setup
1. **Start the React development server:**
   ```bash
   cd ucms-ui
   npm run dev
   ```
   The app should open at `http://localhost:5173`

## 🧪 Testing Scenarios

### Scenario 1: Student Registration and Course Enrollment

#### Step 1: Create Student Account
1. Go to the registration page
2. Fill in student details:
   ```json
   {
     "username": "student001",
     "email": "student001@university.edu",
     "password": "password123",
     "indexNo": "CS/2020/001",
     "firstName": "John",
     "lastName": "Doe",
     "program": "Computer Science",
     "year": 2
   }
   ```
3. Submit registration
4. **Expected Result**: Account created successfully

#### Step 2: Student Login
1. Login with:
   - Username: `student001`
   - Password: `password123`
2. **Expected Result**: Redirected to Student Dashboard

#### Step 3: Browse Available Courses
1. Click on "Course Enrollment" tab
2. **Expected Result**: See list of available courses with enrollment buttons

#### Step 4: Register for a Course
1. Find a course you want to register for
2. Click "Register" button
3. **Expected Result**: 
   - Success message appears
   - Button changes to "Unregister"
   - Course appears in "My Courses" tab

#### Step 5: View My Registered Courses
1. Click on "My Courses" tab
2. **Expected Result**: See your registered courses with details

#### Step 6: Test Search and Filters
1. In "My Courses", try searching for course names
2. Use the filter dropdown to filter by status
3. **Expected Result**: Results update accordingly

#### Step 7: Unregister from Course
1. Click "Unregister" button on a registered course
2. Confirm the action
3. **Expected Result**: Course removed from your registered courses list

### Scenario 2: Admin Management Testing

#### Step 1: Admin Login
1. Login with admin credentials:
   - Username: `admin`
   - Password: `admin123`
2. **Expected Result**: Redirected to Admin Dashboard

#### Step 2: Create Test Course
1. Go to "Course Management" tab
2. Click "Add New Course"
3. Fill in course details:
   ```json
   {
     "code": "CS101",
     "name": "Introduction to Programming",
     "description": "Basic programming concepts and techniques",
     "credits": 3,
     "department": "Computer Science",
     "maxEnrollments": 50
   }
   ```
4. **Expected Result**: Course created and appears in the list

#### Step 3: View Course Registrations
1. Go to "Course Registrations" tab
2. **Expected Result**: See all student registrations

#### Step 4: Search Student Registrations
1. In "By Student" tab, enter student number: `CS/2020/001`
2. Click "Search Student"
3. **Expected Result**: See all courses registered by that student

#### Step 5: View Course-Specific Registrations
1. In "By Course" tab, select a course
2. Click "Get Registrations"
3. **Expected Result**: See all students registered for that course

### Scenario 3: API Testing

#### Step 1: Use Built-in API Tester
1. As admin, go to "API Testing" tab
2. **Expected Result**: See API testing interface

#### Step 2: Test Available Courses Endpoint
1. Click "Get Available Courses for Enrollment"
2. **Expected Result**: See JSON response with available courses

#### Step 3: Test Registration Endpoint
1. Enter a course ID (e.g., 1)
2. Click "Register for Course"
3. **Expected Result**: Success response or appropriate error message

#### Step 4: Test Error Scenarios
1. Try registering for the same course twice
2. Try registering for a non-existent course (ID: 999)
3. **Expected Results**: Appropriate error messages

## 🔍 Common Test Cases

### Test Case 1: Duplicate Registration Prevention
**Steps:**
1. Register for a course
2. Try to register for the same course again
**Expected:** Error message preventing duplicate registration

### Test Case 2: Course Capacity Limits
**Steps:**
1. Create a course with maxEnrollments = 1
2. Have two students try to register
**Expected:** Second student gets "course full" error

### Test Case 3: Registration Status Check
**Steps:**
1. Register for a course as student
2. Check registration status via API
**Expected:** Returns `true` for registered course, `false` for others

### Test Case 4: Unregistration
**Steps:**
1. Register for a course
2. Unregister from the course
3. Check if course is available for enrollment again
**Expected:** Course becomes available again

## 🐛 Debugging Guide

### Frontend Issues

#### Issue: API calls failing
**Check:**
1. Browser Network tab for failed requests
2. Console for error messages
3. Backend server is running on correct port

#### Issue: Authentication errors
**Check:**
1. localStorage for valid JWT token
2. Token expiration
3. User role permissions

#### Issue: UI not updating after API calls
**Check:**
1. State management in React components
2. useEffect dependencies
3. Error handling in API calls

### Backend Issues

#### Issue: CORS errors
**Solution:** Ensure CORS is configured to allow frontend origin

#### Issue: 401 Unauthorized
**Solution:** Check JWT token validity and user authentication

#### Issue: 404 Not Found
**Solution:** Verify API endpoints match the documented paths

## 📊 Test Data Setup

### Sample Courses
```json
[
  {
    "code": "CS101",
    "name": "Introduction to Programming",
    "description": "Basic programming concepts",
    "credits": 3,
    "department": "Computer Science",
    "maxEnrollments": 50
  },
  {
    "code": "MATH101", 
    "name": "Calculus I",
    "description": "Differential and integral calculus",
    "credits": 4,
    "department": "Mathematics",
    "maxEnrollments": 40
  }
]
```

### Sample Students
```json
[
  {
    "username": "student001",
    "email": "student001@university.edu",
    "indexNo": "CS/2020/001",
    "program": "Computer Science"
  },
  {
    "username": "student002", 
    "email": "student002@university.edu",
    "indexNo": "CS/2020/002",
    "program": "Computer Science"
  }
]
```

## 🎯 Performance Testing

### Load Testing Registration System
1. Create multiple student accounts
2. Simultaneously register for the same course
3. Monitor system performance and data consistency

### Stress Testing API Endpoints
1. Use the API testing panel to make rapid consecutive calls
2. Monitor response times and error rates
3. Check for memory leaks or performance degradation

## ✅ Testing Checklist

### Pre-Testing Setup
- [ ] Backend server running on localhost:8080
- [ ] Frontend server running on localhost:5173
- [ ] Database accessible and populated with test data
- [ ] Admin account available
- [ ] Test student accounts created

### Student Functionality
- [ ] Student registration works
- [ ] Student login successful
- [ ] Can view available courses
- [ ] Can register for courses
- [ ] Can view registered courses
- [ ] Can search and filter courses
- [ ] Can unregister from courses
- [ ] Error messages display correctly

### Admin Functionality  
- [ ] Admin login successful
- [ ] Can create/edit/delete courses
- [ ] Can view all registrations
- [ ] Can search by student
- [ ] Can view course-specific registrations
- [ ] API testing panel works

### Error Handling
- [ ] Duplicate registration prevented
- [ ] Invalid course ID handled
- [ ] Network errors handled gracefully
- [ ] Authentication errors handled
- [ ] Form validation works

### UI/UX
- [ ] Responsive design works on mobile
- [ ] Loading states display correctly
- [ ] Success messages appear
- [ ] Navigation is intuitive
- [ ] Search and filters work smoothly

## 📞 Support and Troubleshooting

If you encounter issues during testing:

1. **Check the browser console** for error messages
2. **Use the API Testing panel** to verify backend connectivity
3. **Check network requests** in browser developer tools
4. **Verify authentication** by checking localStorage tokens
5. **Confirm backend is running** and accessible

For additional support, refer to the main README.md file or create an issue in the project repository.
