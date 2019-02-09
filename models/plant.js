module.exports = function(sequelize, DataTypes) {
	var Plant = sequelize.define("Plant", {
		common_name:  {
			type: DataTypes.STRING,
			allowNull: false
		},

		species_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},

		sowing_method: {
			type: DataTypes.VARCHAR,
			allowNull: true
		},

		sun_requirements: {
			type: DataTypes.VARCHAR,
			allowNull: true
		},

		water_needs: {
			type: DataTypes.VARCHAR,
			allowNull: true,
		},

		image_path: {
			type: DataTypes.STRING,
			allowNull: true
		},
	});

	return Plant;
};