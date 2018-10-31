const { boxFactory } = require('bakeryjs')

const { getDB } = require('../db')

module.exports = boxFactory(
  'save',
  {
    requires: [],
    provides: [],
    emits: [],
    aggregates: false,
  },
  async function (serviceProvider, value, emit) {
  }
)
