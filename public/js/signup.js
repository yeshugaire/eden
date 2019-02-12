// when you click on sign up
$("#signup").on("click", function (event) {
	event.preventDefault();
	$.post("/signup").then(function() {
		console.log("signup");
	});
});