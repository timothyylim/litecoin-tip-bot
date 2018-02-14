const Database = require('./database')
const myDB = new Database()

function User (userID) {
  this.userID = userID
}

User.prototype.deposit = function () {}

User.prototype.getBalance = function () {
  return myDB.getBalance(this.userID, (error, balance) => {
    if (error) {
      return error
    }
    return balance
  })
}

User.prototype.tip = function(recipient, amount) {
  const senderBalance = this.getBalance()
  if (senderBalance < amount) {
    return 'Not enough dough'
  }

  // Update sender's balance
  const senderBalance = this.getBalance()
  myDB.updateBalance(this.userID, amount, (err) => {
    if (err) {
      console.log(err)
    }
  })

  // Update recipient's balance
  const Recipient = new User(recipient)
  const recipientBalance = Recipient.getBalance()
  myDB.updateBalance(this.userID, recipientBalance+amount, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

User.prototype.withdraw = function () {}

module.exports = User
