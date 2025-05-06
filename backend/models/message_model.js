const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("messages", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        authorId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        roomId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        attachments: {
            type: DataTypes.JSON,
            allowNull: true
        },
    });
};