const abi = require('./GizzyBase.json')
const Web3 = require('web3');
const logger = require('../logger/logger');

const amountOfGizzy = async function (publicAddress){
    proxyContractAddress = process.env.PROXY_CONTRACT_ADDRESS

    acc1_priv = process.env.PRIVATE_KEY
    acc1_addr = process.env.PUBLIC_ADDRESS
    
    const web3 = new Web3(process.env.BLOCKCHAIN_HTTP_URL);
    web3.eth.accounts.wallet.add({
        privateKey: acc1_priv,
        address: acc1_addr
    });
    
    account0 = web3.eth.accounts.wallet['0']
    
    let contract = new web3.eth.Contract(abi.abi, proxyContractAddress);
    
    try {
        result = await contract.methods.balanceOf(publicAddress).call({from: account0.address})
        logger.info(result)
        return result
    } catch(error) {
        logger.error(error)
    }
    
}

module.exports = amountOfGizzy