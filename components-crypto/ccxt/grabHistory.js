const { boxFactory } = require('bakeryjs')
const ccxt = require('ccxt')

module.exports = boxFactory(
  'grabHistory',
  {
    requires: [],
    provides: [],
    emits: [],
    aggregates: false,
  },
  async function (serviceProvider, value, emit) {
  }
)
