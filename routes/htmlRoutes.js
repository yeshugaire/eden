var db = require("../models");
var passport = require("passport");

module.exports = function (app) {
	// Load index page
	app.get("/", function (req, res) {
		res.render("index", {
			msg: "Welcome!",
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
	app.get("/signup", function (req, res) {
		res.render("signup");
	});
	app.get("/signin", function (req, res) {
		res.render("signin");
	});
	app.get("/logout", function (req, res) {
		req.session.destroy(function () {
			res.redirect("/");
		});
	});

	// User's Garden
	app.get("/mygarden/:username", isLoggedIn, function (req, res) {
		db.User.findOne({
			where: {
				username: req.user.username
			},
			include: [db.Plant],
			include: [db.Event]
		}).then(function (data) {
			var hbsObject1 = data.dataValues.Plants;
			var hbsObject2 = data.dataValues.Events;
			console.log(hbsObject);
			res.render("mygarden", {
				myPlants: hbsObject1
			}, {
				myEvents: hbsObject2
			});
		});
	});

	// Plant Route
	app.get("/plants/:id", function(req, res) {
		db.Plant.findOne({
			where: {
				id: req.params.id
			}
		}).then(function (data) {
			var hbsObject = data.dataValues;
			console.log(hbsObject);
			res.render("plants", {
				plant: hbsObject
			});
		});
	});

	// Signup Post Routes
	app.post("/signup", function(req, res, next) {
		passport.authenticate("local-signup", function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.redirect("/signup");
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				return res.redirect("/mygarden/" + user.username);
			});
		})(req, res, next);
	});

	// Signin Post Route
	app.post("/signin", function(req, res, next) {
		passport.authenticate("local-signin", function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return (res.redirect("/signin"));
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				return (res.redirect("/mygarden/" + user.username));
			});
		})(req, res, next);
	});

	// Render 404 page for any unmatched routes
	app.get("*", function (req, res) {
		res.render("404");
	});
};

// Checks to see if user is logged in. If not, "mygarden" is not accessible
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	// If not signed in, redirect to signin page
	res.redirect("/signin");
}