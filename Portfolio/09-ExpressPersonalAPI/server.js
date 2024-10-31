const express = require('express');
const parser = require('body-parser');
const server = express();

let userNames = [];
let toDoList = [];

server.use(parser.urlencoded({ extended: true }));
server.set('view engine', 'ejs');

server.get('/', (request, response) => {
    const errorMsg = request.query.error;
    response.render('index', { userNames, toDoList, error: errorMsg });
});

server.get('/welcome', (request, response) => {
    const { user } = request.query;
    if (user) {
        userNames.push(user);
    }
    response.redirect('/');
});

server.get('/welcome/:userIndex', (request, response, next) => {
    const userIndex = Number(request.params.userIndex);
    if (userIndex >= 0 && userIndex < userNames.length) {
        response.render('greeting', { user: userNames[userIndex] });
    } else {
        next(new Error("Invalid index"));
    }
});

server.post('/add-item', (request, response) => {
    const { item } = request.body;
    if (item) {
        toDoList.push(item);
    }
    response.redirect('/');
});

server.get('/items', (request, response) => {
    response.json(toDoList);
});

server.post('/remove-item/:itemIndex', (request, response) => {
    const { itemIndex } = request.params;
    toDoList.splice(itemIndex, 1);
    response.redirect('/');
});

server.put('/welcome/:user', (request, response) => {
    const { user } = request.params;
    userNames.push(user);
    response.json(userNames);
});

server.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send("Internal Server Error: " + error.message);
});

server.post('/move-item/up/:itemIndex', (request, response) => {
    const itemIndex = parseInt(request.params.itemIndex);
    if (itemIndex > 0) {
        const itemToMove = toDoList[itemIndex];
        toDoList.splice(itemIndex, 1);
        toDoList.splice(itemIndex - 1, 0, itemToMove);
    }
    response.redirect('/');
});

server.post('/move-item/down/:itemIndex', (request, response) => {
    const itemIndex = parseInt(request.params.itemIndex);
    if (itemIndex < toDoList.length - 1) {
        const itemToMove = toDoList[itemIndex];
        toDoList.splice(itemIndex, 1);
        toDoList.splice(itemIndex + 1, 0, itemToMove);
    }
    response.redirect('/');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
