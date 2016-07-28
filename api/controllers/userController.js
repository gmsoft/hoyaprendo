var express = require('express');
var router = express.Router();
var auth = require('../modules/auth.js');
var pool = require('../modules/mysql-driver.js');

pool.getConnection(function(error, connection) {
	if (!error) {
		var User = require('../models/userModel.js');
		router.get('/', auth.ensureAuthenticated, function(request, response, next) {
			var user = new User(connection, response);
			user.find(request.query.includeDeleted);
		});
		router.get('/:user_id', auth.ensureAuthenticated, function(request, response, next) {
			var user = new User(connection, response);
			user.findOne(request.params.user_id, request.query);
		});
		router.post('/login', function(request, response, next) {
			var user = new User(connection, response);
			user.login(request.body.user, request.body.password);
		});
		router.post('/save', auth.ensureAuthenticated, function(request, response, next) {
			var user = new User(connection, response);
			user.save(request.body);
		});
		router.post('/modify', auth.ensureAuthenticated, function(request, response, next) {
			var user = new User(connection, response);
			var user_id = auth.readToken(request.headers.authorization.split(' ')[1]);
			user.modify(request.body, user_id);
		});
		router.delete('/delete/:user_id', auth.ensureAuthenticated, function(request, response, next) {
			var user = new User(connection, response);
			user.delete(request.params.user_id);
		});
	} else {
		console.error('Connection error: ' + error.stack);
	}
	connection.release();
});

module.exports = router;