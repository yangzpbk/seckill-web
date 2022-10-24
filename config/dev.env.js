'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"prod"',
  SECKILL_APP_URL: 'http://124.220.29.69:14008/'
})
