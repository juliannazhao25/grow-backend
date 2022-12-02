const BaseModel = require('./BaseModel')

class Goals extends BaseModel {
  static get tableName() {
    return 'goals'
  }
}

module.exports = Goals
