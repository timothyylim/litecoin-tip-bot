const sqlite3 = require('sqlite3').verbose()
const dbName = process.env.DATABASE
const userTable = process.env.USER_TABLE

function Database () {
  const db = new sqlite3.Database(dbName)
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ${userTable} (user_id TEXT, balance INT)`)
  })
  db.close()
}

Database.prototype.getUser = function (userID, cb) {
  const db = new sqlite3.Database(dbName)
  db.get(`SELECT * FROM ${userTable} WHERE user_id = ?`, userID, (err, rows) => {
    cb(err, rows)
  })
  db.close()
}

Database.prototype.insertUser = function (userID, balance, cb) {
  this.getUser(userID, (err, rows) => {
    if (rows == undefined) {
      const db = new sqlite3.Database(dbName)
      db.run(`INSERT INTO ${userTable} (user_id, balance) VALUES (?,?);`, [userID, balance], (err) => {
        cb(err)
      })
      db.close()
    }
  })
}

Database.prototype.getBalance = function (userID, cb) {
  const db = new sqlite3.Database(dbName)
  db.get(`SELECT balance FROM ${userTable} WHERE user_id=?;`, userID, (err, row) =>{
    if (err) {
      cb(error, null)
    }
    cb(null, row)
  })
  db.close()
}

Database.prototype.updateBalance = function (userID, amount, cb) {
  const db = new sqlite3.Database(dbName)
  db.run(`UPDATE ${userTable} SET balance = ? WHERE user_id = ?;`, [amount, userID], (err) => {
    cb(err)
  })
  db.close()
}

module.exports = Database
