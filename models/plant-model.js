module.exports = function (sequelize, DataTypes) {
	var Plant = sequelize.define("Plant", {
		commonName: DataTypes.STRING,
		scientificName: DataTypes.STRING,
		personalName: DataTypes.STRING,
		shadeTolerance: DataTypes.STRING,
		moistureUse: DataTypes.STRING,
		salinityTolerance: DataTypes.STRING,
		plantingDensityMinimum: DataTypes.STRING,
		rootDepthMinimum: DataTypes.STRING,
		matureHeight: DataTypes.STRING,
		wateringSchedule: DataTypes.INTEGER,
		fertilizingSChedule: DataTypes.INTEGER
	});
	return Plant;
};