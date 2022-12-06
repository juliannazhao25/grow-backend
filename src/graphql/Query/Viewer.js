const User = require('../../models/User')

const viewer = async (obj, params, { user }) => {
  const u = await User.query().findOne('id', user.id)
  return u
}

const resolver = {
  Query: {
    viewer,
  },
}

module.exports = resolver
