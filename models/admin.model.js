const Sequelize = require('sequelize');
const { Configs } = require('../configs/Configs.js');

const Admin = Configs.define('__tbl_players', {
    ref: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lsname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accesslevel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = {
    Admin
}
