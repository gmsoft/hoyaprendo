var express = require('express'),
	cors = require('cors'),
	compression = require('compression'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	path = require('path'),
	methodOverride = require('method-override'),
	config = require('./api/config.js'),
	app = express();

var routes = require('./api/controllers/indexController.js');
var userController = require('./api/controllers/userControllerTest.js');
//var courseController = require('./api/controllers/courseController.js');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors()); //enable cors
app.use(compression()); //compress the files transferred
app.use(logger('dev')); //show all requests in console
app.use(bodyParser.json()); //allows HTML modification in POST method
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride()); //emules DELETE and PUT
//app.use(express.static(path.join(__dirname, 'public'))); //static files location.

app.use('/', routes);
app.use('/users', userController);
//app.use('/courses', courseController);

app.listen(config.port, function () {
	console.log('Server up at port ' + config.port);
});