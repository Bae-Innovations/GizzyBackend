const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ethWallet = require('ethereumjs-wallet');
const logger = require('../logger/logger');
const Web3 = require('web3');
const ethUtil = require('ethereumjs-util');

const web3 = new Web3()

let addressData = ethWallet['default'].generate();
const PRIVATEKEY = addressData.getPrivateKeyString();
const ADDRESS = addressData.getAddressString();

chai.should();
chai.use(chaiHttp);
    
// Registering a new user
describe("POST /user/register", () => {
    var nonce;

    before((done) => {
        body = {
            publicAddress: ADDRESS
        };
        chai.request(server)
        .post("/user/register")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            nonce = res.body.nonce;
            logger.debug("the body for the register endpoint in test")
            logger.debug(res.body)

            done();
        })
    })
    it("It should send a public address, get a nonce, sign the nonce and get tokens", (done) => {
        web3.eth.accounts.wallet.add({
            privateKey: PRIVATEKEY,
            address: ADDRESS
        });
        account0 = web3.eth.accounts.wallet['0']
        logger.debug("NONCE is" + nonce)
        signedNonce = account0.sign(nonce, PRIVATEKEY)
        signedNonce = signedNonce.messageHash;

        body = {
            publicAddress: ADDRESS,
            signedNonce: signedNonce
        }
        logger.debug("making second request")
        chai.request(server)
        .post("/user/login")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            logger.debug(res.body);
            
            done();    
            
        })
        
    });
});
