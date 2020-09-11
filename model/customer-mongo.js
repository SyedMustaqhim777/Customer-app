var MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var ObjectId = require("mongodb").ObjectID;

var service = {};
var dbName = "nodejs";
const url = "mongodb://localhost:27017";
const CUSTOMERS = "customers";

//var => old JS
//let => the value can change later.
//const => the value cannot change. (for programmers)

var getDB = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, connection) => {
        if (err) {
          throw err;
        }
        var db = connection.db(dbName);
        resolve(db, connection);
      }
    );
  });
};

// READ
service.getCustomers = function () {
  return new Promise((resolve, reject) => {
    getDB().then((db, connection) => {
      db.collection(CUSTOMERS)
        .find()
        .toArray(function (err, result) {
          if (err) throw err;
          connection.close();
          resolve(result);
        });
    });
  });
};

// {_id: adfsdgjsgljn } - is alphanumeric, auto generated and uniquely identifies
// in database _id is stored in format of ObjectId
// but when you run query to get it gives in readable format

service.getCustomerById = function (id) {
  return new Promise((resolve, reject) => {
    var record = {};
    getDB().then((db, connection) => {
      db.collection(CUSTOMERS)
        .find({ _id: ObjectId(id) })
        .toArray(function (err, result) {
          if (err) throw err;
          connection.close();
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
service.addCustomer = function (record) {
  return new Promise((resolve, reject) => {
    getDB().then((db, connection) => {
      const collection = db.collection("customers");
      collection.insertMany([record], function (err, result) {
        connection.close();
        resolve({ result: "success" });
      });
    });
  });
};

// DELETE
service.deleteCustomer = function (id) {
  return new Promise((resolve, reject) => {
    getDB().then((db, connection) => {
      const collection = db.collection("customers");
      collection.deleteOne({ _id: ObjectId(id) }, function (err, result) {
        if (err) throw err;
        connection.close();
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
service.updateCustomer = function (customer) {
  return new Promise((resolve, reject) => {
    let id = customer.id;
    delete customer.id;

    getDB().then((db, connection) => {
      const collection = db.collection(CUSTOMERS);
      collection.updateOne({ _id: ObjectId(id) }, { $set: customer }, function (
        err,
        result
      ) {
        console.log(err, result);
        resolve({ result: "success" });
        connection.close();
      });
    });
  });
};

service.getCustomersBySearch = function (field, searchText) {
  var records = [];
  //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
  //console.log("search ==> "+JSON.stringify(searchParam));
  console.log("field:" + field);
  console.log("searchText:" + searchText);
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      db.collection("customers")
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
//sqlService.getCustomersBySearch(searchParam,callback);
service.getCustomersBySearchOLD = function (searchParam, callback) {
  var records = [];
  //searhObject = {searchParam.field: '//i'}
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, client) {
      assert.equal(null, err);
      const db = client.db(dbName);
      db.collection("customers")
        .find({ name: /vivek/i })
        .toArray(function (err, result) {
          if (err) throw err;
          console.log("result:" + JSON.stringify(result));
          callback(result);
          client.close();
        });
    }
  );
};

module.exports = service;
