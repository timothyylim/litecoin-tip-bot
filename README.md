# litecoin-tip-bot

A twitter bot for tipping users with litecoin. Inspired by [tippr](https://www.reddit.com/r/tippr/wiki/index).

Starting off with a naïve implementation and working from there.

## Todos:

Local database
- [ ] Database class
  - [ ] 

Wallet and transaction logic:
- [ ] User class
  - [ ] User constructor
  - [x] Generate a unique litecoin address per user and return it
  - [ ] getBalance()
  - [ ] withdraw()

Twitter interface methods:
- [ ] deposit
- [ ] balance
- [ ] withdraw

## Questions

- Make a wallet class? Patch an existing bitcoin js wallet?

## Longer term

- [ ] Generate unique addresses for each transaction

## Resources:
- [bitcoin cash recovery tool](https://github.com/timothyylim/bitgo-bcash-recovery-tool/tree/master/src)
- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
- [blocktrail slack tip bot](https://github.com/blocktrail/slack-tipbot/blob/master/lib/user.js)
