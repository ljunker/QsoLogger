const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/qsoLogger', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Mongoose schema for QSO logs
const qsoSchema = new mongoose.Schema({
    callSign: String,
    frequency: String,
    qth: String,
    loc: String,
    rappport: Number,
    signal: Number,
    mode: String,
    date: { type: Date, default: Date.now }
});

// Create a model from the schema
const QSO = mongoose.model('QSO', qsoSchema);

// Endpoint to add a new QSO log
app.post('/qso', async (req, res) => {
    try {
        const newQSO = new QSO(req.body);
        await newQSO.save();
        res.status(201).send('QSO logged successfully');
    } catch (error) {
        res.status(500).send('Error saving QSO');
    }
});

// Endpoint to get all QSO logs
app.get('/qso', async (req, res) => {
    try {
        const qsoLogs = await QSO.find({});
        res.status(200).json(qsoLogs);
    } catch (error) {
        res.status(500).send('Error retrieving QSOs');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
