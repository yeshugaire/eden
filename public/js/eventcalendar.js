$(function () {

	// GET Events
	$.get("/api/events").done(function(doc) {
		var event = Array();
		$.each(doc, function(i, entry) {
			event.push({
				title: entry.event_type + " " + entry.event_name,
				start: entry.time_start,
			});
		});
		$("#calendar").fullCalendar({
			defaultView: "basicWeek",
			aspectRatio: 2.5,
			eventColor: "aqua",
			events: event,
			displayEventTime: false
		});
	});

	// POST New Events
	$(".addEvent").on("click", function() {
		var eventName = $(this).data("name");
		var eventType = $(this).data("type");
		$.post("/api/events", {
			event_name: eventName,
			event_type: eventType,
			time_start: "00:00",
			time_end: "23:59",
			daysOfWeek: [1, 4],
			date_start: moment().format("YYYY MM DD"),
			date_end: moment().add(100, "years").format("YYYY MM DD"),
			UserId: 1
		},
		function(data, status){
			window.location.href = "/mygarden/:username";
		});
	});
});

