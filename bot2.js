const { ethers } = require('ethers')

const itx = new ethers.providers.InfuraProvider(
    'mainnet', // or 'ropsten', 'rinkeby', 'kovan', 'goerli'
    'bd5731437d5b435fa2e493099eb850ee'

)
const signer = new ethers.Wallet('903aaca8f3aa079c338b27337642a8a597d751819f9d2b3014f0443b577c1cdb', itx)

async function getBalance() {
   const response = await itx.send('relay_getBalance', [signer.address])
    console.log(`Your current ITX balance is ${response.balance}`)
}
async function deposit(signer) {
    const tx = await signer.sendTransaction({
        // ITX deposit contract (same address for all public Ethereum networks)
        to: '0x015C7C7A7D65bbdb117C573007219107BD7486f9',
        // Choose how much ether you want to deposit to your ITX gas tank
        value: ethers.utils.parseUnits('0.01', 'ether')
    })
    // Waiting for the transaction to be mined
    await tx.wait()
}



