const Goals = require('../../models/Goals')
const Laws = require('../../models/Laws')

// eslint-disable-next-line max-len
const addGoal = async (obj, {
  userId, goal, reward, punishment, vermin1, vermin2, vermin3, vermin4, vermin5,
}) => {
  const added = await Goals.query().insert({
    userId, goal, reward, punishment, vermin1, vermin2, vermin3, vermin4, vermin5,
  })
  return added.id
}

const addLaw = async (obj, {
  userId, law, punishment, reward,
}) => {
  const added = await Laws.query().insert({
    userId, law, punishment, reward,
  })
  return added.id
}

const resolver = {
  Mutation: {
    addGoal,
    addLaw,
  },
}

module.exports = resolver
