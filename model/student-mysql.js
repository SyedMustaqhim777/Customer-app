var mysql = require("mysql");
const { promiseImpl } = require("ejs");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "your_new_password",
  database: "nodejs",
});

var service = {};

// service.getRecords = function (callback) {
//   var sql = "SELECT * FROM student";
//   console.log("sql:" + sql);
//   pool.getConnection(function (err, connection) {
//     if (err) {
//       console.log(err);
//       callback([]);
//       return;
//     }
//     // make the query
//     connection.query(sql, function (err, results) {
//       connection.release();
//       if (err) {
//         console.log(err);
//         callback([]);
//         return;
//       }
//       callback(results);
//     });
//   });
// };
service.getStudents = function () {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        return resolve([]);
      }
      // make the query
      connection.query("SELECT * FROM student", function (err, results) {
        connection.release();
        if (err) {
          return resolve([]);
        }
        return resolve(results);
      });
    });
  });
};

// service.getStudents = async function () {
//   var students = [];
//   var sql = "SELECT * FROM student";
//   await new Promise((resolve, reject) => {
//     pool.getConnection(function (err, connection) {
//       if (err) {
//         console.log(err);
//         resolve();
//         return students;
//       }
//       // make the query
//       connection.query(sql, function (err, results) {
//         connection.release();
//         if (err) {
//           console.log(err);
//           resolve();
//         }
//         students = results;
//         resolve();
//       });
//     });
//   });
//   return students; //argument to Promise
// };

// //Create or Add
// service.addCustomer = function (customer) {
//   return new Promise((resolve, reject) => {
//     pool.getConnection(function (err, connection) {
//       if (err) {
//         console.log(err);
//         resolve({ result: "fail", msg: "customer addition failed." });
//       }
//       //use the connection to query
//       let queryCallback = function (err, results) {
//         connection.release();
//         if (err) {
//           console.log("Error Selecting : %s ", err);
//           resolve({ result: "fail", msg: "customer addition failed." });
//         } else {
//           resolve({ result: "success", msg: "customer added ok." });
//         }
//       };
//       connection.query("INSERT INTO customer set ? ", customer, queryCallback);
//     });
//   });
// };

service.addStudent = function (student) {
  // console.log(JSON.stringify(student));
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({ result: "fail", msg: "student addition failed." });
      }
      connection.query("INSERT INTO student set ? ", student, function (
        err,
        result
      ) {
        connection.release();
        if (err) {
          console.log("Error Selecting : %s ", err);
          resolve({ result: "fail", msg: "student addition failed." });
        } else {
          resolve({ result: "success", msg: "student added ok." });
        }
      });
    });
  });
};

// service.updateRecord  = (records) => {
//   return new Promise((resolve, reject) => {
//   pool.getConnection(function(err, connection) {
//         if(err) { console.log(err); resolve({result:"fail"}); return; }
//         connection.query("UPDATE student set ? WHERE id = ? ",[student,student.id], function(err, results) {
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


// //UPDATE
// service.updateCustomer = function (customer) {
//   //Promise
//   return new Promise((resolve, reject) => {
//     pool.getConnection(function (err, connection) {
//       if (err) {
//         console.log(err);
//         return resolve({ result: "fail", msg: "customer updation failed." });
//       }
//       connection.query(
//         "UPDATE customer set ? WHERE id = ? ",
//         [customer, customer.id],
//         function (err, results) {
//           if (err) {
//             return resolve({
//               result: "fail",
//               msg: "customer updation failed.",
//             });
//           } else {
//             return resolve({ result: "success" });
//           }
//         }
//       );
//     });
//   });
// };
service.updateStudent = function (student) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        callback({ result: "fail" });
        return;
      }

    connection.query(
      "UPDATE student set ? WHERE id = ? ",
      [student, student.id],
      function (err, results) {
        if (err) {
          console.log("Error Selecting : %s ", err);
          resolve({ result: "fail" });
        } else {
          resolve({ result: "success" });
        }
      }
    );
  });
});
}





// service.getCustomerById = function (id) {
//   var record = {};

//   return new Promise((resolve, reject) => {
//     pool.getConnection(function (err, connection) {
//       if (err) {
//         resolve({});
//         return;
//       }
//       // make the query
//       var sql = "SELECT * FROM customer where id='" + id + "'";
//       connection.query(sql, function (err, results) {
//         connection.release();
//         if (err) {
//           console.log(err);
//           resolve({});
//           return;
//         }
//         if (results.length == 0) {
//           resolve(record);
//         }
//         resolve(results[0]);
//       });
//     });
//   });
// };

service.getStudentById = function (id) {
  var record = {};

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        callback({});
        return;
      }
      //making query
      var sql = "SELECT * FROM student where id='" + id + "'";
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
        console.log("DB Working")
      });
    });
  });
}


 

service.deleteStudent = (id) => {
  var students = [];
  var sql = "delete FROM student where id='" + id + "'";
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({ result: "fail", msg: "student deletion failed." });
      }
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve({ result: "fail", msg: "student deletion failed." });
        }
        resolve({ result: "success", msg: "student deleted." });
      });
    });
  });
};

service.getStudentsBySearch = function (field, searchText) {
  var recordList = [];
  var sql =
    "SELECT * FROM student where " + field + " like '%" + searchText + "%'";
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

module.exports = service;
