const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const hbs = require('hbs')

const indexRouter = require('./routes/index')
const ohlcRouter = require('./routes/ohlc')
const vizRouter = require('./routes/viz')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/ohlc', ohlcRouter)
app.use('/viz', vizRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// HBS block/extend
hbs.registerHelper('extend', function (name, context) {
  if (!this._blocks) {
    this._blocks = []
  }
  let block = this._blocks[name]
  if (!block) {
    block = this._blocks[name] = []
  }
  block.push(context.fn(this)) // for older versions of handlebars, use block.push(context(this));
})

hbs.registerHelper('block', function (name) {
  if (!this._blocks) {
    this._blocks = []
  }
  const val = (this._blocks[name] || []).join('\n')

  // clear the block
  this._blocks[name] = []
  return val
})

module.exports = app
