const bitcoin = require('bitcoinjs-lib')
const bigi = require('bigi')
const secret = process.env.SUPERSECRET
const axios = require('axios')
const API_URL = 'https://api.blockcypher.com/v1/ltc/main/addrs/'

function User (userID) {
  this.address = generateKeypair(userID, secret).getAddress()
}

User.prototype.getAddress = function (userID) {
  return this.address
}

User.prototype.getBalance = function () {
  const self = this

  return axios.get(API_URL + self.address)
    .then(function (response) {
      return response.data.balance
    })
    .catch(function (error) {
      return error
    })
}

User.prototype.withdraw = function () {}

const generateKeypair = (userID, secret) => {
  // TODO: Salt userID with scecret instead of just appending
  const hash = bitcoin.crypto.sha256(Buffer.from(userID + secret))
  const d = bigi.fromBuffer(hash)

  return new bitcoin.ECPair(d, null, {
    compressed: false,
    network: bitcoin.networks.litecoin
  })
}

module.exports = User
