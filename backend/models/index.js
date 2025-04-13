const {Sequelize} = require('sequelize');
const createMessageModel = require('./message_model');
const createUserModel = require('./user_model');

const sequelize = new Sequelize('schema1', 'root', 'arst', {
    host: 'localhost',
    dialect: 'mysql'
});

const Message = createMessageModel(sequelize, Sequelize);
const User = createUserModel(sequelize, Sequelize);

module.exports = {
    sequelize,
    Message,
    User,
}