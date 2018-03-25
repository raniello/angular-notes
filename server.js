var express = require('express');
var app = express(); 

app.use(express.static('./resources'));
app.use('/angular', express.static('./node_modules/angular'))
app.use('/bootstrap', express.static('./node_modules/bootstrap-css-only/css'))
app.use('/font', express.static('./node_modules/font-awesome/css'))

var port = 8080;
app.listen(port);
console.log("App listening on port " + port);