const { merge } = require('lodash')
const User = require('./User')
const Viewer = require('./Viewer')
const HanFei = require('./HanFei')
const Kong = require('./Kong')

const resolvers = [User, Viewer, HanFei, Kong]

module.exports = merge(...resolvers)
