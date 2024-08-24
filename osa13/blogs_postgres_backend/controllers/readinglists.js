const router = require('express').Router()
const { tokenExtractor } = require("../util/middleware")
const { User, Readinglist } = require('../models')

router.post('/', async (req, res) => {
  const readinglist = await Readinglist.create(req.body)
  res.json(readinglist)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  
  const entry = await Readinglist.findOne({
    where: {
      userId: user.id,
      blogId: req.params.id
    }
  })

  if (entry) {
    entry.read = req.body.read
    await entry.save()
    res.json(entry)
  } else {
    res.status(404).end()
  }
})

module.exports = router