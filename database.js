const sqlite3 = require('sqlite3').verbose()
// const {db_name, table_name} = require('./config')
const dbName = './database/test'
const table_name = 'test_table'

function Database () {
  const db = new sqlite3.Database(dbName)
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ${table_name} (user_id TEXT, balance INT)`)
  })
  db.close()
}

Database.prototype.getBalance = function (userID, cb) {
  const db = new sqlite3.Database(dbName)
  db.get(`SELECT balance FROM ${table_name} WHERE user_id=?;`, 'john', (err, row) =>{
    if (err) {
      return error
    }
    cb(row)
  })
  db.close()
}


module.exports = Database
