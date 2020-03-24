const express = require('express');
const app = express();
const port = process.env.PORT;
require ('./db/db.js');

var toDoController = require('./controllers/ToDoController');

//set up template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));

//call controller
toDoController(app);

//listen to port
app.listen(port);
console.log('You are listening on port ${port}');

