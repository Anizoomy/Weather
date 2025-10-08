require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const cors = require('cors');
const weatherRoutes = require('./routes/weatherRouter');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1', weatherRoutes);

app.use('/', (req, res) => {
  res.send('Welcome To My Weather App');
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost: ${PORT}`);
})