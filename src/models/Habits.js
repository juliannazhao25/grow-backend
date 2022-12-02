const BaseModel = require('./BaseModel')

class Habits extends BaseModel {
  static get tableName() {
    return 'habits'
  }
}

module.exports = Habits
