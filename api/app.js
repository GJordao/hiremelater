// Imports
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const path = require("path");

// Config
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(logger("dev"));
// CORS setup
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});
// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Middleware to create errors and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
