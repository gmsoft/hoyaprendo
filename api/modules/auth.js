var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config.js');
var adminUrls = [
	'/users/delete',
	'/users/save',
	'/users/find'
	];

exports.createToken = function(user) {
	var payload = {
		sub: user.user_id,
		iat: moment().unix(),
		exp: moment().add(24, 'hours').unix()
	};
	if (user.admin == 1) {
		payload.scopes = adminUrls;
	}
	return jwt.encode(payload, config.tokenSecret);
};

exports.ensureAuthenticated = function(request, response, next) {
	if (!request.headers.authorization) {
		return response
			.status(403)
			.send({message: 'Tu petición no tiene cabecera de autorización.'});
	}

	var token = request.headers.authorization.split(' ')[1];
	try {
		var payload = jwt.decode(token, config.tokenSecret);
	} catch (error) {
		return response
			.status(401)
			.send({message: 'El token ha expirado.'});
	}
	
	if (payload.exp <= moment().unix()) {
		return response
			.status(401)
			.send({message: 'El token ha expirado.'});
	}
	var originalUrl = request.originalUrl;
	if (adminUrls.indexOf(originalUrl) != -1) {
		if (payload.scopes) {
			var existsUrl = payload.scopes.indexOf(originalUrl);
			if (existsUrl == -1) {
				return response
					.status(403)
					.send({message: 'No tienes permiso para acceder a esta ubicación.'})
			}
		} else {
			return response
				.status(403)
				.send({message: 'No tienes permiso para acceder a esta ubicación.'})
		}
	}
	request.user = payload.sub;
	next();
};

exports.readToken = function(token) {
	var payload = jwt.decode(token, config.tokenSecret);
	return payload.sub;
};