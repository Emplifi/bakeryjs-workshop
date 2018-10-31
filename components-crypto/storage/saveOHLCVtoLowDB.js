const { boxFactory } = require('bakeryjs')

const { getDB } = require('../../db')

module.exports = boxFactory(
  'saveOHLCVtoLowDB',
  {
    requires: ['ohlcv', 'exchange', 'symbol'],
    provides: [],
    emits: [],
    aggregates: false,
  },
  async function (serviceProvider, value, emit) {
    const { exchange, symbol, ohlcv } = value
    const dbFile = `${exchange}_${symbol.replace('/', '_')}.json`
    console.log(`Saving to ${dbFile}`)
    const db = await getDB(dbFile)
    await db
      .defaults({
        exchange: value.exchange,
        symbol: value.symbol,
        ohlcv: [],
      })
      .write()

    for (const element of ohlcv) {
      console.log(
        `${value.exchange} - ${value.symbol} - ${JSON.stringify(element)}`
      )
      const id = element[0]
      element.shift()
      await db.get('ohlcv').upsert({ id: id, ohlcv: element }).write()
    }
    console.log('OHLCV saved')
  }
)
