const express = require('express')
const router = express.Router()
const { readdirSync } = require('fs')
const { dataDir } = require('../db')

router.get('/', (req, res, next) => {
  const files = readdirSync(dataDir).filter(fname => fname.endsWith('.json'))
  res.render('ohlc', { title: 'Candlestick Chart', files })
})

router.use('/data', express.static(dataDir))

module.exports = router
