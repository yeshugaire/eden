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

	// Auth Post Routes
	app.post("/signup", passport.authenticate("local-signup", {
		successRedirect: "/mygarden",
		failureRedirect: "/signup"
	}));

	// Render 404 page for any unmatched routes
	app.get("*", function (req, res) {
		res.render("404");
	});
};