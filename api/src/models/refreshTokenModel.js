const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("refreshToken", {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
    });
};
