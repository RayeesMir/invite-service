const User = require('../models/user');
const Token = require('../models/token');
const TokenGenerator = require('./tokengenerator');
const UnknownError = require('../errors').UnknownError;
const DuplicateError = require('../errors').DuplicateError;
const NotFoundError = require('../errors').NotFoundError;
const BadRequestError = require('../errors').BadRequestError;
const tokengenerator = new TokenGenerator();
module.exports = {

    /**
     * @param {Object} user
     * @returns {Promise}
     * @description Create Admin User so that invite service can be tested; not included in functional requirment.
     */
    createAdminUser: (user) => {
        return new Promise((resolve, reject) => {
            const newUser = new User(user);
            newUser.role = "admin";
            newUser.save()
                .then((result) => {
                    const { name, username, role } = result.toObject();
                    resolve({ name, username, role });
                })
                .catch((error) => {
                    if (error.code == 11000) {
                        reject(new DuplicateError("User Already Exists"));
                    } else {
                        reject(new UnknownError(error));
                    }
                });
        });
    },

    /**
     * @param {Number} min
     * @param {Number} max
     * @param {Number} days
     * @returns {Promise}
     * @description Generates Invite token of size between min and max with expiry as current date plus number of days and saves it in database
     */

    generate: (min, max, days) => {
        return new Promise((resolve, reject) => {
            //token size between min and max, defualt is 6 to 12
            const inviteCode = tokengenerator.generate(min, max);

            //add number of days to current date, default is 7 days 
            const expiry = tokengenerator.addDays(new Date(), days || 7);

            const token = {
                token: inviteCode,
                active: true,
                expiry: expiry
            };
            const newToken = new Token(token);
            newToken.save()
                .then((result) => {
                    const { token, active, expiry } = result.toObject();
                    resolve({ token, active, expiry });
                })
                .catch((error) => {
                    if (error.code == 11000) {
                        reject(new DuplicateError("Token Already Exists"));
                    } else {
                        reject(new UnknownError(error));
                    }
                });
        });
    },

    /**
     * 
     * @param {String} token 
     * @returns {Promise}
     * @description Validates Token
     */
    validateToken(token) {
        return new Promise((resolve, reject) => {
            Token.findToken(token)
                .then((foundToken) => {
                    if (!foundToken) {
                        throw new NotFoundError('Token Not Found');
                    } else if (!foundToken.active) {
                        throw new BadRequestError('Invalid Token');
                    }
                    else if (foundToken.expiry < new Date()) {
                        throw new BadRequestError('Token Expired');
                    }
                    resolve(foundToken)
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        })

    },

    /**
     * @description returns all Tokens in Database
     * @returns {Promise}
     */
    findAllToken() {
        return new Promise((resolve, reject) => {
            Token.findAll()
                .then((result) => resolve(result))
                .catch((error) => reject(new UnknownError(error)));
        })
    },

    /**
     * 
     * @param {*} token 
     * @returns {Promise}
     * @description Disable's Token 
     */
    disableToken(token) {
        return new Promise((resolve, reject) => {
            Token.disableToken(token)
                .then((updatedToken) => {
                    if (updatedToken) {
                        resolve(updatedToken);
                    } else {
                        throw new NotFoundError('Token Not Found');
                    }
                })
                .catch((error) => {
                    if (error.statusCode == 404) {
                        reject(error);
                    } else {
                        reject(new UnknownError(error));
                    }
                });
        })

    }
};