var db = require("../models");

module.exports = function(app) {
  // Get all plants
  app.get("/api/plants", function(req, res) {
    db.Plant.findAll({}).then(function(dbPlants) {
      res.json(dbPlants);
    });
  });

  // Add a plant to database
  app.post("/api/plants", function(req, res) {
    db.Plant.create(req.body).then(function(dbPlants) {
      res.json(dbPlants);
    });
  });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
