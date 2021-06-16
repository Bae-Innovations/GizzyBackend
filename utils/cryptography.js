const ethUtil = require('ethereumjs-util');

async function cryptographicCheck(_publicAddress, _nonce, _signedNonce) {
  const publicAddress = _publicAddress;
  const msg = _nonce;
  const signature = _signedNonce;

  const msgBuffer = Buffer.from(msg, 'utf-8');
  console.log(msgBuffer);
  const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
  console.log(msgHash);
  const signatureBuffer = ethUtil.toBuffer(signature);
  const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
  const publicKey = ethUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s,
  );
  const addressBuffer = ethUtil.publicToAddress(publicKey);
  const address = ethUtil.bufferToHex(addressBuffer);

  // The signature verification is successful if the address found with
  // ecrecover matches the initial publicAddress
  if (address.toLowerCase() === publicAddress.toLowerCase()) {
    return true;
  }
  return false;
}

module.exports = cryptographicCheck;
