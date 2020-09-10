var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "your_new_password",
  database: "nodejs",
});

var service = {};

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

service.getCustomers = async function () {
  var customers = [];
  var sql = "SELECT * FROM customer";
  await new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve();
        return customers;
      }
      // make the query
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve();
        }
        customers = results;
        resolve();
      });
    });
  });
  return customers; //argument to Promise
};

service.addCustomer = function (customer, callback) {
  console.log(JSON.stringify(customer));
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        callback({ result: "fail", msg: "customer addition failed." });
      }
      connection.query("INSERT INTO customer set ? ", customer, function (
        err,
        results
      ) {
        connection.release();
        if (err) {
          console.log("Error Selecting : %s ", err);
          resolve({ result: "fail", msg: "customer addition failed." });
        } else {
          resolve({ result: "success", msg: "customer added ok." });
        }
      });
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

service.updateCustomer = function (customer, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      callback({ result: "fail" });
      return;
    }
    connection.query(
      "UPDATE customer set ? WHERE id = ? ",
      [customer, customer.id],
      function (err, results) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          callback({ result: "fail" });
        } else {
          callback({ result: "success" });
        }
      }
    );
  });
};

service.getCustomerById = function (id, callback) {
  var record = {};
  var sql = "SELECT * FROM customer where id='" + id + "'";
  console.log("sql:" + sql);
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      callback({});
      return;
    }
    // make the query
    connection.query(sql, function (err, results) {
      connection.release();
      if (err) {
        console.log(err);
        callback({});
        return;
      }
      if (results.length == 0) {
        callback(record);
      }
      callback(results[0]);
    });
  });
};

service.deleteCustomer = (id) => {
  var customers = [];
  var sql = "delete FROM customer where id='" + id + "'";
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({ result: "fail", msg: "customer deletion failed." });
      }
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

service.getCustomersBySearch = function(field, searchText) {
  var recordList = [];
  var sql = "SELECT * FROM customer where "+field+" like '%"+searchText+"%'";
  console.log("sql:"+sql);
  return new Promise((resolve, reject) => {
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); resolve({}); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); resolve({}); return; }
      if(results.length == 0){
        resolve(recordList);
      }else{
        resolve(results);
      }
    });
  });
});
};

module.exports = service;
