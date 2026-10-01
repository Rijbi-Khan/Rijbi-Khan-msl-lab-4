const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON & static content delivery
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Root route handler
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API status health check endpoint
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        serverTime: new Date().toISOString(),
        lab: 'MSL LAB 4 - Express Server'
    });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 MSL LAB 4 Server is running on port ${PORT}`);
    console.log(`🌐 Local Access: http://localhost:${PORT}`);
    console.log(`=================================================`);
});
