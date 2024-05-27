const express = require('express')
const https = require('https')
const router = express.Router()
// const { Op } = require('sequelize')
const _ = require('lodash')
const util = require('util')
const fs = require('fs')
const axios = require('axios')
const accessTokenJson = require('./access_token.json')
const configJson = require('./config.json')

router.get('/getAccessToken', async (req, res, next) => {
  new Promise(function (resolve, reject) {
    const currentTime = new Date().getTime()
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${configJson.appID}&secret=${configJson.appScrect}`
    if (accessTokenJson.access_token === '' || accessTokenJson.expires_time < currentTime) {
      https
        .get(url, function (res) {
          let buffer = [],
            result = ''
          res.on('data', function (data) {
            buffer.push(data)
          })
          res.on('end', function () {
            let body = Buffer.concat(buffer)
            result = JSON.parse(body)
            if (body.indexOf('errcode') < 0) {
              accessTokenJson.access_token = result.access_token
              accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000
              fs.writeFile(
                './src/router/wx/access_token.json',
                JSON.stringify(accessTokenJson),
                (err) => err && console.error(err)
              )
              resolve(accessTokenJson.access_token)
            } else {
              resolve(result)
            }
          })
        })
        .on('error', function (err) {
          reject(err)
        })
    } else {
      resolve(accessTokenJson.access_token)
    }
  }).then(function (data) {
    res.send(data)
  })
})

router.post('/getPhoneNumber', async (req, res, next) => {
  const { code } = req.body
  console.log(code)

  const currentTime = new Date().getTime()
  if (!accessTokenJson.access_token || accessTokenJson.expires_time < currentTime) {
    res.json({
      code: 403,
      message: '无效的access_token'
    })
    return
  }
  // console.log({ access_token, code })
  const url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessTokenJson.access_token}`
  axios
    .post(url, {
      code: code
    })
    .then((res1) => {
      console.log({ res1: res1.data })
      res.json(res1.data)
    })
})
module.exports = router
