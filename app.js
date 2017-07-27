// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var allowCors = function(req, res, next) {

	res.header('Acess-Control-Allow-Origin', '*');
	res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Acess-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
	res.header('Acess-Control-Allow-Credentials', 'true');

	next();
}

app.use(allowCors);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000);
console.log("App running on port 3000");
