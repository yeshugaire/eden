$.get("/searchPlant/:plantName").then(function() {
	console.log("searching api for plant");
});

$.post("/addPlant").then(function() {
	console.log("plant added");
});