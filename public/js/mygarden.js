// when they click on add a plant
$("#addAPlant").on("click", function (event) {
	event.preventDefault();
	// save inputs from form
	var plantName = $("#plantName").val().trim();
	var personalName = $("#personalName");

	// if no common or scientific name
	if (plantName.length === 0) {
		// post request to add plant to database
		$.post("/addUnknownPlant", {personalName: personalName}).then(function() {
			console.log("plant added to garden");
		});
		// if common or scientific name is provided
	} else {
		// get request to search garden.org for plant
		$.get("/searchplant/"+ plantName).then(function() {
			console.log("searching garden.org for plant info");
		});
	}
});