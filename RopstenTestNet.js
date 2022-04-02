const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/cb392e14ff1f48151f0afa6a/eth/ropsten")

const { multiply } = require('mathjs')

const addressReceiver = '0x1Be72C174D1A0Af38cd552f7064BAd726c767C83'

const privateKeys = ["158759e7ef1cc3ab3a51ddf97fd8e15e064ec4528895ff661a784ad0f4d0c95e"]

const bot = async =>{
    provider.on('block', async () => {
        console.log('Listening to new block, waiting ;)');
        let totalCostInIntWithFee;
        for (let i = 0; i < privateKeys.length; i++) {

            const _target = new ethers.Wallet(privateKeys[i]);
            const target = _target.connect(provider);
            const balance = await provider.getBalance(target.address);

            const gasPrice = await provider.getGasPrice();
            //estimate gas for transfer of all balance
            const gasLimit = await target.estimateGas({
                to: addressReceiver,
                value: balance
            });
            console.log(gasLimit);
            const gas1 = gasLimit.mul(4)
            const gas2 = gas1.div(3)
            const totalGasCost = gas2.mul(gasPrice);
            console.log(totalGasCost);
            if (balance.sub(totalGasCost) > 0){
                console.log("New Account with Eth!");
                const amount = balance.sub(totalGasCost);

                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: amount


                    });
                    console.log(`Success! transferred -->${ethers.utils.formatEther(balance)}`);
                } catch(e){
                    console.log(`error: ${e}`);
                }
            }

        }
    })
}
bot();
