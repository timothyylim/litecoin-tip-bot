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
  db.get(`SELECT balance FROM ${table_name} WHERE user_id=?;`, userID, (err, row) =>{
    if (err) {
      cb(error, null)
    }
    cb(null, row)
  })
  db.close()
}

Database.prototype.updateBalance = function (userID, amount, cb) {
  const db = new sqlite3.Database(dbName)
  // db.run("UPDATE tbl SET name = ? WHERE id = ?", [ "bar", 2 ]);
  db.run(`UPDATE ${table_name} SET balance = ? WHERE user_id = ?;`, [amount, userID], (err) => {
    cb(err)
  })
  db.close()
}


module.exports = Database
