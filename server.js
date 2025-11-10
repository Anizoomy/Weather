require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const cors = require('cors');
const setupSwagger = require('./swagger/swagger');
const weatherRoutes = require('./routes/weatherRouter');

const app = express();

app.use(express.json());

app.use(cors());

setupSwagger(app);

app.use('/api/v1', weatherRoutes);

app.use('/', (req, res) => {
  res.send('Welcome to SkyPulse weather API');
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`, `and https://skypulse-g8pk.onrender.com`);
})