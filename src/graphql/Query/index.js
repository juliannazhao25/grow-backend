const { merge } = require('lodash')
const User = require('./User')
const HanFei = require('./HanFei')
const Kong = require('./Kong')

const resolvers = [User, HanFei, Kong]

module.exports = merge(...resolvers)
