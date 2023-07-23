const sequelize = require("../util/database");

const Sequelize = require("sequelize");

const Email = sequelize.define("email", {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
  },
  from: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  to: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  subject: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isRead: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  fromTrue: {
    type: Sequelize.BOOLEAN,
  },
  toTrue: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Email;
