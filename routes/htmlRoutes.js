var db = require("../models");
var authController = require("../controllers/authcontroller");
var passport = require("passport");

module.exports = function (app) {
	// Load index page
	app.get("/", function (req, res) {
		db.Example.findAll({}).then(function (dbExamples) {
			res.render("index", {
				msg: "Welcome!",
				examples: dbExamples
			});
		});
	});

	// Load example page and pass in an example by id
	app.get("/example/:id", function (req, res) {
		db.Example.findOne({
			where: {
				id: req.params.id
			}
		}).then(function (dbExample) {
			res.render("example", {
				example: dbExample
			});
		});
	});

	// Auth Get Routes
	app.get("/signup", authController.signup);
	app.get("/signin", authController.signin);
	app.get("/mygarden", isLoggedIn, authController.mygarden);
	app.get("/logout", authController.logout);

	// Auth Post Routes
	app.post("/signup", passport.authenticate("local-signup", {
		successRedirect: "/mygarden",
		failureRedirect: "/signup"
	}));
	app.post("/signin", passport.authenticate("local-signin", {
		successRedirect: "/mygarden",
		failureRedirect: "/signin"
	}));

	// Render 404 page for any unmatched routes
	app.get("*", function (req, res) {
		res.render("404");
	});
};

// Checks to see if user is logged in. If not, "mygarden" is not accessible
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	};
	
	// If not signed in, redirect to signin page
	res.redirect("/signin");
};