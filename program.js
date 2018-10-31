const { Program } = require('bakeryjs')

const p = new Program(
  {},
  {
    componentPaths: [`${__dirname}/components-crypto/`],
  }
)

const historyJob = {
  process: [
    [
      {
        'ccxt/exchangeSymbols': [
          ['ccxt/grabOHLCV'],
          ['storage/saveOHLCVtoLowDB'],
        ],
      },
    ],
  ],
}

const websocketJob = {
  process: [
    [
      {
        'ccxt/exchangeSymbols': [
          [
            {
              'websocket/binanceOHLCV': [['storage/saveOHLCVtoLowDB']],
            },
          ],
        ],
      },
    ],
  ],
}

module.exports = {
  program: p,
  runHistoryJob: () => p.run(historyJob),
  runWebsocketJob: () => p.run(websocketJob),
}
