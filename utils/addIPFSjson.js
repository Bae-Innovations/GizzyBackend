const { create, globSource } = require('ipfs-http-client');

const client = create('https://ipfs.infura.io:5001');

const addIPFSjson = async (meta) => {
  const doc = JSON.stringify({ meta });
  const cid = await client.add(doc);
  return cid.path;
};

data = {
  name:"Promo Gizzy",
  description:"A very special and rare unbreedable gizzy. This will only be given to the 1000 early adopters and never be minted again.",
  image:"https://ipfs.io/ipfs/QmQkQBnewjrFox48QEgKJHW6DLtmk4XiZ2Hg5FrtsY4VAw",
  attributes: [
    {
      trait_type: "Strength", 
      value: "3"
    }, 
    {
      trait_type: "Constituion", 
      value: "3"
    },
    {
      trait_type: "Restoration", 
      value: "3"
    },
    {
      trait_type: "Charisma", 
      value: "3"
    },
    {
      trait_type: "Lycano", 
      value: "Normal"
    },
  ]
}

addIPFSjson(data)
.then((response) => console.log(response))

module.exports = addIPFSjson;
