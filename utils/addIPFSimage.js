const { create, globSource } = require('ipfs-http-client');

const client = create('https://ipfs.infura.io:5001');

const addIPFSimage = async (path) => {
  const { cid } = await client.add(globSource(path));
  return cid.toString();
};

addIPFSimage()
.then((result) => console.log(result))
.catch((err) => console.log(err))

module.exports = addIPFSimage;
