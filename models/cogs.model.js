const Sequelize = require('sequelize');
const { Configs } = require('../configs/Configs.js');

const Cogs = Configs.define('__tbl_cogs', {
    session: {
        type: Sequelize.INTEGER,
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
