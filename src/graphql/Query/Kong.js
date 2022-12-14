const Habits = require('../../models/Habits')
const HabitLog = require('../../models/HabitLog')

const habitsByUserId = async (obj, { userId }) => {
  const habits = await Habits.query().where({ userId })
  return habits
}

const logByHabitId = async (obj, { habitId }) => {
  const today = new Date()
  const habit = await Habits.query().findById(habitId)
  const logToday = await HabitLog.query().where({ habitId }).where('date', today)
  let doneToday = false
  if (logToday.length !== 0) {
    doneToday = true
  }
  const log = await HabitLog.query()
    .where({ habitId })
    .orderBy('date', 'ASC')
  const successDays = log.length // number of successful days
  const tDays = Math.floor((today.getTime() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  const lastMonth = []
  let streak = true
  let count = 0
  for (let i = 0; i < 30; ++i) {
    const c = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    if (log.length > 0) {
      const current = log[log.length - 1]
      if (`${current.date.getFullYear()}-${current.date.getMonth() + 1}-${current.date.getDate()}` === c) {
        // if (current.date === today) {
        lastMonth.push({
          date: c,
          completed: true,
        })
        log.pop()
        if (streak) {
          count += 1
        }
      } else {
        streak = false
        lastMonth.push({
          date: c,
          completed: false,
        })
      }
    } else {
      lastMonth.push({
        date: c,
        completed: false,
      })
    }
    today.setHours(today.getHours() - 24)
  }
  return {
    habitId,
    habit: habit.habit,
    description: habit.description,
    doneToday,
    totalDays: tDays,
    successDays,
    streak: count,
    lastMonth,
  }
}

const resolver = {
  Query: {
    habitsByUserId,
    logByHabitId,
  },
}
module.exports = resolver
