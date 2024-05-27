const express = require('express')
const router = express.Router()
const { user } = require('../../models')
const { Op } = require('sequelize')
const _ = require('lodash')
const { jwtSign } = require('../utils/jwt')
const { cryptoPassword } = require('../utils/crpy')

router.post('/admin/login', async (req, res, next) => {
  let { userName, password } = req.body
  password = cryptoPassword(password)
  try {
    let data = await user.findOne({
      where: {
        name: userName,
        password
      }
    })
    if (data) {
      const token = jwtSign({ name: userName })

      res.json({
        code: 200,
        data,
        message: '请求成功',
        token
      })
    } else {
      res.status(401).json({
        code: 401,
        message: '用户不存在或者密码错误'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/admin/create', async (req, res, next) => {
  let { userName, password } = req.body
  password = cryptoPassword(password)
  try {
    let data = await user.create({ name: userName, password })
    if (data) {
      res.json({
        code: 200,
        data,
        message: '创建管理员成功'
      })
    } else {
      res.json({
        code: 401,
        message: '创建管理员失败'
      })
    }
  } catch (error) {
    next(error)
  }
})

router.get('/admin/test', async (req, res, next) => {
  res.json({
    data: '测试'
  })
})
module.exports = router
