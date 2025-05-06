module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(50),
      unique: true,
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING(100),
    },
    usernameColor: {
      type: Sequelize.STRING(8),
      allowNull: true
    },
    profilePicture: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    onlineStatus: {
      type: Sequelize.STRING(50),
      allowNull: true
    }

  });

  return User;
};
