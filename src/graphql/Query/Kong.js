const Habits = require('../../models/Habits')
const HabitLog = require('../../models/HabitLog')

const habitsByUserId = async (obj, { userId }) => {
  const habits = await Habits.query().where({ userId })
  return habits
}

const logByHabitId = async (obj, { habitId }) => {
  const today = new Date()
  const habit = await Habits.query().findById(habitId)
  const log = await HabitLog.query()
    .where({ habitId })
    .orderBy('date', 'ASC')
  const successDays = log.length // number of successful days
  const tDays = Math.floor((today.getTime() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  const lastMonth = []
  let streak = true
  let count = 0
  for (let i = 0; i < 30; ++i) {
    if (log.length > 0) {
      const current = log[log.length - 1]
      if (`${current.date.getFullYear()}-${current.date.getMonth() + 1}-${current.date.getDate()}%` === `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}%`) {
        // if (current.date === today) {
        lastMonth.push(current.date)
        log.pop()
        if (streak) {
          count += 1
        }
      } else {
        streak = false
        lastMonth.push(null)
      }
    } else {
      lastMonth.push(null)
    }
    today.setHours(today.getHours() - 24)
  }
  return {
    habitId,
    habit: habit.habit,
    totalDays: tDays,
    successDays,
    streak: count,
    lastMonth,
  }
}

const logsByUserId = async (obj, { userId }) => {
  const habits = await Habits.query().where({ userId })
  const logs = []
  for (let j = 0; j < habits.length; j++) {
    const habitId = habits[j].id
    const today = new Date()
    /* eslint-disable no-await-in-loop */
    const habit = await Habits.query().findById(habitId)
    const log = await HabitLog.query()
      .where({ habitId })
      .orderBy('date', 'ASC')
    const successDays = log.length // number of successful days
    const tDays = Math.floor((today.getTime() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24))
    const lastMonth = []
    let streak = true
    let count = 0
    for (let i = 0; i < 30; ++i) {
      if (log.length > 0) {
        const current = log[log.length - 1]
        if (`${current.date.getFullYear()}-${current.date.getMonth() + 1}-${current.date.getDate()}%` === `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}%`) {
          lastMonth.push(current.date)
          log.pop()
          if (streak) {
            count += 1
          }
        } else {
          streak = false
          lastMonth.push(null)
        }
      } else {
        lastMonth.push(null)
      }
      today.setHours(today.getHours() - 24)
    }
    logs.push({
      habitId,
      habit: habit.habit,
      totalDays: tDays,
      successDays,
      streak: count,
      lastMonth,
    })
  }
  return logs
}

const resolver = {
  Query: {
    habitsByUserId,
    logByHabitId,
    logsByUserId,
  },
}
module.exports = resolver
