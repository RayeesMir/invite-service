const lib = require('../lib');
const User = require('../models/user');
const UnAuthorizedError = require('../errors').UnAuthorizedError;
const errorHandler = require('../errors').errorHandler;
const ForbiddenError = require('../errors').ForbiddenError;
const BadRequestError = require('../errors').BadRequestError;

module.exports = {

    validateToken: (request, response, next) => {
        const token = request.body.token;
        if (!token) {
            return errorHandler(new BadRequestError("Missing token please retry"), request, response, next)
        }
        lib.validateToken(token)
            .then(() => next())
            .catch((error) => errorHandler(error, request, response, next));
    },

    validatePermission: (request, response, next) => {

        const credientials = request.headers.authorization;
        if (!request.headers.authorization) {
            return errorHandler(new UnAuthorizedError("Missing Credientials"), request, response, next)
        }
        const [username, password] = new Buffer(credientials.split(" ")[1], 'base64').toString().split(":");

        User.findUser(username)
            .then((user) => {
                if (!user) {
                    throw new UnAuthorizedError("Invalid Credientials");
                }
                if (!user.authenticate(password)) {
                    throw new UnAuthorizedError("Invalid Credientials");
                }
                if (user.role != 'admin') {
                    throw new ForbiddenError('Not Authorized to perform this operation');
                }
                next();
            })
            .catch((error) => errorHandler(error, request, response, next));

    }

}