const { ethers } = require('ethers')

const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/cb392e14ff1f48151f0afa6a/eth/mainnet")
const fs = require('fs');
const words = fs.readFileSync('Phrases.txt').toString().split("\n");
console.log(words);
const find = async async => {




    let k = [0];
    let l = [];
    for (i = 0; i < words.length; i++) {

        const phrase = words[i];
        try {

            const address = ethers.Wallet.fromMnemonic(phrase).address;
            const balance = await provider.getBalance(address);
            //convert balance to eth
            const balanceInEth = ethers.utils.formatEther(balance.toString());

            if (balanceInEth > 0) {
                console.log(phrase, address);
                console.log(balanceInEth);
                k[0] = k[0] + Number(balanceInEth);
                console.log(k[0]);

                //convert balanceInEth to a number
                const balanceInNumber = parseFloat(balanceInEth);

            }
        } catch (error) {
            console.log("invalid");
        }

    }

}
find();


