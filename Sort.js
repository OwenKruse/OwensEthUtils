const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/cb392e14ff1f48151f0afa6a/eth/mainnet")
const seedPhrase ="forget aunt ? trial exit ensure auto banner century face father begin"
//import wordsForPhrase.txt file from wordsForPhrase.txt.txt
const fs = require('fs');
const words = fs.readFileSync('wordsForPhrase.txt').toString().split(" ");



//convert seedPhrase to array
const seedPhraseArray = seedPhrase.split(" ")
const sort = async async => {
  for (let i = 0; i < seedPhraseArray.length; i++) {
    //if seedPhraseArray contains a question mark
    if (seedPhraseArray[i] === "?") {
      let j = i
      console.log(words.length)
      for (let k = 0; k < words.length; k++) {

        seedPhraseArray[j] = words[k]
        const seedPhraseForEthers = seedPhraseArray.join(" ")
        let mnemonic = seedPhraseForEthers
        try {
          let mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic)
          let privateKey = mnemonicWallet.privateKey
          console.log(privateKey)
          let wallet = new ethers.Wallet(privateKey, provider)
          let address = wallet.address
          console.log(address)
          let balance = await provider.getBalance(address);
          console.log(balance)
          console.log(seedPhraseForEthers)
          if (balance > 0) {
            console.log("Your address is: " + address)
            console.log("Your private key is: " + privateKey)
            console.log("Your balance is: " + balance.toString())
            break
          }
        } catch (err) {

        }


      }
    }
  }
}
sort();
