const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve static files

let qsoLogs = []; // In-memory array to store QSO logs

// Endpoint to add a new QSO log
app.post('/qso', (req, res) => {
    const qsoLog = req.body;
    qsoLogs.push(qsoLog);
    res.status(201).send('QSO logged successfully');
});

// Endpoint to get all QSO logs
app.get('/qso', (req, res) => {
    res.status(200).json(qsoLogs);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
