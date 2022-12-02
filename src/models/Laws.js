const BaseModel = require('./BaseModel')

class Laws extends BaseModel {
  static get tableName() {
    return 'laws'
  }
}

module.exports = Laws
