const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SkyCheck Weather API Documentation",
      version: "1.0.0",
      description: `
        This is the official documentation for the SkyPulse Weather API.
        Use this API to get real-time weather data for any city or country by providing the city name as a query parameter.
      `,
      contact: {
        name: "SkyPulse Team",
        email: "habeebolayemi518@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:1212/api/v1",
        description: "Development server",
      },
      {
        url: "https://skypulse-g8pk.onrender.com/api/v1",
        description: "Production server",
      },
    ],

    components: {
      schemas: {
        WeatherResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Weather data fetched successfully",
            },
            data: {
              type: "object",
              properties: {
                cityName: {
                  type: "string",
                  example: "Oklahoma",
                },
                temperature: {
                  type: "string",
                  example: "-2.91 °C",
                },
                condition: {
                  type: "string",
                  example: "Sunny",
                },
                windSpeed: {
                  type: "string",
                  example: "3.38 m/s",
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "City name is required",
            },
          },
        },
      },
    },
  },


  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);



function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger Docs available at /api-docs");
}

module.exports = setupSwagger;
