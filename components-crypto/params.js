const { boxFactory } = require('bakeryjs')

module.exports = boxFactory(
  'params',
  {
    requires: [],
    provides: [],
    emits: [],
    aggregates: false,
  },
  function (serviceProvider, value, emit) {
  }
)
