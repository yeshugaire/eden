var db = require("../models");

module.exports = function (app) {

	// Get all plants
	app.get("/api/plants", function (req, res) {
		db.Plant.findAll({}).then(function (dbPlants) {
			res.json(dbPlants);
		});
	});

	// Add a plant to database
	app.post("/api/plants", function (req, res) {
		db.Plant.create(req.body).then(function (dbPlants) {
			res.json(dbPlants);
		});
	});

	// Add Event to Calendar Post Route
	app.post("/api/events", function(req, res) {
		db.Event.create(req.body).then(function(dbEvents) {
			res.json(dbEvents);
		});
	});

	// Events Database
	app.get("/api/events/", function(req, res) {
		// console.log(req.user.id);
		db.Event.findAll({}).then(function(dbEvents) {
			res.json(dbEvents);
		});
	});

	// Get All Users
	app.get("/api/users", function(req, res) {
		db.User.findAll({
			include: [db.Plant]
		}).then(function(dbUser) {
			res.json(dbUser);
		});
	});

	// Delete an example by id
	// app.delete("/api/examples/:id", function(req, res) {
	//   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
	//     res.json(dbExample);
	//   });
	// });
};