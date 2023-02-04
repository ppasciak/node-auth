const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("user", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
    });
};
