var moment = require("moment");

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
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			allowNull: false
		},

		date_start: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: moment().format("MM DD YYYY")
		},

		date_end: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: moment().add(365, "days").format("MM DD YYY")
		}
	});

	Event.associate = function(models) {
		Event.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Event;
};