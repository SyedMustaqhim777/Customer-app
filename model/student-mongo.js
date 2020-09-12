var MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var ObjectId = require("mongodb").ObjectID;

var service = {};
var dbName = "nodejs";
const url = "mongodb://localhost:27017";
const STUDENTS = "students";

//var => old JS
//let => the value can change later.
//const => the value cannot change. (for programmers)

var getClient = () => {
  return new Promise((resolve, reject) => {
    return MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, connection) => {
        if (err) {
          throw err;
        }
        var db = connection.db(dbName);
        console.log(connection);
        return resolve({db:db, connection:connection});
      }
    );
  });
};

// READ
service.getStudents = function () {
  return new Promise((resolve, reject) => {
    getClient().then((client) => {
      client.db.collection(STUDENTS)
        .find()
        .toArray(function (err, result) {
          if (err) throw err;
          client.connection.close();
          resolve(result);
        });
    });
  });
};

// {_id: adfsdgjsgljn } - is alphanumeric, auto generated and uniquely identifies
// in database _id is stored in format of ObjectId
// but when you run query to get it gives in readable format

service.getStudentById = function (id) {
  return new Promise((resolve, reject) => {
    var record = {};
    getClient().then((client) => {
      client.db.collection(STUDENTS)
        .find({ _id: ObjectId(id) })
        .toArray(function (err, result) {
          if (err) throw err;
          client.connection.close();
          /* 
          [
            {_id:sdfsf, name:adfjsdf},
            {_id:adfsdf, name:adfsdf}
          ]
          */
          resolve(result[0]);
        });
    });
  });
};

//INSERT/CREATE
service.addStudent = function (record) {
  return new Promise((resolve, reject) => {
    getClient().then((client) => {
      const collection = client.db.collection(STUDENTS);
      collection.insertMany([record], function (err, result) {
        client.connection.close();
        resolve({ result: "success" });
      });
    });
  });
};

// DELETE
service.deleteStudent = function (id) {
  return new Promise((resolve, reject) => {
    getClient().then((client) => {
      const collection = client.db.collection(STUDENTS);
      collection.deleteOne({ _id: ObjectId(id) }, function (err, result) {
        if (err) throw err;
        client.connection.close();
        resolve({ result: "success" });
      });
    });
  });
};

// UDPATE
/* 

{
  id: 23,
  name: afadf
}

*/
service.updateStudent = function (student) {
  return new Promise((resolve, reject) => {
    let id = student.id;
    delete student.id;

    getClient().then((client) => {
      const collection = client.db.collection(STUDENTS);
      collection.updateOne({ _id: ObjectId(id) }, { $set: student }, function (
        err,
        result
      ) {
        console.log(err, result);
        resolve({ result: "success" });
        client.connection.close();
      });
    });
  });
};

service.getStudentsBySearch = function (field, searchText) {
  var records = [];
  //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
  //console.log("search ==> "+JSON.stringify(searchParam));
  console.log("field:" + field);
  console.log("searchText:" + searchText);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      db.collection("students")
        .find({ [field]: { $regex: searchText, $options: "i" } })
        .toArray(function (err, result) {
          if (err) throw err;
          console.log("result:" + JSON.stringify(result));
          client.close();
          resolve(result);
        });
    });
  });
};
// //sqlService.getstudentsBySearch(searchParam,callback);
// service.getstudentsBySearchOLD = function (searchParam, callback) {
//   var records = [];
//   //searhObject = {searchParam.field: '//i'}
//   MongoClient.connect(
//     url,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     function (err, client) {
//       assert.equal(null, err);
//       const db = client.db(dbName);
//       db.collection("students")
//         .find({ name: /vivek/i })
//         .toArray(function (err, result) {
//           if (err) throw err;
//           console.log("result:" + JSON.stringify(result));
//           callback(result);
//           client.close();
//         });
//     }
//   );
// };

module.exports = service;
