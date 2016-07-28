var mysql = require("mysql");
var pool = mysql.createPool({
	connectionLimit: 10,
	user: "usuario",
	password: "1234",
	database: "hoyaprendo"
});
module.exports = pool;