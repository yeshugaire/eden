module.exports = function(sequelize, DataTypes) {
	var Plant = sequelize.define("Plant", {
		plant_name:  {
			type: DataTypes.STRING,
			allowNull: false
		},

		data: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: "No data available for this plant type."
		},

		image_path: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "https://t3.ftcdn.net/jpg/01/06/37/46/240_F_106374609_yP3PAzCuk1qGbFQE92HBCeuCvXllLMzA.jpg"
		},

		personal_name: {
			type: DataTypes.STRING,
			allowNull: true
		},

		notes: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	});

	Plant.associate = function(models) {
		Plant.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Plant;
};