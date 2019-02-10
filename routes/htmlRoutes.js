var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
	// Load index page
	app.get("/", function (req, res) {
		res.render("index");
	});

	// route for searching plants on garden.org
	app.get("/searchPlant/:plantName", function (req, res) {
		// call to garden.org for plant search
		axios.get("https://garden.org/plants/search/text/?q=" + req.params.plantName).then(function (body) {
			// scrape html for possible plant names and links
			var $ = cheerio.load(body.data);

			// save plant names
			var plantOptions = $("tr").text().split(")");

			// save links
			var plantLinks = [];
			$("td a").each(function (i, elm) {
				$(this).remove();
				plantLinks.push($(this).attr("href"));
			});
			var uniquePlantLinks = [new Set(plantLinks)];

			// log data
			console.log(uniquePlantLinks);
			plantOptions.forEach(function (element) {
				console.log(element + ")");
			});
		});
	});

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

	// Render 404 page for any unmatched routes
	app.get("*", function (req, res) {
		res.render("404");
	});
};