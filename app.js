require ('./db/db.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const toDoController = require('./controllers/ToDoController');
const userRouter = require('./routes/user');
const port = process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();

//set up template engine
app.set('view engine', 'ejs');

//static file
app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

//index
app.get('/', function (req, res) {
    res.render('login');
});
//call controller
toDoController(app);
app.use(userRouter);

//listen to port
app.listen(port, () => {
    console.log('You are listening on port ' + port);
});

