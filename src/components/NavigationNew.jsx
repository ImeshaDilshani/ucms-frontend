import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationNew = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'ADMIN':
        return '/admin/dashboard';
      case 'LECTURER':
        return '/lecturer/dashboard';
      case 'STUDENT':
        return '/student/dashboard';
      default:
        return '/';
    }
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: '/', label: 'Home', icon: '🏠' },
        { to: '/login', label: 'Sign In', icon: '🔑' },
        { to: '/register', label: 'Register', icon: '📝' }
      ];
    }

    switch (user?.role) {
      case 'ADMIN':
        return [
          { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
          { to: '/admin/courses', label: 'Courses', icon: '📚' },
          { to: '/admin/students', label: 'Students', icon: '👥' },
          { to: '/admin/results', label: 'Results', icon: '🏆' }
        ];
      case 'LECTURER':
        return [
          { to: '/lecturer/dashboard', label: 'Dashboard', icon: '📊' },
          { to: '/lecturer/courses', label: 'My Courses', icon: '📚' },
          { to: '/lecturer/grading', label: 'Grading', icon: '✅' }
        ];
      case 'STUDENT':
        return [
          { to: '/student/dashboard', label: 'Dashboard', icon: '📊' },
          { to: '/student/courses', label: 'My Courses', icon: '📚' },
          { to: '/student/enrollment', label: 'Enroll', icon: '➕' },
          { to: '/student/results', label: 'Results', icon: '📋' }
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Enhanced Logo */}
          <Link to={isAuthenticated ? getDashboardRoute() : '/'} className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white text-xl">🎓</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                UCMS
              </h1>
              <p className="text-xs text-gray-500 -mt-1">University Course Management</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {getNavLinks().map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            
            {isAuthenticated && (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {(user?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.firstName || user?.username}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg border-2 border-red-600 hover:border-red-700 transition-all duration-200 shadow-md"
                  style={{ minWidth: '100px' }}
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className={`block h-0.5 w-6 bg-blue-600 transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-blue-600 transform transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-blue-600 transform transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {getNavLinks().map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 border-t border-gray-200 mt-4 pt-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {(user?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      Welcome, {user?.firstName || user?.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg border-2 border-red-600 hover:border-red-700 transition-all duration-200 shadow-md font-bold"
                  >
                    <span className="text-xl">🚪</span>
                    <span className="font-bold">Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationNew;
