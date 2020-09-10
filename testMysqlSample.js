var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_new_password",
  database: "nodejs",
});

connection.connect();

connection.query("SELECT * from customer", function (error, results, fields) {
  if (error) throw error;
  console.log("---------");
  console.log("name      | email            | phone      |  address");
  for (var i = 0; i < results.length; i++) {
    console.log(
      results[i].name +
        "  | " +
        results[i].email +
        "           | " +
        results[i].phone +
        " |  " +
        results[i].address
    );
  }
});

connection.end();
