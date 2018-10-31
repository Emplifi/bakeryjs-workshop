const Binance = require('node-binance-api')
const { boxFactory } = require('bakeryjs')

// https://github.com/jaggedsoft/node-binance-api
// https://github.com/binance-exchange/binance-official-api-docs/blob/master/web-socket-streams.md

module.exports = boxFactory(
  'binanceOHLCV',
  {
    requires: ['exchange', 'symbol'],
    provides: ['ohlcv'],
    emits: ['settings'],
    aggregates: false,
  },
  function (serviceProvider, value, emit) {
    if (value.exchange !== 'binance') {
      return
    }
    // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
    const period = '1m'
    const binance = new Binance()
    binance.websockets.candlesticks(value.symbol.replace('/', ''), period, (candlesticks) => {
      if (candlesticks.k.x) {
        emit([{ exchange: 'binance',
          symbol: value.symbol,
          ohlcv: [[
            candlesticks.k.t,
            candlesticks.k.o,
            candlesticks.k.h,
            candlesticks.k.l,
            candlesticks.k.c,
            candlesticks.k.v
          ]] }])
      }
    })

    return true
  }
)
