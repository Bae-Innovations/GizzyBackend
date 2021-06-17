const abi = require('./GizzyBase.json')
const Web3 = require('web3');
// const addIPFSimage = require('../utils/addIPFSimage');
// const addIPFSjson = require('../utils/addIPFSjson');
const addGizzy = require('../utils/addGizzy')
const logger = require('../logger/logger')
const EggSchema = require('../models/Egg')

const addGizzyEgg = async (owner_addr) => {
    proxyContractAddress = '0x81F6375AFba49789C37527c3Be87dc1fEA7A8Fb4'

    acc1_priv = '062705884027f5d3ad8ec35fefe9be6ccf5eeacaf299d168d774e462fa1f99c8'
    acc1_addr = '0x146b9142fdFB6C2fF76ceD376961D7C308715F65'

    console.log(acc1_priv)
    console.log(acc1_addr)

    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
    web3.eth.accounts.wallet.add({
        privateKey: acc1_priv,
        address: acc1_addr
    });

    account0 = web3.eth.accounts.wallet['0']

    let contract = new web3.eth.Contract(abi.abi, proxyContractAddress);
    //image_hash = await addIPFSimage('../uploads/assets/promo.png')
    //console.log(image_hash)
    // image_hash = 'QmYdVS7vwQfisyZbuXUmVYiaFmrPZNQCJzyYo8GWFQukop'
    // meta = {
    //     image: image_hash,
    //     breedable:false,
    //     characteristics:[
    //         {name:'egg', type:true}
    //     ]
    // }
    // logger.debug("before calling ipfs for meta")
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