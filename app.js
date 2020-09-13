var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

//Session is a temporary storage.

//Initilize session
//After login you will save user info in session.
//on every api call, you will check if userinfo is present in session
//if yes, continue if no then throw error.
//On logout you will clear/remove user infor from session

//Import Route Config
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiCustomer = require("./routes/customer-api");
var apiStudent = require("./routes/student-api");
var securePagesRouter = require("./routes/securePages");

var app = express();

// app.use(function(req, res, next) {
//   console.log("app-100");
//   res.send("closed");
// })

var sessionConfig = {
  secret: "keyboard cat",
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true,
};

app.use(session(sessionConfig));

// view engine setup
app.set("views", path.join(__dirname, "views")); //this is where you can find UI
app.set("view engine", "ejs"); //this is the framework/engine that it uses

app.use(logger("dev")); //this is how i want to show logs
app.use(express.json()); //this application uses json

//Browser config
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//copy all inside public and use in html files.
app.use(express.static(path.join(__dirname, "public")));

//setting route config
app.use("/", indexRouter); //rendering login 
app.use("/users", usersRouter); //to start session and also validate login

//middleware
app.use(function (req, res, next) {
  // if type of req.session.user is string then
  if (typeof req.session.user == "string") {
    next(); //go ahead
  } else {
    res.send({
      result: "fail",
      msg: "you are not authorized for this request.",
    });
  }
});

app.use("/", securePagesRouter);
app.use("/api/customer", apiCustomer);
app.use("/api/student", apiStudent);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.use("/api", apiRouter);

module.exports = app;
