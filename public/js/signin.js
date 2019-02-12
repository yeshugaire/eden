// when you click on sign in
$("#signin").on("click", function (event) {
	event.preventDefault();
	$.post("/signin").then(function() {
		console.log("signin");
	});
});