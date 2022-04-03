const Sequelize = require('sequelize');
const { Configs } = require('../configs/Configs.js');

const Player = Configs.define('__tbl_players', {
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
    province: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ville: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pays: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "RDCongo"
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = {
    Player
}
