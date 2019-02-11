module.exports = function(sequelize, DataTypes) {
	var Event = sequelize.define("Event", {
		event_id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},

		event_name: {
			type: DataTypes.STRING,
			allowNull: false
		},

		time_start: {
			type: DataTypes.VARCHAR,
			allowNull: false,
			defaultValue: "00:00"
		},

		time_end: {
			type: DataTypes.VARCHAR,
			allowNull: false,
			defaultValue: "23:59"
		},

		days_of_week: {
			type: DataTypes.ARRAY(Sequlize.TEXT),
			allowNull: false
		}

	});

	return Event;
};