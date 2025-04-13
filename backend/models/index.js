const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const {Sequelize} = require('sequelize');
const createMessageModel = require('./message_model');
const createUserModel = require('./user_model');

const sequelize = new Sequelize('defaultdb', 'avnadmin', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // This is for self-signed certificates
        }
    }
});

const Message = createMessageModel(sequelize, Sequelize);
const User = createUserModel(sequelize, Sequelize);

module.exports = {
    sequelize,
    Message,
    User,
}