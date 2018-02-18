const test = require('tape-async');
// Change the db before the user is loaded
process.env.DATABASE = './database/test_database'

const User = require('../user')
const Database = require('../database')
const myDB = new Database()
