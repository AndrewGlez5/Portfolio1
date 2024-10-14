require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


const Key = process.env.API_KEY;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    const ciudad=req.body.cityName;

    if(!ciudad){
        return res.send('<h2>No se proporciono alguna ciudad</h2> <a href="/">Volver</a>');
        
    }

    const api=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${Key}&units=metric`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                return res.send(`Error al obtener el clima para ${ciudad}. Inténtalo de nuevo.`);
            }

            const temperatura = data.main.temp;
            const descripcion = data.weather[0].description;
            const icon = data.weather[0].icon; // Obtener el código del ícono del clima
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`; // Construir la URL del ícono


            // Mostrar el resultado del clima
            res.send(`
                <h2>Clima en ${data.name}</h2>
                <p>Temperatura: ${temperatura}°C</p>
                <p>Descripción: ${descripcion}</p>
                <img src="${iconUrl}" alt="Icono del clima"/>
                <br>
                <a href="/">Volver</a>
            `);
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud de clima:', error);
            res.send('Hubo un error al obtener el clima. Inténtalo de nuevo más tarde.');
        });

});



app.listen(7000,()=>{
    console.log("Listen on port 7000");
});
