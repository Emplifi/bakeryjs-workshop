const path = require('path')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const lodashId = require('lodash-id')

const dbDir = path.resolve(__dirname, 'db')

exports.dataDir = dbDir
exports.getDB = async (dbFile) => {
  const adapter = new FileAsync(path.join(dbDir, dbFile))
  const db = await low(adapter)
  db._.mixin(lodashId)
  return db
}
