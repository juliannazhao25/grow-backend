const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const {
  hashPassword, comparePassword, createToken,
} = require('../../lib/auth')


const login = async (obj, { username, password }, { res }) => {
  const user = await User.query().findOne({
    username,
  })
  if (!user) {
    throw new UserInputError('Invalid username')
  }

  const validPassword = await comparePassword(password, user.password)
  if (!validPassword) {
    throw new UserInputError('Invalid username or password')
  }


  // If successful login, set authentication information
  const payload = {
    sub: user.id,
  }
  const token = createToken(payload)
  res.set('x-token', token)

  return user
}

const register = async (obj, { input: { username, password, firstName } }, { res }) => {
  const passwordHash = await hashPassword(password)
  const usernameExists = await User.query().findOne({ username })
  if (usernameExists) {
    throw new UserInputError('Username is already in use')
  }

  const user = await User.query().insertAndFetch({
    username,
    password: passwordHash,
    firstName,
  })

  // If successful registration, set authentication information
  const payload = {
    sub: user.id,
  }
  const token = createToken(payload)
  res.set('x-token', token)

  return user
}

const resolver = {
  Mutation: { login, register },
}

module.exports = resolver
