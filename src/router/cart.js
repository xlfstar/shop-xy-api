const express = require("express");
const router = express.Router();
const { shopping_cart: cart } = require("../../models");
const { Op, where } = require("sequelize");
const _ = require("lodash");

router.post("/create", async (req, res, next) => {
  let { member_id, goods_id, sku_id, status, numbers, extra } = req.body;

  try {
    let data;
    let sameSkuCart = await cart.findOne({
      where: {
        member_id,
        sku_id,
      },
    });
    if (!_.isEmpty(sameSkuCart)) {
      let sum = sameSkuCart.numbers + numbers;
      data = await cart.update({
        where: {
          id: sameSkuCart.id,
          numbers: sum,
        },
      });
    } else {
      data = await cart.create({
        member_id,
        goods_id,
        sku_id,
        status,
        numbers,
        extra,
      });
    }
    if (data) {
      res.json({
        data,
        message: "成功加入购物车",
        code: 200,
      });
    } else {
      res.json({
        data,
        message: "加入购物车失败",
        code: 401,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/updateCartNumbers", async (req, res, next) => {
  let { numbers, id } = req.body;
  try {
    let data = cart.findOne({
      where: {
        id,
      },
    });
    if (data) {
      // const updateData = Object.assign({},numbers&&{numbers},status)
      await data.update({
        numbers,
      });
      res.json({ data, message: "购物车更新成功", code: 200 });
    } else {
      res.json({ data, message: "购物车更新失败", code: 401 });
    }
  } catch (error) {
    next(error);
  }
});
router.post("/updateCartStatus", async (req, res, next) => {
  let { status, id } = req.body;
  try {
    let data = cart.findOne({
      where: {
        id,
      },
    });
    if (data) {
      // const updateData = Object.assign({},numbers&&{numbers},status)
      await data.update({
        status,
      });
      res.json({ data, message: "购物车更新成功", code: 200 });
    } else {
      res.json({ data, message: "购物车更新失败", code: 401 });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  let { id } = req.body;
  try {
    let data = await cart.findOne({
      where: {
        id,
      },
    });
    if (data) {
      await data.destroy();
      res.json({
        data,
        message: "删除成功",
        code: 200,
      });
    } else {
      res.json({
        data,
        message: "无效的id",
        code: 401,
      });
    }
  } catch (error) {
    next(error);
  }
});
router.get("/list", async (req, res, next) => {
  let { member_id, status } = req.query;
  try {
    let { rows, count } = await cart.findAndCountAll({
      where: {
        member_id,
        status,
      },
    });
    if (rows) {
      res.json({
        count,
        data: rows,
        message: "OK",
        code: 200,
      });
    } else {
      res.json({
        data,
        message: "服务器出错",
        code: 401,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/addList", async (req, res, next) => {
  let { list } = req.body;
  try {
    data = await cart.bulkCreate(list); //批量新增
    if (data) {
      res.json({
        code: 200,
        message: "保存成功",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
