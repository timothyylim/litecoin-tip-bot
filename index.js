// const User = require('./user')
// const tim = new User('timothyylim')
// console.log(tim.getAddress())

const Database = require('./database')
const myDB = new Database()
myDB.getBalance('john', (balance) => {
  console.log(balance);
})
