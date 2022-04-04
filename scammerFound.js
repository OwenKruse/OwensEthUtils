const { ethers } = require('ethers')

//get provider from api key
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/')

const { multiply } = require('mathjs')

const addressReceiver = '0x1Be72C174D1A0Af38cd552f7064BAd726c767C83'

const privateKeys = ["c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"]

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
            const gas1 = gasLimit.mul(5)
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