const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory user and expense storage
const users = {}; // { username: password }
const expenses = {}; // { username: [ { amount, category, date }, ... ] }

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.json({ success: false, message: 'User already exists' });
  }
  users[username] = password;
  expenses[username] = [];
  res.json({ success: true });
});

app.get('/expenses', (req, res) => {
  const { username } = req.query;
  if (!expenses[username]) return res.status(401).json({ success: false });
  res.json(expenses[username]);
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username] === password) {
    return res.json({ success: true });
  }
  res.json({ success: false, message: 'Invalid credentials' });
});

app.post('/expenses', (req, res) => {
  const { username, amount, category, date, description } = req.body;
  if (!expenses[username]) return res.status(401).json({ success: false });
  const id = Date.now().toString();
  expenses[username].push({ id, amount, category, date, description });
  res.json({ success: true });
});

app.delete('/expenses/:username/:id', (req, res) => {
  const { username, id } = req.params;
  if (!expenses[username]) return res.status(404).json({ success: false });
  expenses[username] = expenses[username].filter(exp => exp.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});