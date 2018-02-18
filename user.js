const Wallet = require('./wallet')
const myWallet = new Wallet()
const Database = require('./database')
const myDB = new Database()

function User (userID, cb) {
  var self = this
  self.userID = userID
  myDB.insertUser(userID, 0, (err) => {
    if (err) {
      cb(err, null)
      return
    }

    myDB.getUser(self.userID, (err, rows) => {
      self.address = myWallet.generateReceiveAddress(rows.rowid)
      cb(null, self)
    })
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
  const self = this;
  myDB.getBalance(self.userID, (error, internalBalance) => {
    if (error) {
      cb(err, null)
    }

    myWallet.getBalanceOfReceiveAddress(self.address)
      .then(addressBalance => {
        cb(null, internalBalance + addressBalance)
      })
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
