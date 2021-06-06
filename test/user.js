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

web3.eth.accounts.wallet.add({
    privateKey: PRIVATEKEY,
    address: ADDRESS
});

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
        .post("/user/check")
        .send(body)
        .end((err, res) => {
            res.should.have.status(400);
            nonce = res.body.nonce;
            done();
        })
    })

    it("It should send a public address, username and email and account should be created on the database", (done) => {

        chai.request(server)
        .post("/user/register")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            logger.debug(res.body);
            done();    
        })
    })

    //     account0 = web3.eth.accounts.wallet['0']
    //     logger.debug("NONCE is" + nonce)
    //     signedNonce = account0.sign(nonce, PRIVATEKEY)
    //     signedNonce = signedNonce.messageHash;

    //     body = {
    //         publicAddress: ADDRESS,
    //         signedNonce: signedNonce
    //     }
    //     logger.debug("making second request")
    //     chai.request(server)
    //     .post("/user/login")
    //     .send(body)
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         logger.debug(res.body);
            
    //         done();    
            
    //     })
        
    // });

    // after((done) => {
    //     body = {
    //         publicAddress: ADDRESS
    //     };
    //     chai.request(server)
    //     .post("/user/check")
    //     .send(body)
    //     .end((err, res) => {
    //         res.should.have.status(400);
    //         nonce = res.body.nonce;

    //         done();
    //     })
    // })
})

// Registering a new user
describe("POST /user/register", () => {
    var nonce;

    before((done) => {
        body = {
            publicAddress: ADDRESS,
            username: "imtiaz",
            email: "hello@imti.tech"
        };
        chai.request(server)
        .post("/user/check")
        .send(body)
        .end((err, res) => {
            res.should.have.status(400);
            //nonce = res.body.nonce;
            //logger.debug("NONCE IS " + nonce);
            
            chai.request(server)
            .post("/user/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                logger.debug(res.body);
                done();    
            })
        })
    })

    it("It should send a publicAddress and get a nonce back", (done) => {
        // account0 = web3.eth.accounts.wallet['0']
        // logger.debug("NONCE is" + nonce)
        // signedNonce = account0.sign(nonce, PRIVATEKEY)
        // // signedNonce = signedNonce.messageHash;

        // body = {
        //     publicAddress: ADDRESS,
        //     signedNonce: signedNonce
        // }

        // logger.debug("making second request")
        // chai.request(server)
        // .post("/user/login")
        // .send(body)
        // .end((err, res) => {
        //     res.should.have.status(200);
        //     logger.debug(res.body);
            
        //     done();    
            
        // })

        body = {
            publicAddress: ADDRESS
        }

        logger.debug("making second request")
        chai.request(server)
        .post("/user/login")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            logger.debug(res.body);
            nonce = res.body.message
            logger.debug(nonce);
            done();    
            
        })
        
    })


        
    // });

    // after((done) => {
    //     body = {
    //         publicAddress: ADDRESS
    //     };
    //     chai.request(server)
    //     .post("/user/check")
    //     .send(body)
    //     .end((err, res) => {
    //         res.should.have.status(400);
    //         nonce = res.body.nonce;

    //         done();
    //     })
    // })
})

// Registering a new user
describe("POST /user/register", () => {
    var nonce;

    before((done) => {
        body = {
            publicAddress: ADDRESS,
            username: "imtiaz",
            email: "hello@imti.tech"
        };
        chai.request(server)
        .post("/user/check")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            //nonce = res.body.nonce;
            //logger.debug("NONCE IS " + nonce);
            
            chai.request(server)
            .post("/user/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                logger.debug(res.body);
                
                body = {
                    publicAddress: ADDRESS
                }
        
                logger.debug("making second request")
                chai.request(server)
                .post("/user/login")
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    logger.debug(res.body);
                    nonce = res.body.message
                    logger.debug(nonce);
                    done();    
                    
                })
            })
        })


    })

    it("It should send a publicAddress and get a nonce back", (done) => {
        account0 = web3.eth.accounts.wallet['0']
        logger.debug("NONCE is" + nonce)
        signedNonce = account0.sign(nonce, PRIVATEKEY)
        //signedNonce = signedNonce.messageHash;
        logger.debug("THE SIGNED NONCE IS " + signedNonce.signature)
        logger.debug(Object.keys(signedNonce))

        body = {
            publicAddress: ADDRESS,
            signedNonce: signedNonce.signature
        }

        logger.debug("making second request")
        chai.request(server)
        .post("/user/authenticate")
        .send(body)
        .end((err, res) => {
            res.should.have.status(200);
            logger.debug(res.body);
            logger.debug("got a token as response")
            logger.debug(Object.keys(res.body))
            logger.debug(res.body.bearerToken)
            done();    
            
        })        
    })
})