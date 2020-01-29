const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
  const uid = req.user._id
  User.findById(uid)
    .then(data => {
      const user = {
        name: data.name,
        idName: data.idName,
        email: data.email,
        _id: data._id
      }
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(400).json({ errors: err })
    })
})

router.get('/:idName', (req, res) => {
  const idName = req.params.idName

  User.findOne({ idName })
    .then(data => {
      const user = {
        name: data.name,
        idName: data.idName,
        _id: data._id,
      }
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(400).json({ err: 'Пользователь не найден' })
    })
})


module.exports = router
