const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Dockerized Node.js!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status1: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

app.post('/echo', (req, res) => {
  res.json({
    message: 'Echo endpoint',
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
