const express = require('express')
const router = express.Router()
const { goods_sku } = require('../../models')

router.post('/add/:goods_id', async (req, res, next) => {
  let list = req.body
  let { goods_id } = req.params
  list = list?.map((item) => {
    const { status, sku_image, stock, price, cost_price, spec_values } = item || {}
    return { goods_id, status, sku_image, stock, price: price * 100, cost_price: cost_price * 100, spec_values }
  })

  try {
    let data = await goods_sku.destroy({
      where: { goods_id }
    })
    data = await goods_sku.bulkCreate(list) //批量新增
    if (data) {
      res.json({
        code: 200,
        message: '保存成功',
        data
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/list', async (req, res, next) => {
  let { goods_id } = req.query
  try {
    let { rows, count } = await goods_sku.findAndCountAll({
      where: {
        goods_id,
        status: 1
      }
    })
    if (rows) {
      res.json({
        count,
        data: rows,
        message: 'OK',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '服务器出错',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
