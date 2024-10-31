require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3010;
const WEATHER_API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/main.html`);
});

app.post("/", (req, res) => {
    const cityQuery = req.body.city;

    if (!cityQuery) {
        return res.send('<h2>Especifica una ciudad, por favor.</h2><a href="/">Volver</a>');
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${WEATHER_API_KEY}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            if (weatherData.cod !== 200) {
                return res.send(`<h2>Error: no se pudo obtener el clima para ${cityQuery}.</h2><a href="/">Volver</a>`);
            }

            const { temp } = weatherData.main;
            const { description } = weatherData.weather[0];
            const iconCode = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            res.send(`
                <h2>Clima en ${weatherData.name}</h2>
                <p>Temperatura: ${temp}°C</p>
                <p>Descripción: ${description}</p>
                <img src="${iconUrl}" alt="Ícono de clima"/>
                <br>
                <a href="/">Volver</a>
            `);
        })
        .catch(err => {
            console.error('Error al obtener datos de clima:', err);
            res.send('<h2>Ocurrió un error al intentar obtener el clima. Por favor, intenta de nuevo más tarde.</h2>');
        });
});

app.listen(PORT, () => {
    console.log(`El servidor está activo en el puerto ${PORT}`);
});
