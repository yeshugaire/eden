$(function () {

	// GET Events
	$.get("/api/events").done(function(doc) {
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
			eventColor: "aqua",
			events: event,
			displayEventTime: false
		});
	});

	// POST New Events
	$(".addEvent").on("click", function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var eventName = $(this).data("name");
		var eventType = $(this).data("type");
		var dataId = $(this).data("id");
		var userName = $(this).data("username");
		var days = $("." + eventName + ":checked").map(function () {
			return this.value;
		}).get().join(",");


		console.log(days);
		$.post("/api/events", {
			event_name: eventName,
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
});

