var bodyParser = require('body-parser');

var data = [{item: 'Get Milk'}, {item: 'Play Soccer'}, {item: 'Meet girlfriend'}];
var urlencodeParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    app.get('/todo', function(req, res){
        res.render('todo', {todos: data});
    });

    app.post('/todo', urlencodeParser, function(req, res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item',function(req, res){
        data = data.filter(function(task){
            return task.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};