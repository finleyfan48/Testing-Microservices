require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const users = []; // Simulated in-memory user store

const SECRET = process.env.JWT_SECRET || 'defaultsecret';

// ✅ Added for browser testing
app.get('/', (req, res) => {
  res.send(`
    <h1>User Service is Running</h1>
    <p>Registered Users: ${users.map(u => u.username).join(', ') || 'None yet'}</p>
    <p>Try POST /register and /login with JSON payloads using a tool like Postman or curl.</p>
  `);
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const token = auth.split(' ')[1];
    const user = jwt.verify(token, SECRET);
    res.json({ user });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`User Service running on port ${port}`));
