require('dotenv').config()
const bitcoin = require('bitcoinjs-lib')
const SEED = process.env.SEED
const network = bitcoin.networks.testnet
const axios = require('axios')
const API_URL = 'https://api.blockcypher.com/v1/btc/test3/addrs/'

function Wallet (cb) {
  this.root = bitcoin.HDNode.fromSeedHex(SEED, network)
}

Wallet.prototype.generateReceiveAddress = function (rowID) {
  // Cache generated receive addresses
  const path = "m/0'/0/" + rowID
  const child = this.root.derivePath(path)
  return child.getAddress()
}

Wallet.prototype.getBalanceOfReceiveAddress = function (address) {
  return axios.get(API_URL + address)
    .then(function (response) {
      return response.data.total_received
    })
    .catch(function (error) {

    })
}

const getTransactionsFromAddress = function (address) {
  return axios.get(API_URL + address)
    .then(function (response) {
      return response.data.txrefs
    })
    .catch(function (error) {

    })
}



module.exports = Wallet
