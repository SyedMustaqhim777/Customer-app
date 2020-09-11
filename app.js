var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var session = require("express-session");

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

// var sess = {
//   secret: "keyboard cat",
//   cookie: {},
//   proxy: true,
//   resave: true,
//   saveUninitialized: true,
// };
// app.use(session(sess));

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

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/customer", apiCustomer);
app.use("/api/student", apiStudent);
app.use("/", securePagesRouter);

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

// app.use(function (req, res, next) {
//   console.log("This is my check point for user / autorization");
//   if (typeof req.session.user == "string") {
//     next();
//   } else {
//     res.send({
//       result: "fail",
//       msg: "you are not authorized for this request.",
//     });
//   }
// });

// app.use("/api", apiRouter);

module.exports = app;
