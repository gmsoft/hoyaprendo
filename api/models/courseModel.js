var auth = require('../modules/auth.js');
var pool = require('../modules/mysql-driver.js');
Course = function(connection, response) {
	this.save = function(pCourse) {
		var result = {};
		var query;
		var values = [pCourse.name, pCourse.active, pCourse.course_id];
		if (pCourse.course_id == 0) {
			query = 'INSERT INTO course (name, active) VALUES (?, ?);';
		} else {
			query = 'UPDATE course SET name = ?, active = ? WHERE course_id = ?';;
		}
		connection.query(query, values, function(error, rows) {
			if (!error) {
				console.log('Course.save = OK');
				result.message = 'Course saved successfully';
				result.insertId = rows.insertId || pCourse.course_id;
			} else {
				console.error('Course.save = ' + error.stack);
				result.message = 'Error: ' + error.code;
				result.error = true;
			}
			response.json(result);
		});
	};
	this.delete = function(pCourse_id) {
		var result = {};
		var query = 'UPDATE course SET active = 0 WHERE course_id = ?';
		connection.query(query, [pCourse_id], function(error, rows) {
			if (!error) {
				switch (rows.changedRows) {
					case 1:
						console.log('Course.delete = OK');
						result.message = 'Course deleted successfully';
					break;
					case 0:
						console.error('Course.delete = The Course has already been deleted');
						result.message = 'Course deleted successfully';
					break;
					default:
						console.error('Course.delete = Duplicity error');
						result.message = 'Duplicity error';
						result.error = true;
					break
				}
			} else {
				console.error('Course.save = ' + error.stack);
				result.message = 'Error: ' + error.code;
				result.error = true;
			}
			response.json(result);
		});
	};
	this.findOne = function(pCourse_id, pIncludeDeleted) {
		var result = {};
		var query = 'SELECT course_id, name, active FROM course WHERE course_id = ?';
		if (!pIncludeDeleted) {
			query += ' AND active = 1';
		}
		query += ' LIMIT 1;';
		connection.query(query, [pCourse_id], function(error, rows) {
			result = {
				error: error,
				rows: rows
			};
			if (!error) {
				console.log('Course.findOne = OK');
			} else {
				console.error('Course.findOne = ' + error.stack);
			}
			response.json(result)
		});
	};
	this.find = function(pIncludeDeleted) {
		var result = {};
		var query = 'SELECT course_id, name, active FROM course';
		if (pIncludeDeleted == 'false') {
			query += ' WHERE active = 1';
		}
		query += ';';
		connection.query(query, function(error, rows) {
			result = {
				error: error,
				rows: rows
			};
			if (!error) {
				console.log('Course.find = OK');
			} else {
				console.error('Course.find = ' + error.stack);
			}
			response.json(result);
		});
	};
};
module.exports = Course;