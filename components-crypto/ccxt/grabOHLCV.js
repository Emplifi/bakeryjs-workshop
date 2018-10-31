const { boxFactory } = require('bakeryjs')
const ccxt = require('ccxt')

module.exports = boxFactory(
  'grabOHLCV',
  {
    requires: ['exchange', 'symbol'],
    provides: ['ohlcv'],
    emits: [],
    aggregates: false,
  },
  async function (serviceProvider, value, emit) {
    const exchange = new ccxt[value.exchange]()
    const ohlcvArray = await exchange.fetchOHLCV(value.symbol, '1d')
    return { ohlcv: ohlcvArray }
  }
)
