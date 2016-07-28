var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
	response.sendFile('index.html');
});
module.exports = router;