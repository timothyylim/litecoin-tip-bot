const bitcoin = require('bitcoinjs-lib')
const bigi = require('bigi')
const secret = process.env.SUPERSECRET

const generateKeypair = (userID, secret) => {
  // TODO: Salt userID with scecret instead of just appending
  const hash = bitcoin.crypto.sha256(Buffer.from(userID + secret))
  const d = bigi.fromBuffer(hash)

  return new bitcoin.ECPair(d, null, {
    compressed: false,
    network: bitcoin.networks.litecoin
  })
}
