const express = require('express')
const axios = require('axios');

exports.weather = async (req, res) => {
    try {
        const {city} = req.query;
        
         if(!city){
            return res.status(400).json({
                message: "City name is required"
            })
        };

        const api_key = process.env.API_KEY;

        if(!api_key){
            return res.status(400).json({
                message: "Api key is required"
            })
        }; 

        const units = "metric"
        
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${units}`);
        
        const { name , main: { temp }, weather, wind: { speed: windSpeed} } = response.data;
   
        let condition = weather[0].description.toLowerCase();

        if (condition.includes('cloud')) {
            condition = 'Cloudy'
            
        } else if (condition.includes('rain')) {
            condition = 'Rainy'
            
        } else if (condition.includes('clear')) {
            condition = 'Sunny'
            
        } else {
            condition = 'Unknown'
        }
        //  console.log(condition)
        // console.log('i am response data:', response.data)
        const entry = {
            cityName: name,
            temperature: `${temp} °C`,
            condition,
            windSpeed: `${windSpeed} m/s`
        };
// console.log(entry)
         res.status(200).json({
            message: "Weather data fetched successfully",
            data: entry
        })
    
    } catch (error) {
        if(error.response) {

            if(error.response.status === 404) {
                return res.status(404).json({
                    message: 'City not found'
                });

            } else if (error.response.status === 401) {
                return res.status(401).json({
                    message: 'Invalid api_key'
                });
            }
        }
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })

    }
}   
