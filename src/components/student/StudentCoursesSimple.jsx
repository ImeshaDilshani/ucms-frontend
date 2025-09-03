import React, { useState } from 'react';

const StudentCourses = () => {
  console.log('StudentCourses component is rendering - SIMPLE VERSION');
  
  const [loading] = useState(false);
  const [error] = useState('');
  const [courses] = useState([
    { 
      id: 1, 
      name: 'Introduction to Computer Science', 
      code: 'CS101',
      credits: 3,
      description: 'Basic computer science concepts',
      department: 'Computer Science',
      isAvailable: true 
    },
    { 
      id: 2, 
      name: 'Calculus I', 
      code: 'MATH101',
      credits: 4,
      description: 'Differential and integral calculus',
      department: 'Mathematics',
      isAvailable: true 
    }
  ]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading courses...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Browse Courses</h1>
      <p>Here you can browse and enroll in available courses.</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Available Courses ({courses.length})</h3>
        
        {courses.map((course) => (
          <div key={course.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            margin: '10px 0', 
            borderRadius: '8px',
            backgroundColor: 'white'
          }}>
            <h4>{course.code}: {course.name}</h4>
            <p><strong>Department:</strong> {course.department}</p>
            <p><strong>Credits:</strong> {course.credits}</p>
            <p>{course.description}</p>
            <div style={{ marginTop: '10px' }}>
              <button style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}>
                Enroll
              </button>
              <button style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
