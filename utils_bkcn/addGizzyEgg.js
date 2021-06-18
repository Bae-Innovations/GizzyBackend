const abi = require('./GizzyBase.json')
const Web3 = require('web3');
// const addIPFSimage = require('../utils/addIPFSimage');
// const addIPFSjson = require('../utils/addIPFSjson');
const addGizzy = require('../utils/addGizzy')
const logger = require('../logger/logger')
const EggSchema = require('../models/Egg')

const addGizzyEgg = async (owner_addr) => {
    proxyContractAddress = process.env.PROXY_CONTRACT_ADDRESS

    acc1_priv = process.env.PRIVATE_KEY
    acc1_addr = process.env.PUBLIC_ADDRESS

    console.log(acc1_priv)
    console.log(acc1_addr)

    const web3 = new Web3(process.env.BLOCKCHAIN_HTTP_URL);
    web3.eth.accounts.wallet.add({
        privateKey: acc1_priv,
        address: acc1_addr
    });

    account0 = web3.eth.accounts.wallet['0']

    let contract = new web3.eth.Contract(abi.abi, proxyContractAddress);

    meta_hash = 'https://ipfs.io/ipfs/QmRXozDnevn2VrDMPGzspBfDNM6En7bJgkqxi4QdUELMdj'

    logger.debug("before making web3 call")
    contract.methods.createPromoGizzy(owner_addr,false,meta_hash).send({from: account0.address, gas:'2000000'})
    .on('receipt', async function(receipt){
        let gizzyId = receipt.events.Birth.returnValues.gizzyId

        new EggSchema({gizzyId:gizzyId,ownedBy:owner_addr}).save()
        .then((result) => {
            logger.info(result)
            logger.info(receipt)
            return result
        })
        .catch((err) => logger.error(err))
        
    })
}

module.exports = addGizzyEgg