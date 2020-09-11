var MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const { resolve } = require("path");
var ObjectId = require("mongodb").ObjectID;

var service = {};    
var dbName = "nodejs";
const url = "mongodb://localhost:27017";

service.getCustomersPromise = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection("customers")
          .find()
          .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            resolve(result);
          });
      }
    );
  });
};

service.getCustomers = function () {
  console.log("hello");
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection("customers")
          .find()
          .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            client.close();
            resolve(result);
          });
      }
    );
  });
};

service.getCustomerById = function (id) {
  return new Promise((resolve, reject) => {
    var record = {};
    console.log(">> getCustomerById " + id);
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        db.collection("customers")
          .find({ _id: ObjectId(id) })
          .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            client.close();

            resolve(result[0]);
          });
      }
    );
  });
};

service.addCustomer = function (record) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection("customers");
        collection.insertMany([record], function (err, result) {
          client.close();
          resolve({ result: "success" });
        });
      }
    );
  });
};

service.deleteCustomer = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection("customers");
        collection.deleteOne({ _id: ObjectId(id) }, function (err, result) {
          client.close();
          resolve({ result: "success" });
        });
      }
    );
  });
};

service.updateCustomer = function (customer) {
  return new Promise((resolve, reject) => {
    let id = customer.id;
    delete customer.id;
    MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection("customers");
        collection.updateOne(
          { _id: ObjectId(id) },
          { $set: customer },
          function (err, result) {
            console.log(err, result);
            resolve({ result: "success" });
            client.close();
          }
        );
      }
    );
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
}
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
