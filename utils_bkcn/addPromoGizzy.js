const abi = require('./GizzyBase.json')
const Web3 = require('web3');

proxyContractAddress = '0xC984F3C99816af6F5E2A55E815355e013b741F3e'

acc1_priv = '062705884027f5d3ad8ec35fefe9be6ccf5eeacaf299d168d774e462fa1f99c8'
acc1_addr = '0x146b9142fdFB6C2fF76ceD376961D7C308715F65'

const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
web3.eth.accounts.wallet.add({
    privateKey: acc1_priv,
    address: acc1_addr
});

account0 = web3.eth.accounts.wallet['0']

let contract = new web3.eth.Contract(abi.abi, proxyContractAddress);

// send the image to ipfs
// use image hash to create the meta data and send to ipfs
// use the ipfs url to make a web3 call to create a promo gizzy for the specified address

const addPromoGizzy = async (owner_addr) => {
    image_hash = addIPFSimage('../uploads/assets/promo.png')
    
    contract.methods.createPromoGizzy(owner_addr,false,"none").send({from: account0.address, gas:'2000000'})
    .on('receipt', function(receipt){
        console.log(receipt)
    })
}