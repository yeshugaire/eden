$(function () {
	$.ajax({
		type: "GET",
		url: "/api/events",
	}).done(function(doc) {
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
});