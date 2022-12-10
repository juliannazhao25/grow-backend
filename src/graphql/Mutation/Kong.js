const Habits = require('../../models/Habits')
const HabitLog = require('../../models/HabitLog')

// eslint-disable-next-line max-len
const addHabit = async (obj, {
  userId, habit, description,
}) => {
  const added = await Habits.query().insert({
    userId, habit, description,
  })
  return added.id
}

const addHabitLog = async (obj, {
  habitId, date,
}) => {
  date.setHours(date.getHours() + 12)
  const today = new Date()
  today.setHours(today.getHours() + 12)
  const added = await HabitLog.query().insert({
    habitId,
    date: today,
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
