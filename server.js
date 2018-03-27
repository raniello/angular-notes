var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 

app.use(express.static('./resources'));
app.use('/angular', express.static('./node_modules/angular'))
app.use('/bootstrap', express.static('./node_modules/bootstrap-css-only/css'))
app.use('/font', express.static('./node_modules/font-awesome/css'))

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var notes = ['Via emilia 272'];
var reminders = ['Ricorda di studiare AngularJS'];

app.get('/api/notes', function(req, res) {
    res.json(notes);
});
app.get('/api/reminders', function(req, res) {
    res.json(reminders);
});

app.post('/api/notes', function(req, res) {
    notes.push(req.body.text);
    res.end();
});
app.post('/api/reminders', function(req, res) {
    reminders.push(req.body.text);
    res.end();
});
app.delete('/api/notes/:index', function(req, res) {
    var index = req.params.index;
    notes.splice(index, 1);
    res.end();
});
app.delete('/api/reminders/:index', function(req, res) {
    var index = req.params.index;
    reminders.splice(index, 1);
    res.end();
});

var port = 8080;
app.listen(port);
console.log("App listening on port " + port);