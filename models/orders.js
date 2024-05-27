'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init(
    {
      oid: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      member_id: {
        type: DataTypes.INTEGER,
        comment: '用户ID,没登录就没有'
      },
      first_name: {
        type: DataTypes.STRING
      },
      last_name: {
        type: DataTypes.STRING
      },
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      country_id: {
        type: DataTypes.INTEGER(3)
      },
      street_address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      postal_code: {
        type: DataTypes.STRING,
        comment: '邮政编码'
        // allowNull:false
      },
      status: {
        type: DataTypes.TINYINT(1),
        comment: '状态0:用户取消,1:待付款,2:已付款未发货，3:已付款已发货，4:已付款已收货，5:时间到未付款过期，6:已完成'
      },
      payment_method: {
        type: DataTypes.TINYINT(1),
        allowNull: false
      },
      skus: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '商品sku数组'
      },
      sub_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品总价格'
      },
      discount: {
        type: DataTypes.TINYINT(3),
        comment: '折扣',
        allowNull: false,
        defaultValue: 100
      },
      shipping_amount: {
        type: DataTypes.INTEGER,
        comment: '运费'
      }
    },
    {
      sequelize,
      modelName: 'orders'
    }
  )
  return orders
}
