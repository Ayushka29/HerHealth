const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // CSS/JS files के लिए

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // ✅ अपना MySQL username डालें
  password: 'your_password', // ✅ अपना MySQL password डालें
  database: 'healthcare_db'
});

// Database से Connect करें
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.stack);
    return;
  }
  console.log('MySQL Connected! ✅ as ID', db.threadId);
});

// Signup Route
app.post('/signup', (req, res) => {
  const { name, email, contact, dob, user_type } = req.body;

  // Validation (Contact Number 10 digits?)
  if (!/^\d{10}$/.test(contact)) { // ✅ Regex सही किया
    return res.status(400).send('Contact number 10 digits का होना चाहिए!');
  }

  // Database में Data डालें
  const sql = 'INSERT INTO users (name, email, contact, dob, user_type) VALUES (?, ?, ?, ?, ?)';
  const values = [name, email, contact, dob, user_type];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).send(err.sqlMessage || 'Database Error! ❌');
    }
    console.log('New user ID:', result.insertId);
    res.send('Account बन गया! 🎉');
  });
});

// Server Start करें
app.listen(port, () => {
  console.log(`Server चल रहा है: http://localhost:${port}`);
}); // ✅ Closing parenthesis सही किया