const { ethers } = require('ethers')

const provider = new ethers.providers.InfuraProvider('ropsten', ['ca5ec270a1334c4b9aaabcb322103a59'])


const address = ethers.Wallet.fromMnemonic('mistake ghost umbrella hybrid nest reduce wife curtain answer spare civil post').address
console.log(address)

const addressReceiver = '0x1Be72C174D1A0Af38cd552f7064BAd726c767C83'

const privateKeys = ["158759e7ef1cc3ab3a51ddf97fd8e15e064ec4528895ff661a784ad0f4d0c95e"]

const bot = async =>{



    provider.on('block', async () => {
        try {


            console.log('Listening to new block, waiting ;)');

            for (let i = 0; i < privateKeys.length; i++) {

                const _target = new ethers.Wallet(privateKeys[i]);
                const target = _target.connect(provider);
                const balance = await provider.getBalance(target.address);
                console.log(balance.toString())

                const gasPrice = await provider.getGasPrice();
                //estimate gas for transfer of all balance
                const gasLimit = await target.estimateGas({
                    to: addressReceiver,
                    value: balance
                });
                console.log(gasLimit.toString());
                const gas2 = gasLimit.mul(2)
                console.log(gas2.toString());
                const totalGasCost = gas2.mul(gasPrice);
                console.log(totalGasCost.toString());
                if (balance.sub(totalGasCost) > 0) {
                    console.log("New Account with Eth!");
                    const amount = balance.sub(totalGasCost);

                    try {
                        await target.sendTransaction({
                            to: addressReceiver,
                            value: amount


                        });
                        console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                    } catch (e) {
                        console.log(`error: ${e}`);
                    }
                }

            }
        }
        catch (err){
            console.log(err)
        }
    })
}

bot();
