const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// --- 1. DATA STORAGE (In-Memory Array) ---
// Note: This resets every time you restart the server
let students = [
    { id: 1, name: "Vishwanath", dept: "ECE", age: 21 },
    { id: 2, name: "Vijay", dept: "CSE", age: 22 },
    {
        id: 3,
        name: "Suriya",
        dept: "Mechanical",
        age: 23
    },
    {
        id: 4,
        name: "Rajesh",
        dept: "ECE",
        age: 20
    }
];

// --- 2. READ (GET Request) ---
app.get('/students', (req, res) => {
    res.json(students);
});

// --- 3. CREATE (POST Request) ---
app.post('/students', (req, res) => {
    const newStudent = req.body;

    // Basic validation: ensure name and dept exist
    if (!newStudent.name || !newStudent.dept) {
        return res.status(400).json({ msg: "Please include name and department" });
    }

    // Assign a new ID automatically
    newStudent.id = students.length + 1;
    
    // Add to the array
    students.push(newStudent);
    
    // Respond with the updated list
    res.json(students);
});

// --- 4. START SERVER (CRITICAL PART) ---
// This command keeps the server alive and listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// --- 5. UPDATE (PUT Request) ---
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the URL
    const updatedData = req.body; // Get the new data from Postman

    // Find the student in the list
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        // Update the student details
        students[index] = { ...students[index], ...updatedData };
        res.json(students); // Send back the updated list
    } else {
        res.status(404).json({ message: "Student not found!" });
    }
});