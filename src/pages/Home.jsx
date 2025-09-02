import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  if (isAuthenticated && user) {
    switch (user.role) {
      case 'ADMIN':
        window.location.href = '/admin/dashboard';
        break;
      case 'LECTURER':
        window.location.href = '/lecturer/dashboard';
        break;
      case 'STUDENT':
        window.location.href = '/student/dashboard';
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <header>
        <div>
          <div>
            <div>
              <h1>UCMS - University Course Management System</h1>
            </div>
            {!isAuthenticated && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        <div>
          <h2>Welcome to UCMS</h2>
          <p>
            Your comprehensive University Course Management System - empowering students, lecturers, and administrators with seamless academic management tools.
          </p>
        </div>

        <div>
          <div>
            <div>
              <h3>For Students</h3>
              <p>
                Access your courses, submit assignments, track academic progress, and connect with your learning community.
              </p>
              <ul>
                <li>Course enrollment & materials</li>
                <li>Assignment submission</li>
                <li>Grade tracking & progress</li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register">Join as Student</Link>
              )}
            </div>

            <div>
              <h3>For Lecturers</h3>
              <p>
                Manage courses, grade assignments, interact with students, and streamline your teaching workflow.
              </p>
              <ul>
                <li>Course & student management</li>
                <li>Assignment creation & grading</li>
                <li>Teaching schedule & materials</li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register">Join as Lecturer</Link>
              )}
            </div>

            <div>
              <h3>For Administrators</h3>
              <p>
                Oversee the entire system, manage users, courses, departments, and institutional settings.
              </p>
              <ul>
                <li>System & user management</li>
                <li>Reports & analytics</li>
                <li>Institutional settings</li>
              </ul>
              {!isAuthenticated && (
                <Link to="/register">Join as Admin</Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
