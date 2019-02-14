// get rid of table caption
$("caption").remove();

// when you click on My Garden link
$("#deletePlant").on("click", function (event) {
	event.preventDefault();

	// delete request for plant
	$.ajax({
		url: "/api/plants/" + $(this).data("id"),
		method: "DELETE"
	}).then(function () {
		console.log("plant deleted");
		// redirect to my garden
		window.location.href="/mygarden/" + $(this).data("username");
	});
});