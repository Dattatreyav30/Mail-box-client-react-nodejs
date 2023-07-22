const Sequelize = require('sequelize');

const sequelize = new Sequelize('mail_box_cleint','root',"Mykoshi@3",{
    dialect : 'mysql',
    host  : 'localhost'
})

module.exports = sequelize;