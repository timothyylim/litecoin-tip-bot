const test = require('tape-async');
// Change the db before the user is loaded
process.env.DATABASE = './database/test_database'

const User = require('../user')
const Database = require('../database')
const myDB = new Database()

test('Can initialize itself to the database', function (t) {
    t.plan(2);
    const tim = new User('tim')
    myDB.getUser('tim', (err, rows) => {
      t.equal(rows.user_id, 'tim');
      t.equal(rows.balance, 0);
    })
});

test('Can get its own balance', function (t) {})

test('Can tip another user', function (t) {})
