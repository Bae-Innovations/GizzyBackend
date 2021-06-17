const abi = require('./GizzyBase.json')
const Web3 = require('web3');

const amountOfGizzy = function(){
    proxyContractAddress = '0x81F6375AFba49789C37527c3Be87dc1fEA7A8Fb4'

    acc1_priv = '062705884027f5d3ad8ec35fefe9be6ccf5eeacaf299d168d774e462fa1f99c8'
    acc1_addr = '0x146b9142fdFB6C2fF76ceD376961D7C308715F65'
    
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    web3.eth.accounts.wallet.add({
        privateKey: acc1_priv,
        address: acc1_addr
    });
    
    account0 = web3.eth.accounts.wallet['0']
    
    let contract = new web3.eth.Contract(abi.abi, proxyContractAddress);
    
    contract.methods.balanceOf(acc1_addr).call({from: account0.address})
    .then((res) => {
        console.log(res)
        return res
    })
}


module.exports = addPromoGizzy