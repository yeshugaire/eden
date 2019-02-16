$(function () {

	// GET Events
	$.get("/api/events/" + $(".userinfo").data("id")).done(function(doc) {
		var event = Array();
		$.each(doc, function(i, entry) {
			event.push({
				title: entry.event_type + " " + entry.event_name,
				start: entry.time_start,
				dow: entry.daysOfWeek
			});
		});
		$("#calendar").fullCalendar({
			defaultView: "basicWeek",
			aspectRatio: 2.5,
			eventColor: "#78B70C",
			events: event,
			displayEventTime: false
		});
	});

	// Date Modal Display
	// $(".add-to-calendar").on("click", function(event) {
	// 	event.preventDefault();
	// 	console.log("WTF");
	// 	$(".dateModal").css("display, block");
	// });

	// POST New Events
	$(".addEvent").on("click", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var eventName = $(this).data("name");
		var calendarName = eventName.trim().split(" ")[0];
		var eventType = $(this).data("type");
		var dataId = $(this).data("id");
		var userName = $(this).data("username");
		var days = $("." + calendarName + ":checked").map(function () {
			return this.value;
		}).get().join(",");

		console.log(days);
		$.post("/api/events", {
			event_name: calendarName,
			event_type: eventType,
			time_start: "00:00",
			time_end: "23:59",
			daysOfWeek: days,
			date_start: moment().format("YYYY MM DD"),
			date_end: moment().add(100, "years").format("YYYY MM DD"),
			UserId: dataId
		},
		function() {
			window.location.href = "/mygarden/" + userName;
		});
	});

	// DELETE Events
	$(".resetEvents").on("click", function() {
		var userId = $(this).data("id");
		var eventName = $(this).data("name");
		var eventType = $(this).data("type");
		var userName = $(this).data("username");
		$.ajax({
			method: "DELETE",
			url: "/api/events/" + userId + "&" + eventName + "&" + eventType
		}).then(function() {
			window.location.href = "/mygarden/" + userName;
		});
	});

});