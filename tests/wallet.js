const test = require('tape-async');
const Wallet = require('../wallet')

test('Can generate a receive address', function (t) {
  t.plan(1)
  const myWallet = new Wallet()
  const receiveAddress = myWallet.generateReceiveAddress(1)
  t.equals(receiveAddress, 'mzi2EupcmbAM33BFXwjqZXELwzcgZCqnKa')
})

test('Can return balance of a receive address', function (t) {
  t.plan(1)
  const myWallet = new Wallet()
  const receiveAddress = myWallet.getBalanceOfReceiveAddress('mzi2EupcmbAM33BFXwjqZXELwzcgZCqnKa')
    .then(balance => {
      t.equals(balance, 0)
    })
})
