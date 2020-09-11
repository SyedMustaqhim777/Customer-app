var model = {};
var customers = [
  {
    id: 1,
    name: "Hannan",
    email: "vivek@gmail.com",
    phone: "112233",
    address: "ahmedabad",
  },
  {
    id: 2,
    name: "Rama",
    email: "vivek@gmail.com",
    phone: "999",
    address: "ahmedabad",
  },
  {
    id: 3,
    name: "Krishna",
    email: "vivek@gmail.com",
    phone: "112233",
    address: "ahmedabad",
  },
  {
    id: 4,
    name: "Rahim",
    email: "vivek@gmail.com",
    phone: "112233",
    address: "ahmedabad",
  },
];

model.getRecords = function () {
  return customers;
};

//CRUD
//read operation
model.getRecordById = function (id) {
  for (var i = 0; i < customers.length; i++) {
    if (id == customers[i].id) {
      return customers[i];
    }
  }
  return {};
};

//create operation
model.addRecord = function (record) {
  return customers.push(record);
};

//delete operation
model.deleteRecord = function (record) {
  let temp = [];
  for (var i = 0; i < customers.length; i++) {
    if (record.id != customers[i].id) {
      temp.push(customers[i]);
    }
  }
  customers = temp;
};

//update operation
model.updateRecord = function (customer) {
  for (var i = 0; i < customers.length; i++) {
    if (customer.id == customers[i].id) {
      customers[i] = customer;
    }
  }
};

model.query = function (key, value) {
  for (var i = 0; i < customers.length; i++) {
    if (customers[i][key] == value) {
      return customers[i];
    }
  }
  return;
};

module.exports = model;
