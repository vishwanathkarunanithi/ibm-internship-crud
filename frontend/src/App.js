import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);

  // This fetches data from your Node Engine
  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error connecting:", err));
  }, []);

  return (
    <div style={{ padding: "50px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>IBM Internship Task</h1>
      <h3>Student List</h3>
      
      {students.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {students.map((student) => (
            <li key={student.id} style={{ 
              background: "#f4f4f4", 
              margin: "10px auto", 
              padding: "10px", 
              width: "300px",
              borderRadius: "5px"
            }}>
              <strong>{student.name}</strong> <br/> 
              <span style={{color: "gray"}}>{student.dept}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading... (If this takes long, check if Backend is running!)</p>
      )}
    </div>
  );
}

export default App;