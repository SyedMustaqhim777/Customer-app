var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "your_new_password",
  database: "nodejs",
});

var service = {};

/** CRUD Operations */

//Create or Add
service.addCustomer = function (customer) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({ result: "fail", msg: "customer addition failed." });
      }
      //use the connection to query
      let queryCallback = function (err, results) {
        connection.release();
        if (err) {
          console.log("Error Selecting : %s ", err);
          resolve({ result: "fail", msg: "customer addition failed." });
        } else {
          resolve({ result: "success", msg: "customer added ok." });
        }
      };
      connection.query("INSERT INTO customer set ? ", customer, queryCallback);
    });
  });
};

//READ
service.getCustomers = function () {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        return resolve([]);
      }
      // make the query
      connection.query("SELECT * FROM customer", function (err, results) {
        connection.release();
        if (err) {
          return resolve([]);
        }
        return resolve(results);
      });
    });
  });
};

service.getCustomerById = function (id) {
  var record = {};

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve({});
        return;
      }
      // make the query
      var sql = "SELECT * FROM customer where id='" + id + "'";
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve({});
          return;
        }
        if (results.length == 0) {
          resolve(record);
        }
        resolve(results[0]);
      });
    });
  });
};

service.getCustomersBySearch = function (field, searchText) {
  var recordList = [];
  var sql =
    "SELECT * FROM customer where " + field + " like '%" + searchText + "%'";
  console.log("sql:" + sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({});
        return;
      }
      // make the query
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve({});
          return;
        }
        if (results.length == 0) {
          resolve(recordList);
        } else {
          resolve(results);
        }
      });
    });
  });
};

//UPDATE
service.updateCustomer = function (customer) {
  //Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        return resolve({ result: "fail", msg: "customer updation failed." });
      }
      connection.query(
        "UPDATE customer set ? WHERE id = ? ",
        [customer, customer.id],
        function (err, results) {
          if (err) {
            return resolve({
              result: "fail",
              msg: "customer updation failed.",
            });
          } else {
            return resolve({ result: "success" });
          }
        }
      );
    });
  });
};

//DELETE
service.deleteCustomer = (id) => {
  var customers = [];
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({ result: "fail", msg: "customer deletion failed." });
      }
      var sql = "delete FROM customer where id='" + id + "'";
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve({ result: "fail", msg: "customer deletion failed." });
        }
        resolve({ result: "success", msg: "customer deleted." });
      });
    });
  });
};

service.getRecords = function (callback) {
  var sql = "SELECT * FROM customer";
  console.log("sql:" + sql);
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      callback([]);
      return;
    }
    // make the query
    connection.query(sql, function (err, results) {
      connection.release();
      if (err) {
        console.log(err);
        callback([]);
        return;
      }
      callback(results);
    });
  });
};

// service.updateRecord  = (records) => {
//   return new Promise((resolve, reject) => {
//   pool.getConnection(function(err, connection) {
//         if(err) { console.log(err); resolve({result:"fail"}); return; }
//         connection.query("UPDATE customer set ? WHERE id = ? ",[customer,customer.id], function(err, results) {
//           connection.release();
//           if(err){
//            console.log("Error Selecting : %s ",err );
//            resolve({result:"fail"});
//           }else{
//            resolve({result:"success"});
//          }
//       });
//      });
//   });
// };

module.exports = service;
