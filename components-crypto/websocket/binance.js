const Binance = require('node-binance-api')
const { boxFactory } = require('bakeryjs')

// https://github.com/jaggedsoft/node-binance-api
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md

module.exports = boxFactory(
  'binance',
  {
    requires: [],
    provides: [],
    emits: [],
    aggregates: false,
  },
  function (serviceProvider, value, emit) {
  }
)
