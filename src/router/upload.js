const express = require('express')
const router = express.Router()
const { Op } = require('sequelize')
const _ = require('lodash')

const BASE_URL = 'http://192.168.0.104'
const { SERVER_PORT } = require('../../constant')

const responseUrl = `${BASE_URL}:${SERVER_PORT}`

router.post('/uploadImg', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      })
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let img = req.files.file
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      const now = new Date().getTime()

      const resource = `${now}_${img.name}`
      await img.mv(`./uploads/${resource}`)
      //send response
      res.json({
        code: 200,
        status: true,
        message: 'File is uploaded',
        data: {
          url: `${responseUrl}/${resource}`,
          name: resource,
          mimetype: img.mimetype,
          size: img.size
        }
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/uploadImgs', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      })
    } else {
      let data = []

      if (!Array.isArray(req.files.file)) {
        let img = req.files.file

        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        img.mv('./uploads/' + img.name)

        //send response
        res.json({
          code: 200,
          status: true,
          message: 'File is uploaded',
          data: {
            url: BASE_URL + img.name,
            name: img.name,
            mimetype: img.mimetype,
            size: img.size
          }
        })
      }
      //loop all files
      _.forEach(_.keysIn(req.files.file), (key) => {
        console.log({ key })
        let photo = req.files.file[key]

        //move photo to uploads directory
        photo.mv('./uploads/' + photo.name)

        //push file details
        data.push({
          url: BASE_URL + photo.name,
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size
        })
      })

      //return response
      res.send({
        code: 200,
        status: true,
        message: 'Files are uploaded',
        data: data
      })
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
