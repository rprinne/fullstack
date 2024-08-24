const router = require('express').Router()
const { tokenExtractor } = require("../util/middleware")
const { User, Session } = require('../models')

router.delete('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  await Session.destroy({
    where: {
      userId: user.id
    }
  })

  res.status(204).end()
})

module.exports = router