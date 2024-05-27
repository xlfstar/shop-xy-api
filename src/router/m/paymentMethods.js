const express = require('express')
const router = express.Router()
const { payment_methods } = require('../../../models')
const { Op } = require('sequelize')

router.post('/create', async (req, res, next) => {
  let { name, sort } = req.body
  try {
    let data = await payment_methods.create({ name, sort })
    if (data) {
      res.json({
        data,
        message: '创建付款方式成功',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '创建付款方式失败',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/update', async (req, res, next) => {
  let { id, name, status, sort } = req.body

  try {
    let data = await payment_methods.findOne({
      where: {
        id
      }
    })

    if (data) {
      await data.update({
        name,
        sort,
        status
      })
      res.json({ data, message: '付款方式更新成功', code: 200 })
    } else {
      res.json({ data, message: '付款方式更失败', code: 401 })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/delete', async (req, res, next) => {
  let { id } = req.body
  try {
    let data = await payment_methods.findOne({
      where: {
        id
      }
    })
    if (data) {
      await data.destroy()
      res.json({
        data,
        message: '删除成功',
        code: 200
      })
    } else {
      res.json({
        data,
        message: '无效的id',
        code: 401
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/list', async (req, res, next) => {
  let { name, page = 1, limit = 20, status, orderby } = req.query
  let { field = 'updatedAt', direction = 'DESC' } = orderby || {}
  page = Number(page)
  limit = Number(limit)
  status = Number(status)

  try {
    let where = Object.assign(
      {},
      (status === 0 || status === 1) && { status },
      name && {
        name: { [Op.substring]: name }
      }
    )
    if (page < 1) page = 1
    const offset = (page - 1) * limit
    let { rows, count } = await payment_methods.findAndCountAll({
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
