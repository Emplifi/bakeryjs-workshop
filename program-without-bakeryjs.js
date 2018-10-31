const { getDB } = require('./db')
const Binance = require('node-binance-api')
const ccxt = require('ccxt')


const run = async function (input) {
  input.forEach(async (value) => {
    const exchange = new ccxt[value.exchange]()
    const ohlcvArray = await exchange.fetchOHLCV(value.symbol, '1d')

    save(value.exchange, value.symbol, ohlcvArray)


    if (value.exchange == 'binance') {
      // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
      const period = '1m'
      const binance = new Binance()
      binance.websockets.candlesticks(value.symbol.replace('/', ''), period, (candlesticks) => {
        if (candlesticks.k.x) {
          save(value.exchange,
            value.symbol,
            [[
              candlesticks.k.t,
              parseFloat(candlesticks.k.o),
              parseFloat(candlesticks.k.h),
              parseFloat(candlesticks.k.l),
              parseFloat(candlesticks.k.c),
              parseFloat(candlesticks.k.v)
            ]])
        }
      })
    }
  })
}

const save = async function (exchange, symbol, ohlcv) {
  const dbFile = `${exchange}_${symbol.replace('/', '_')}.json`
  console.log(`Saving to ${dbFile}`)
  const db = await getDB(dbFile)
  await db
    .defaults({
      exchange: exchange,
      symbol: symbol,
      ohlcv: [],
    })
    .write()

  for (const element of ohlcv) {
  //   console.log(
  //     `${exchange} - ${symbol} - ${JSON.stringify(element)}`
  //   )
    const id = element[0]
    element.shift()
    await db.get('ohlcv').upsert({ id: id, ohlcv: element }).write()
  }
  console.log('OHLCV saved')
}


const params = [
  { exchange: 'binance', symbol: 'BTC/USDT' },
  { exchange: 'binance', symbol: 'LTC/BTC' }
]
run(params);