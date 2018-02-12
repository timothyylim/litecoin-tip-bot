const test = require('tape-async');
// Load temp super secret beofre User module
process.env.SUPERSECRET = 's'
const User = require('../user')

test('Can return a deposit address', function (t) {
  t.plan(1)
  const tim = new User('timothyylim')
  t.equal(tim.getAddress(), 'LRXfVeLiBk16v18z1m9fvrhSMxua7eNnMq')
});

test('Can return balance of an address', async (t) => {
  t.plan(1)
  const tim = new User('timothyylim')
  const balance = await tim.getBalance()
  t.equal(balance, 0);
})

test('Can handle errors successfully when getting balance', async (t) => {
  
})
