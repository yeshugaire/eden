module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("User", {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},

		username: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},

		password: {
			type: DataTypes.TEXT,
			allowNull: false
		},

		last_login: {
			type: DataTypes.DATE
		},

		status: {
			type: DataTypes.ENUM("active", "inactive"),
			defaultValue: "active"
		}
	});

	User.associate = function (models) {
		User.hasMany(models.Plant, {
			onDelete: "cascade"
		});
	};

	User.associate = function(models) {
		User.hasMany(models.Event, {
			onDelete: "cascade"
		});
	};

	return User;
};