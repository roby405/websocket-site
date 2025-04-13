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
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roomId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
};