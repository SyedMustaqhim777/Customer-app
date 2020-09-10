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
  var sql = "SELECT * FROM student";
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

service.getStudents = async function () {
  var students = [];
  var sql = "SELECT * FROM student";
  await new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve();
        return students;
      }
      // make the query
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve();
        }
        students = results;
        resolve();
      });
    });
  });
  return students; //argument to Promise
};

service.addStudent = function (student, callback) {
  console.log(JSON.stringify(student));
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        callback({ result: "fail", msg: "student addition failed." });
      }
      connection.query("INSERT INTO student set ? ", student, function (
        err,
        results
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

service.updateStudent = function (student, callback) {
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
          callback({ result: "fail" });
        } else {
          callback({ result: "success" });
        }
      }
    );
  });
};

service.getStudentById = function (id, callback) {
  var record = {};
  var sql = "SELECT * FROM student where id='" + id + "'";
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

service.getStudentsBySearch = function(field, searchText) {
  var recordList = [];
  var sql = "SELECT * FROM student where "+field+" like '%"+searchText+"%'";
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
