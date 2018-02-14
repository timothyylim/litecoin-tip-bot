// const User = require('./user')
// const tim = new User('timothyylim')
// console.log(tim.getAddress())

const Database = require('./database')
const myDB = new Database()
// myDB.getBalance('john', (error, balance) => {
  // console.log(balance);
// })

// Dummy tip
myDB.updateBalance('john', 5, (err) => {
  if (err) {
    console.log(err)
  }
})
