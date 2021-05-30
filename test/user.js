const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ethWallet = require('ethereumjs-wallet');
const logger = require('../logger/logger');
const web3 = require('web3');
const ethUtil = require('ethereumjs-util');

let addressData = ethWallet['default'].generate();
const PRIVATEKEY = addressData.getPrivateKeyString();
const ADDRESS = addressData.getAddressString();

logger.debug(PRIVATEKEY);
logger.debug(ADDRESS);

chai.should();
chai.use(chaiHttp);
    
// Registering a new user
describe("POST /user/register & POST /user/login", () => {
    it("It should send a public address, get a nonce, sign the nonce and get tokens", (done) => {
        body = {
            publicAddress: ADDRESS
        };
        chai.request(server)
        .post("/user/register")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            let nonce = res.body.nonce;

        let eth = new web3().eth
        logger.debug(Object.keys(eth));
        logger.debug("RIGHT BEFORE SIGNING PRIVATE KEY")
        signedNonce = eth.sign(nonce, ADDRESS);
        logger.debug("RIGHT AFTER SIGNING PRIVATE")
        signedNonce = signedNonce.messageHash;

        body = {
            publicAddress: ADDRESS,
            signedNonce: sig
        }
        chai.request(server)
        .post("/user/login")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            logger.debug(res.body);
        })

        done();
        });
    });
});

// Test the login route
describe("POST /user/register", () => {
    it("It should create a user with given public key and return a nonce", (done) => {
        //logger.debug(nonce);
        let body = {
            publicAddress: ADDRESS
        };
        chai.request(server)
        .post("/user/register")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            let nonce = res.body.nonce;
            logger.debug(nonce);
        done();
        });
    });
});
