const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(password === undefined){
    return response.status(400).json({ error: 'password required' })
  }
  if(password.length < 3){
    return response.status(400).json({ error: 'password too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter