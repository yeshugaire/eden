module.exports = function(sequelize, DataTypes) {
	var Plant = sequelize.define("Plant", {
		plant_name:  {
			type: DataTypes.STRING,
			allowNull: false
		},

		data: {
			type: DataTypes.TEXT,
			defaultValue: "No data available for this plant type."
		},

		image_path: {
			type: DataTypes.STRING,
			allowNull: true,
			// defaultValue
		},

		personal_name: {
			type: DataTypes.STRING,
			allowNull: true
		},

		water_schedule: {
			type: DataTypes.INTEGER,
			allowNull: true
		},

		fertilization_schedule: {
			type: DataTypes.INTEGER,
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