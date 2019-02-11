// Initialize Moment
var moment = require("moment");
moment();

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

		event_type: {
			type: DataTypes.STRING,
			allowNull: false
		},

		time_start: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "00:00"
		},

		time_end: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "23:59"
		},

		// Stores Each Day of Week as Boolean, true means event does occur. More efficient way to do this?
		sunday: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		monday: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		tuesday: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		wednesday: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		thursday: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		friday: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		saturday: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},

		// days_of_week: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// 	defaultValue: "2, 6"
		// },

		date_start: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: moment().format("YYYY-MM-DD")
		},

		date_end: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: moment().add(365, "days").format("YYYY-MM-DD")
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