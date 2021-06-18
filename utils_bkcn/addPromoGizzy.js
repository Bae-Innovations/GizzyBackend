const abi = require('./GizzyBase.json')
const Web3 = require('web3');
//const addIPFSimage = require('../utils/addIPFSimage');
//const addIPFSjson = require('../utils/addIPFSjson');
const addGizzy = require('../utils/addGizzy')
const logger = require('../logger/logger')


const addPromoGizzy = async (owner_addr) => {
    //image_hash = await addIPFSimage('../uploads/assets/promo.png')
    //console.log(image_hash)

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

    meta_hash = 'https://ipfs.io/ipfs/QmdyCnkcEyWzEkiqi6sHbdMxH9B3c6qhRrpyKBLtE1QLj6'
    console.log(meta_hash)

    logger.debug("before making web3 call")
    contract.methods.createPromoGizzy(owner_addr,false,meta_hash).send({from: account0.address, gas:'2000000'})
    .on('receipt', async function(receipt){
        console.log(receipt)
        let gizzyId = receipt.events.Birth.returnValues.gizzyId
        newGizzy = await addGizzy(
            gizzyId=gizzyId,
            gizzyName="GIZZY#"+gizzyId.toString(),
            ownedBy=owner_addr,
            gizzyImage='https://ipfs.io/ipfs/QmQkQBnewjrFox48QEgKJHW6DLtmk4XiZ2Hg5FrtsY4VAw',
            gizzyStatus="unbreedable",
            generation=0,
            breedable=false,
            cooldownIndex=0,
            bio="I am one of the few rare promo gizzies!", 
            hatchedBy=acc1_addr, 
            createdAt=new Date().getDate(),
            characteristics=[
                {name:'promo', type:true}
            ],
            lycano="Basic", 
            attributesStrength=3, 
            attributesConstituion=3,
            attributesRestoration=3,
            attributesCharisma=3,
            sireId=0,
            matronId=0,
            childrenList=[],
            genes="null"
        )
        logger.info(receipt)
        return newGizzy
    })
    .on('error', async function(error){
        logger.error(error)
    })
}

module.exports = addPromoGizzy