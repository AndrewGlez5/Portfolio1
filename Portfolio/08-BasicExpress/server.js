const express = require('express');
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.route('/')
  .get((request, response) => {
    response.sendFile(__dirname + "/home.html");
  })
  .post((request, response) => {
    const mass = request.body.weight;
    const stature = request.body.height;
    const bmi = (mass / (stature * stature)) * 10000;
    response.send("Your BMI is: " + bmi);
  });

server.get('/info', (request, response) => {
  response.send('Greetings to all visitors!');
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

