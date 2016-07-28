var express = require('express');
var router = express.Router();
var auth = require('../modules/auth.js');
var pool = require('../modules/mysql-driver.js');

pool.getConnection(function(error, connection) {
	if (!error) {
		var Course = require('../models/courseModel.js');
		router.get('/', function(request, response, next) {
			var course = new Course(connection, response);
			course.find(request.query.includeDeleted);
		});
		router.get('/:course_id', function(request, response, next) {
			var course = new Course(connection, response);
			course.findOne(request.params.course_id, request.query);
		});
		router.post('/save', auth.ensureAuthenticated, function(request, response, next) {
			var course = new Course(connection, response);
			course.save(request.body);
		});
		router.delete('/delete/:course_id', auth.ensureAuthenticated, function(request, response, next) {
			var course = new Course(connection, response);
			course.delete(request.params.course_id);
		});
	} else {
		console.error('Connection error: ' + error.stack);
	}
	connection.release();
});

module.exports = router;