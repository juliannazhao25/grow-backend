const BaseModel = require('./BaseModel')

class HabitLog extends BaseModel {
  static get tableName() {
    return 'habitLog'
  }
}

module.exports = HabitLog
