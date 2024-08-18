const router = require('express').Router()

const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const users = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
    ],
    group: 'author',
    order: [['totalLikes', 'DESC']]
  })
  res.json(users)
})

module.exports = router