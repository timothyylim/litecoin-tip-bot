const test = require('tape-async');
// Change the db before the user is loaded
process.env.DATABASE = './database/test_database'

const User = require('../user')
const Database = require('../database')
const myDB = new Database()

test('Can initialize itself to the database', function (t) {
  t.plan(2);
  new User('tim', (err, user) => {
    // Test the user exists
    myDB.getUser('tim', (err, rows) => {
      t.equal(rows.user_id, 'tim');
      t.equal(rows.balance, 0);

      // Clean up
      myDB.dropUser('tim', err => {});
    })
  })
});

test('Can get its own balance', function (t) {
  t.plan(1);
  new User('tim', (err, user) => {
    user.getBalance((err, balance) => {
      t.equal(balance, 0)
      // Clean up
      myDB.dropUser('tim', err => {});
    })
  })
})

test('Can receive deposits', function (t) {
  t.plan(1);
  new User('tim', (err, user) => {
    user.deposit(10, (err) => {
      user.getBalance((err, balance) => {
        t.equal(balance, 10)
        // Clean up
        myDB.dropUser('tim', err => {});
      })
    })
  })
})

test('Can withdraw', function (t) {
  t.plan(1);
  new User('tim', (err, user) => {
    user.deposit(10, (err) => {
      user.withdraw((err, balance) => {
        t.equal(balance, 0)
        // Clean up
        myDB.dropUser('tim', err => {});
      })
    })
  })
})

test('Can send an error if there is not enough to tip', function (t) {
  t.plan(1);
  new User('tim', (err, tim) => {
    new User('waleed', (err, waleed) => {
      tim.tip('waleed', 10, (err) => {
        t.equal(typeof err, 'string')
        // Clean up
        myDB.dropUser('tim', err => {});
      })
    })
  })
})

test('Can tip another user', function (t) {
  t.plan(2);
  new User('tim', (err, tim) => {
    new User('waleed', (err, waleed) => {
      tim.deposit(10, (err) => {
        tim.tip('waleed', 10, (err) => {
          tim.getBalance((err, timsbalance) => {
            t.equal(timsbalance, 0)
            // Clean up
            myDB.dropUser('tim', err => {});
          })

          waleed.getBalance((err, waleedsbalance) => {
            t.equal(waleedsbalance, 10)
            // Clean up
            myDB.dropUser('waleed', err => {});
          })
        })
      })
    })
  })
})
