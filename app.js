var express = require('express');

var app = express();

var toDoController = require('./controllers/ToDoController');

//set up template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//call controller
toDoController(app);

//listen to port
app.listen(3000);
console.log('You are listening on port 3000');

