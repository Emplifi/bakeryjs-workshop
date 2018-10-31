import * as sse from './viz/sse.mjs'
import { schemaToElements } from './viz/convert.mjs'
import { setElements } from './viz/graph.mjs'

sse.onFlowSchema(({ boxMetas, schema, edges }) => {
  setElements(schemaToElements(schema, boxMetas))
})

/*
const boxMetas = {
  'componentA': {
    requires: [],
    provides: ['text'],
  },
  'componentB': {
    requires: ['text'],
    provides: ['symbol']
  },
  'componentC': {
    requires: ['text'],
    provides: []
  },
  'storage/saveOHLCVtoLowDB': {
    requires: ['ohlcv', 'exchange', 'symbol'],
    provides: [],
    emits: [],
    aggregates: false,
  },
  'ccxt/grabOHLCV': {
    requires: ['exchange', 'symbol'],
    provides: ['ohlcv'],
    emits: [],
    aggregates: false,
  },
  'ccxt/exchangeSymbols': {
    requires: [],
    provides: ['exchange', 'symbol'],
    emits: ['settings'],
    aggregates: false,
  },
}

const schema = {
  process: [
    ['componentA'],
    ['componentB', 'componentC'],
    [{
      'ccxt/exchangeSymbols': [
        ['ccxt/grabOHLCV'],
        ['storage/saveOHLCVtoLowDB'],
      ],
    }],
  ],
}

setElements(schemaToElements(schema, boxMetas))
*/
