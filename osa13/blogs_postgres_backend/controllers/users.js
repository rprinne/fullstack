const router = require('express').Router()
const { Op } = require('sequelize')
const { User, Blog, Readinglist } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title']
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  let where = {}

  if (req.query.read) {
    console.log(req.query)
    where = { read: req.query.read}
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: ['title']
      },
      {
        model: Blog,
        as: 'readings',
        attributes: ['title'],
        through: {
          attributes: ['read', 'id'],
          where
        },
      },
    ]
  })

  if(user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  req.user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  req.user.username = req.body.username
  req.user.save()
  res.json(req.user)
})

module.exports = router