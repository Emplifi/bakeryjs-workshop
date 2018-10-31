const { boxFactory } = require('bakeryjs')

module.exports = boxFactory(
  'exchangeSymbols',
  {
    requires: [],
    provides: ['exchange', 'symbol'],
    emits: ['settings'],
    aggregates: false,
  },
  function (serviceProvider, value, emit) {
    emit([{ exchange: 'binance', symbol: 'BTC/USDT' }])
    emit([{ exchange: 'binance', symbol: 'LTC/BTC' }])
  }
)
