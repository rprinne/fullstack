const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
  token: {
    type: DataTypes.STRING,
    primaryKey: true,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'session',
})

module.exports = Session