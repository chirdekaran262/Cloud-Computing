const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3001;

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'cglab', // replace with your MySQL password
    database: 'karan'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Define a route to get student details
app.get('/api/student/:s_id', (req, res) => {
    const studentId = req.params.id;

    const query = 'SELECT * FROM students WHERE s_id = ?';
    connection.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }

        res.json(results[0]);
    });
});

app.listen(port, () => {
    console.log(`API server is running at http://localhost:${port}`);
});

