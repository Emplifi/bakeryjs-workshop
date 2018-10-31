const express = require('express')
const router = express.Router()
const sseExpress = require('sse-express')
const { program, runHistoryJob } = require('../program')
const connections = new Set()

function broadcast (event, data) {
  for (const connection of connections) {
    connection.sse({ event, data })
  }
}

program.on('sent', (timestamp, source, target, batchSize) => {
  broadcast('sent', { timestamp, source, target, batchSize })
})

program.on('sent', (timestamp, source, target, batchSize) => {
  broadcast('sent', { timestamp, source, target, batchSize })
})
program.on('queue_in', (data) => {
  broadcast('queue_in', data)
})
program.on('queue_stats', (data) => {
  broadcast('queue_in', data)
})
program.on('box_timing', (data) => {
  broadcast('box_timing', data)
})
program.on('run', (flow, job) => {
  console.log('run', { flow, job })
})
program.on('flowSchema', (schema, boxMetas, edges) => {
  broadcast('flowSchema', { schema, boxMetas, edges })
})

router.get('/', (req, res, next) => {
  res.render('viz', { title: 'BakeryJS Visualization' })
  setTimeout(runHistoryJob, 3000)
})

router.get('/stream', sseExpress(), (req, res) => {
  connections.add(res)
  console.log('Starting SSE')
  res.sse({
    event: 'components',
    data: {},
  })
  req.on('close', () => {
    console.log('Connection closed')
    connections.delete(res)
  })
})

module.exports = router
