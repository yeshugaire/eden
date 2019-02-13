var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var passport = require("passport");

module.exports = function (app) {
	// Load index page
	app.get("/", function (req, res) {
		res.render("index");
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
				id: req.user.id
			},
			include: [db.Plant, db.Event]
		}).then(function (data) {
			var hbsObject1 = data.dataValues.Plants;
			var hbsObject2 = data.dataValues.Events;
			var hbsObject3 = {
				id: req.user.id,
				username: req.user.username
			};
			console.log(hbsObject3);
			res.render("mygarden", {
				myPlants: hbsObject1,
				myEvents: hbsObject2,
				dataUser: hbsObject3
			});
		});
	});

	// route for searching plants on garden.org
	// app.get("/searchPlant/:plantName", function (req, res) {
	// 	// call to garden.org for plant search
	// 	axios.get("https://garden.org/plants/search/text/?q=" + req.params.plantName).then(function (body) {
	// 		// scrape html for possible plant names and links
	// 		var $ = cheerio.load(body.data);

	// 		// save plant names
	// 		var plantOptions = $("tr").text().split(")");

	// 		// save links
	// 		var plantLinks = [];
	// 		$("td a").each(function (i, elm) {
	// 			$(this).remove();
	// 			plantLinks.push($(this).attr("href"));
	// 		});
	// 		// remove duplicates from links
	// 		var uniquePlantLinks = [];
	// 		for(var i = 0; i < plantLinks.length; i++){
	// 			if(uniquePlantLinks.indexOf(plantLinks[i]) === -1){
	// 				uniquePlantLinks.push(plantLinks[i]);
	// 			}
	// 		}

	// 		// save data as object for handlebars
	// 		var searchOptions = [];
	// 		for (i = 0; i < plantOptions.length; i++) {
	// 			var plant = {
	// 				plantName: plantOptions[i] + ")",
	// 				link: uniquePlantLinks[i]
	// 			};
	// 			searchOptions.push(plant);
	// 		}
	// 	});
	// });

	// route for adding new plant from garden.org to plants table in database
	app.post("/addPlant", function (req, res) {
		// call to garden.org for plant info
		axios.get("https://garden.org/plants/view/83101/Water-Primrose-Ludwigia-peploides/")
			.then(function (body) {
				// scrape html for plant info tables
				var $ = cheerio.load(body.data);

				// find general info table (last table)
				var generalTableIndex = $("body").find(".simple-table").length - 1;
				// save  general info table
				var plantInfoTables = "";
				$(".simple-table").each(function (i, elm) {
					if (i === generalTableIndex) {
						plantInfoTables += $(this).html();
					}
				});
				// log plant info tables
				console.log(plantInfoTables);
			});
	});

	// View Plant Route
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