import Highcharts from 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/6.2.0/js/es-modules/masters/highstock.src.js'
const containerId = 'chart'
const fileSelect = document.querySelector('#file-select')

async function fetchData (fileName) {
  const res = await fetch(`/ohlc/data/${fileName}`)
  return res.json()
}

async function renderChart ({ exchange, ohlc, symbol }) {
  Highcharts.stockChart(containerId, {
    rangeSelector: {
      buttons: [
        {
          type: 'hour',
          count: 1,
          text: '1h',
        },
        {
          type: 'hour',
          count: 4,
          text: '4h',
        },
        {
          type: 'hour',
          count: 8,
          text: '8h',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
    },

    title: {
      text: `${symbol} from ${exchange}`,
    },

    series: [
      {
        type: 'candlestick',
        name: symbol,
        data: ohlc,
      },
    ],
  })
}

function convertOhlc ({ exchange, symbol, ohlcv }) {
  const ohlc = ohlcv.map(({ id, ohlcv }) => {
    return [id, ...ohlcv.slice(0, 4)]
  })
  return {
    exchange,
    symbol,
    ohlc,
  }
}

function loadChart (filename) {
  fetchData(filename)
    .then(convertOhlc)
    .then(renderChart)
}

function changeHandler (event) {
  const { value } = event.target
  if (value) {
    console.log('Loading file', value)
    loadChart(value)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fileSelect.addEventListener('change', changeHandler)
  fileSelect.dispatchEvent(new Event('change'))
})
