const Sequelize = require('sequelize');
const { Configs } = require('../configs/Configs.js');

const Cogs = Configs.define('__tbl_cogs', {
    ref: {
        type: Sequelize.STRING,
        allowNull: false
    },
    session: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startdate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    enddate: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = {
    Cogs
}
