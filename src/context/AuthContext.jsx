import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (loginData) => {
    try {
      const response = await authService.login(loginData);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (registrationData, userType) => {
    try {
      let response;
      switch (userType) {
        case 'student':
          response = await authService.registerStudent(registrationData);
          break;
        case 'admin':
          response = await authService.registerAdmin(registrationData);
          break;
        case 'lecturer':
          response = await authService.registerLecturer(registrationData);
          break;
        default:
          throw new Error('Invalid user type');
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: authService.isAuthenticated(),
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
