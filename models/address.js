'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init(
    {
      first_name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      street_address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postal_code: DataTypes.STRING,
      is_default: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'address'
    }
  )
  return address
}
