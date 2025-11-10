const router = require('express').Router();
const { weather } = require('../controllers/weatherController');


/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Get weather information for a city
 *     description: Returns live weather data such as temperature, condition, and wind speed for a given city.
 *     tags:
 *       - Weather
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the city to fetch weather data for.
 *     responses:
 *       200:
 *         description: Successfully retrieved weather details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherResponse'
 *       400:
 *         description: Missing city name or API key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/weather', weather);

module.exports = router;
