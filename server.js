require("dotenv").config();
require("dotenv").load();
var express = require("express");
var exphbs = require("express-handlebars");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

var passport = require("passport");
var session = require("express-session");

// Custom CSS and JS Served to Handlebars
var path = require("path");
app.use(express.static(path.join(__dirname, "/public")));

// Middleware
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// Passport
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 60000
	}
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages for Signup/Signin
app.use(flash());

// Handlebars
app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main"
	})
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app, passport);

// Passport Strategies
require("./config/passport/passport")(passport, db.User);

var syncOptions = {
	force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
	syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/

db.sequelize.sync(syncOptions).then(function () {
	app.listen(PORT, function () {
		console.log(
			"==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
			PORT,
			PORT
		);
	});
});

module.exports = app;