const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("note", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        content: DataTypes.STRING,
        author: DataTypes.INTEGER,
    });
};
