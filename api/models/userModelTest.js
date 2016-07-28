var auth = require('../modules/auth.js');
// var pool = require('../modules/mysql-driver.js');
User = function(response) {
	
	this.login = function(pUser, pPassword) {
		var result = {};
		var user = {
			user_id : 123,
			admin: 1
		};
		result.token = auth.createToken(user);
		response.json(result);
	};

	this.find = function() {
		var result = {};
		var _users = [
			{
				user_id : 123,
				admin: 1
			},
			{
				user_id : 456,
				admin: 1
			},
		];

		result.users = _users;		
		response.json(result);
	};

		/*
		var query = 'SELECT user_id, user, password, lastlogin, admin, active FROM user WHERE user = ? AND password = ? AND active = 1;';
		connection.query(query, [pUser, pPassword], function(error, rows) {
			if (!error) {
				switch (rows.length) {
					case 1:
						console.log('User.login = OK');
						result.token = auth.createToken(rows[0]);
						result.user_id = rows[0]['user_id'];
					break;
					case 0:
						console.error('User.login = User and/or Password wrong.');
						result.error = true;
						result.message = 'User and/or Password wrong.';
					break;
					default:
						console.error('User.login = Duplicity Error.');
						result.error = true;
						result.message = 'Duplicity Error.';
					break;
				}
			} else {
				console.error('User.login = ' + error.stack);
				result.error = true;
				result.message = error.code;
			}
			response.json(result);
			updateLastLogin(rows[0]['user_id']);
		});*/
	

	/*
	this.save = function(pUser) {
		var result = {};
		var query;
		var values;
		if (pUser.user_id == 0) {
			query = 'INSERT INTO user (user, password, admin, active) VALUES (?, ?, ?, ?);';
			values = [pUser.user, pUser.password, pUser.admin, pUser.active];
		} else {
			query = 'UPDATE user SET user = ?, admin = ?, active = ? WHERE user_id = ?';
			values = [pUser.user, pUser.admin, pUser.active, pUser.user_id];
		}
		connection.query(query, values, function(error, rows) {
			if (!error) {
				console.log('User.save = OK');
				result.message = 'User saved successfully';
				result.insertId = rows.insertId || pUser.user_id;
			} else {
				console.error('User.save = ' + error.stack);
				result.message = 'Error: ' + error.code;
				result.error = true;
			}
			response.json(result);
		});
	};
	this.modify = function(pUser, pUser_id) {
		var result = {};
		var query = 'UPDATE user SET user = ?, password = ? WHERE user_id = ?;';
		var values = [pUser.user, pUser.password, pUser_id];
		connection.query(query, values, function(error, rows) {
			if (!error) {
				console.log('User.modify = OK');
				result.message = 'User modified successfully';
				result.insertId = rows.insertId || pUser.user_id;
			} else {
				console.error('User.modify = ' + error.stack);
				result.message = 'Error: ' + error.code;
				result.error = true;
			}
			response.json(result);
		});
	}
	this.delete = function(pUser_id) {
		var result = {};
		var query = 'UPDATE user SET active = 0 WHERE user_id = ?';
		connection.query(query, [pUser_id], function(error, rows) {
			if (!error) {
				switch (rows.changedRows) {
					case 1:
						console.log('User.delete = OK');
						result.message = 'User deleted successfully';
					break;
					case 0:
						console.error('User.delete = The User has already been deleted');
						result.message = 'User deleted successfully';
					break;
					default:
						console.error('User.delete = Duplicity error');
						result.message = 'Duplicity error';
						result.error = true;
					break
				}
			} else {
				console.error('User.save = ' + error.stack);
				result.message = 'Error: ' + error.code;
				result.error = true;
			}
			response.json(result);
		});
	};
	this.findOne = function(pUser_id, pIncludeDeleted) {
		var result = {};
		var query = 'SELECT user_id, user, lastlogin, admin, active FROM user WHERE user_id = ?';
		if (!pIncludeDeleted) {
			query += ' AND active = 1';
		}
		query += ' LIMIT 1;';
		connection.query(query, [pUser_id], function(error, rows) {
			result = {
				error: error,
				rows: rows
			};
			if (!error) {
				console.log('User.findOne = OK');
			} else {
				console.error('User.findOne = ' + error.stack);
			}
			response.json(result)
		});
	};
	this.find = function(pIncludeDeleted) {
		var result = {};
		var query = 'SELECT user_id, user, lastlogin, admin, active FROM user';
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
				console.log('User.find = OK');
			} else {
				console.error('User.find = ' + error.stack);
			}
			response.json(result);
		});
	};
	*/
};
module.exports = User;