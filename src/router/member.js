const express = require("express");
const router = express.Router();
const { member } = require("../../models");
const { Op } = require("sequelize");
const { jwtSign } = require('../utils/jwt')
const { cryptoPassword } = require('../utils/crpy')

router.post("/create", async (req, res, next) => {
  let { password, email } = req.body;
  password = cryptoPassword(password)
  try {
    let data = await member.findOne({
      where: {
        email,
      },
    });
    if (data) {
      res.json({
        data,
        message: "",
        code: 201,
      });
    } else {
      data = await member.create({
        password,
        email,
      });
      if (data) {
        const token = jwtSign({name:email})
        res.json({
          data,
          message: "创建成功",
          code: 200,
          token
        });
      } else {
        res.json({
          data,
          message: "创建失败",
          code: 401,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  let { password, email } = req.body;
  password = cryptoPassword(password)
  try {
    let data = await member.findOne({
      where: {
        email: email,
        password
      }
    })
    if (data) {
      const token = jwtSign({ name: email })
      res.json({
        code: 200,
        data,
        message: '请求成功',
        token
      })
    } else {
      res.json({
        code: 401,
        message: '用户不存在或者密码错误'
      })
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
