require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const cors = require('cors');
const setupSwagger = require('./swagger/swagger');
const userRoutes = require('./routes/userRouter');
const weatherRoutes = require('./routes/weatherRouter');

const app = express();

app.use(express.json());

app.use(cors());

setupSwagger(app);

app.use('/api/v1', weatherRoutes);
app.use('/api/v1', userRoutes);

app.use('/', (req, res) => {
  res.send('Welcome to SkyPulse weather API');
});

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`, `and https://skypulse-g8pk.onrender.com`);
    })
})
.catch(err => {
    console.log('Error connecting to database', err);
})
// app.listen(PORT, () => {
//     console.log(`server running on http://localhost:${PORT}`, `and https://skypulse-g8pk.onrender.com`);
// })