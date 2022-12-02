const Laws = require('../../models/Laws')
const Goals = require('../../models/Goals')

const lawsByUserId = async (obj, { userId }) => {
  const laws = await Laws.query().where({ userId })
  return laws
}

const goalsByUserId = async (obj, { userId }) => {
  const goals = await Goals.query().where({ userId })
  return goals
}

const resolver = {
  Query: {
    lawsByUserId,
    goalsByUserId,
  },
}
module.exports = resolver
