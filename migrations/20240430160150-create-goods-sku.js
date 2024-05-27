'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goods_skus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goods_id: {
        type: Sequelize.INTEGER,
        comment: '商品id',
        allowNull: false
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      price: {
        type: Sequelize.INTEGER,
        comment: '现价'
      },
      spec_value_ids: {
        type: Sequelize.STRING,
        comment: '规格属性id，用逗号链接'
      },
      cost_price: {
        type: Sequelize.INTEGER,
        comment: '原价'
      },
      stock: {
        type: Sequelize.INTEGER,
        comment: '库存'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('goods_skus')
  }
}
