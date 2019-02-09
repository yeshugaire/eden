module.exports = function(sequelize, DataTypes) {
	var Garden = sequelize.define("Garden", {
		name: models.User + "'s Garden",
		allowNull: false
	});

	Garden.associate = function(models) {
		Garden.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return Garden;
};