const bodyParser = require('body-parser');
const auth = require('../middleware/auth');

const data = [{item: 'Get Milk'}, {item: 'Play Soccer'}, {item: 'Meet girlfriend'}];
var urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/user/todo', auth, function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/user/todo', urlencodeParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/user/todo/:item',function(req, res){
        data = data.filter(function(task){
            return task.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};