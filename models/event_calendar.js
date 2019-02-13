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

		// daysOfWeek: {
		// 	type: Sequelize.TEXT,
		// 	get: function () {
		// 		return JSON.parse(this.getDataValue(data));
		// 	},
		// 	set: function (value) {
		// 		this.setDataValue("value", JSON.stringify(value));
		// 	},
		// 	defaultValue: [1,2,3,4,5,6,7]
		// },

		daysOfWeek: {
			type: DataTypes.JSON,
			allowNull: false,
			defaultValue: [1,2,3,4,5,6,7]
		},

		date_start: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: moment().format("YYYY-MM-DD")
		},

		date_end: {
			type: DataTypes.STRING,
			allowNull: false,
			// Sets end date to 100 years from date added. See if there's a more elegant way to handle this in the future.
			defaultValue: moment().add(100, "years").format("YYYY-MM-DD")
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