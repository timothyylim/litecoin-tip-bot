const Database = require('./database')
const myDB = new Database()

function User (userID, cb) {
  this.userID = userID
  myDB.insertUser(userID, 0, (err) => {
    if (err) {
      cb(err, null)
      return
    }
    cb(null, this)
  })
}

User.prototype.deposit = function (amount, cb) {
  this.getBalance((err, currentBalance) => {
    myDB.updateBalance(this.userID, (currentBalance+amount), (err) => {
      if (err) {
        cb(err)
      } else {
        cb(null)
      }
    })
  })
}

User.prototype.withdraw = function (cb) {
  const self = this
  myDB.updateBalance(this.userID, 0, (err) => {
    if (err) {
      cb(err, null)
    } else {
      self.getBalance((err, balance) => {
        cb(null, balance)
      })
    }
  })
}

User.prototype.getBalance = function (cb) {
  myDB.getBalance(this.userID, (error, balance) => {
    if (error) {
      return cb(err, null)
    }
    return cb(null, balance)
  })
}

User.prototype.tip = function(recipient, amount, cb) {
  const self = this
  this.getBalance((err, balance) => {
    if (amount > balance) {
      cb('Not enough dough')
    }
    else {

      // Update sender's balance
      myDB.updateBalance(self.userID, (balance-amount), (err) => {

        // Update the recipient's balance
        new User(recipient, (err, user) => {
          user.deposit(amount, (err) => {
            cb(null)
          })
        })
      })
    }
  })
}


module.exports = User
