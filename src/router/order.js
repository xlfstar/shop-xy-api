const express = require('express')
const router = express.Router()
const { orders } = require('../../models')
const { Op } = require('sequelize')

router.post('/create', async (req, res, next) => {
  let fieldsData = req.body
  const random = Math.floor(1000 + Math.random() * 9000)
  const oid = new Date().getTime() * 10000 + random
  fieldsData.oid = oid
  try {
    let data = await orders.create(fieldsData)
    if (data) {
      res.json({
        data,
        code: 200,
        message: '订单创建成功'
      })
    } else {
      res.json({
        data,
        code: 401,
        message: '订单创建失败'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/list', async (req, res, next) => {
  let { oid, member_id, email, page = 1, limit = 20, status, orderby, payment_method, phone } = req.query
  let { field = 'updatedAt', direction = 'DESC' } = orderby || {}
  page = Number(page)
  limit = Number(limit)
  oid = Number(oid)
  member_id = Number(member_id)
  payment_method = Number(payment_method)
  try {
    let where = Object.assign(
      {},
      (status === 0 || status === 1) && { status },
      oid && {
        oid: { [Op.substring]: oid }
      },
      email && {
        email: { [Op.substring]: email }
      },
      member_id && { member_id },
      payment_method && { payment_method },
      phone && {
        phone: { [Op.substring]: phone }
      }
    )
    if (page < 1) page = 1
    const offset = (page - 1) * limit
    let { rows, count } = await orders.findAndCountAll({
      where,
      order: [[field, direction]],
      offset,
      limit
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
