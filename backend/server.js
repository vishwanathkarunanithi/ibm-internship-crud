const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allows frontend to connect
app.use(bodyParser.json()); // Allows us to read JSON data

// 1. Data Storage (Simulated Database)
let students = [
    { id: 1, name: "Vishwanath", dept: "ECE" }
];

// 2. ROUTES (The CRUD operations)

// READ (GET): Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// CREATE (POST): Add a new student
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1, // Auto-increment ID
        name: req.body.name,
        dept: req.body.dept
    };
    students.push(newStudent);
    res.status(201).json({ message: "Student added", student: newStudent });
});

// UPDATE (PUT): Update a student's details
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex !== -1) {
        students[studentIndex] = { id: id, ...req.body };
        res.json({ message: "Student updated", student: students[studentIndex] });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

// DELETE (DELETE): Remove a student
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.json({ message: "Student deleted" });
});

// 3. Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});