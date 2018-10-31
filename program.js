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
        'params': [
          ['ccxt/grabHistory'],
          ['save'],
        ],
      },
    ],
  ],
}

const websocketJob = {
  process: [
    [
      {
        'params': [
          [
            {
              'websocket/binance': [['save']],
            },
          ],
        ],
      },
    ],
  ],
}

// Program is an event emitter
// 'sent' event is emitted when a message is sent between components.
// It can be used for simple tracing, as in here, or advanced instrumentations.
// p.on('sent', (timestamp, source, target, batchSize) => {
//   console.log(
//       `${new Date(
//           timestamp
//       ).toLocaleTimeString()} Sent: ${source} --> ${target} (${batchSize})`
//   );
// });

module.exports = {
  program: p,
  runHistoryJob: () => p.run(historyJob),
  runWebsocketJob: () => p.run(websocketJob),
}
