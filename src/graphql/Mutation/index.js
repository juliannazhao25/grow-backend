const { merge } = require('lodash')
const Auth = require('./Auth')
const HanFei = require('./HanFei')
const Kong = require('./Kong')

const resolvers = [Auth, HanFei, Kong]

module.exports = merge(...resolvers)
