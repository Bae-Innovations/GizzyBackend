const { create, globSource } = require('ipfs-http-client');
const client = create('https://ipfs.infura.io:5001')

const addIPFSjson = async(meta) => {

    const doc = JSON.stringify({meta})
    const cid = await client.add(doc)
    return cid.path
}

addIPFSjson({name:'imtiaz'})
.then((res) => console.log(res))
 
module.exports = addIPFSjson