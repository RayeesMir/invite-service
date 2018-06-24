const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-as-promised'));
chai.use(require('chai-http'));
const app = require('../src/index');
const lib = require('../src/lib');

const Token = require('../src/models/token');
const User = require('../src/models/user');


before('remove tokens', () => {
    return Token.remove();
});

before('remove users', () => {
    return User.remove();
});

before('create User', () => {
    it('should return token', () => {
        return chai.request(app)
            .post("/api/admin/user")
            .send({name:"Rayees Ahmad Mir",username:"mirrayees",password:"Rayees"})
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status).to.have.property('code');
                expect(response.body.status).to.have.property('message');
                expect(response.body.response).to.have.property('username');
                expect(response.body.response).to.have.property('name');
                expect(response.body.response).to.have.property('role');
                expect(response).to.have.status(200);
                expect(response.body.status.code).to.be.equal(200);
                expect(response.body.status.message).to.be.equal("Success");
            })
            .catch((error) => {
                throw error;
            });
    });
});


describe('POST /api/admin/token', () => {

    it('should return token', () => {
        return chai.request(app)
            .post("/api/admin/token")
            .auth('mirrayees', 'Rayees')
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status).to.have.property('code');
                expect(response.body.status).to.have.property('message');
                expect(response.body.response).to.have.property('token');
                expect(response.body.response).to.have.property('active');
                expect(response.body.response).to.have.property('expiry');
                expect(response).to.have.status(200);
                expect(response.body.status.code).to.be.equal(200);
                expect(response.body.status.message).to.be.equal("Success");
            })
            .catch((error) => {
                throw error;
            });
    });

    it('should return 401 for invalid Authentication', () => {
        return chai.request(app)
            .post("/api/admin/token")
            .auth('mirraye', 'Raye')
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status.code).to.be.equal(401);
                expect(response).to.have.status(401);
                expect(response.body.status.message).to.be.equal("Invalid Credientials");
            })
            .catch((error) => {
                throw error;
            });
    });

});

describe('GET /api/admin/token', () => {
    it('should return Array of Tokens', () => {
        return chai.request(app)
            .get("/api/admin/token")
            .auth('mirrayees', 'Rayees')
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status.code).to.be.equal(200);
                expect(response.body.response).to.be.an('array');
            })
            .catch((error) => {
                throw error;
            });
    });
})


describe('POST /api/login', () => {

    it('should return login Successful Message', () => {
        let token;
        return chai.request(app)
            .post("/api/admin/token")
            .auth('mirrayees', 'Rayees')
            .then((response) => {
                token = response.body.response.token;
                return chai.request(app)
                    .post("/api/login")
                    .send({ token: token })
                    .auth('mirrayees', 'Rayees')
            })
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status).to.have.property('code');
                expect(response.body.status).to.have.property('message');
                expect(response).to.have.status(200);
                expect(response.body.status.code).to.be.equal(200);
                expect(response.body.status.message).to.be.equal("Success");
            })
            .catch((error) => {
                throw error;
            });
    });

    it('should return token not found error', () => {
        return chai.request(app)
            .post("/api/login")
            .send({ token: "abc" })
            .auth('mirrayees', 'Rayees')
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status).to.have.property('code');
                expect(response.body.status).to.have.property('message');
                expect(response).to.have.status(404);
                expect(response.body.status.code).to.be.equal(404);
                expect(response.body.status.message).to.be.equal("Token Not Found");
            })
            .catch((error) => {
                throw error;
            });
    });
})

describe('GET /admin/token/disable/:token', () => {
    it('should return token not found error', () => {
        return chai.request(app)
            .get("/api/admin/token/disable/abc")
            .auth('mirrayees', 'Rayees')
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status).to.have.property('code');
                expect(response.body.status).to.have.property('message');
                expect(response).to.have.status(404);
                expect(response.body.status.code).to.be.equal(404);
                expect(response.body.status.message).to.be.equal("Token Not Found");
            })
            .catch((error) => {
                throw error;
            });
    });

    it('should return success after Disabling token', () => {
        let token;
        return chai.request(app)
            .post("/api/admin/token")
            .auth('mirrayees', 'Rayees')
            .then((response) => {
                token = response.body.response.token;
                return chai.request(app)
                    .get("/api/admin/token/disable/" + token)
                    .auth('mirrayees', 'Rayees')
            })
            .then((response) => {
                expect(response.body).to.have.property('status');
                expect(response.body).to.have.property('response');
                expect(response.body.status).to.have.property('code');
                expect(response.body.status).to.have.property('message');
                expect(response).to.have.status(200);
                expect(response.body.status.code).to.be.equal(200);
                expect(response.body.status.message).to.be.equal("Success");
                expect(response.body.response.token).to.be.equal(token);
                expect(response.body.response.active).to.be.equal(false);
            })
            .catch((error) => {
                throw error;
            });
    });
})

