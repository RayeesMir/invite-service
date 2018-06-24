const lib = require('../lib');
const successFormatter = require('../formatters');

module.exports = {

    /**
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     * @description Creates User 
     */
    createUser: (request, response, next) => {
        const { name, username, password } = request.body;
        const user = {
            name,
            username,
            password
        }
        lib.createAdminUser(user)
            .then(successFormatter)
            .then((output) => response.status(200).json(output))
            .catch(next);
    },

    /**
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     * @description Generate Token of size between min and max with days as expiry 
     */
    generateToken: (request, response, next) => {
        //Generate Token of size between min and max with numberof days as expiry
        //generate(min, max, days)
        const [min, max, days] = [6, 12, 7];
        lib.generate(min, max, days)
            .then(successFormatter)
            .then((output) => response.status(200).json(output))
            .catch(next);
    },

    /**
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     * @returns {Object} 
     * @description returns all tokens 
     */
    getTokens: (request, response, next) => {
        lib.findAllToken()
            .then(successFormatter)
            .then((output) => response.status(200).json(output))
            .catch(next);
    },

    /**
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     * @description Disables token
     */
    disableToken: (request, response, next) => {
        const token = request.params.token;
        lib.disableToken(token)
            .then(successFormatter)
            .then((output) => response.status(200).json(output))
            .catch(next);
    },

    /**
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     * @description login method
     */
    login: (request, response, next) => {
        const token = request.body.token;
        lib.disableToken(token)
            .then(() => successFormatter({ "message": "Login Successful, Welcome to Catalyst Experience App" }))
            .then((output) => response.status(200).json(output))
            .catch(next);
    }

};
