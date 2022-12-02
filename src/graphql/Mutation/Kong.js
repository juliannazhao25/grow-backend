const Habits = require('../../models/Habits')
const HabitLog = require('../../models/HabitLog')

// eslint-disable-next-line max-len
const addHabit = async (obj, {
  userId, habit,
}) => {
  const added = Habits.query().insert({
    userId, habit,
  })
  return added.id
}

const addHabitLog = async (obj, {
  habitId, date,
}) => {
  const added = HabitLog.query().insert({
    habitId, date,
  })
  return added.id
}

const resolver = {
  Mutation: {
    addHabit,
    addHabitLog,
  },
}

module.exports = resolver
