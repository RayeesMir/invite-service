'use strict';

class BaseError extends Error {

    /**
     * 
     * @param {*} statusCode 
     * @param {*} errorCode 
     * @param {*} message 
     * @param {*} opts 
     * @memberof BaseError
     */
    constructor(statusCode, errorCode, message, opts) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.opts = opts;
        Error.captureStackTrace(this, BaseError);
    }

    /**
     * This method is used to create Error Format 
     * 
     * @returns 
     * @memberof BaseError
     */

    render() {
        return {
            status: {
                code: this.statusCode,
                message: this.message
            },
            response: {
                code: this.errorCode,
                opts: this.opts
            }
        };
    }
}

/**
 * Creates Not Found Error to be sent to user
 * @class NotFoundError
 * @extends {BaseError}
 */

class NotFoundError extends BaseError {

    /**
     * 
     * @param {*} message 
     * @memberof NotFoundError
     */
    constructor(message) {
        super(404, 'NotFound', message);
    }
}

/**
 * Creates Forbidden Error to be sent to user
 * @class Forbidden
 * @extends {BaseError}
 */

class ForbiddenError extends BaseError {

    /**
     * 
     * @param {*} message 
     * @memberof ForbiddenError
     */
    constructor(message) {
        super(403, 'Forbidden', message);
    }
}

/**
 * @class DuplicateError
 * @extends {BaseError}
 */
class DuplicateError extends BaseError {

    /**
     * 
     * @param {*} message 
     * @memberof DuplicateError
     */
    constructor(message) {
        super(409, 'Already Exists', message);
    }
}


/**
 * Creates BadRequest Error to be sent to user
 * 
 * @class BadRequestError
 * @extends {BaseError}
 */

class BadRequestError extends BaseError {

    /**
     * 
     * @param {*} message 
     * @memberof BadRequestError
     */
    constructor(message) {
        super(400, 'BadRequest', message);
    }
}

/**
 * Creates UnAuthorizedError Error to be sent to user
 * 
 * @class UnAuthorizedError
 * @extends {BaseError}
 */

class UnAuthorizedError extends BaseError {

    /**
     * 
     * @param {*} message 
     * @memberof UnAuthorizedError
     */
    constructor(message) {
        super(401, 'unauthorized', message);
    }
}


/**
 * @class UnknownError
 * @extends {BaseError}
 */

class UnknownError extends BaseError {

    /**
     * 
     * @param {*} error 
     * @param {*} opts 
     * @memberof UnknownError
     */
    constructor(error, opts) {
        super(500, 'Unknown', error.toString(), opts);
        this.innerError = error;
    }
}
/**
 * For Internal Server Error
 * @class InvalidState
 * @extends {BaseError}
 */
class InvalidState extends BaseError {

    constructor(error, opts) {
        super(500, 'InvalidState', error.toString(), opts);
        this.innerError = error;
    }
}

/**
 * This method replies to user with exact error 
 * 
 * @param {Object} err 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 * @returns JSON TO USER
 */
const errorHandler = (err, req, res, next) => {
    let error = err;
    const opts = getOpts(req);

    if (err instanceof BaseError) {
        error.opts = Object.assign(opts, error.opts);
    } else {
        error = new UnknownError(err, opts);
        console.error(error);
    }
    return res.status(error.statusCode).send(error.render());
};


const getOpts = (req) => {
    return {
        payload: JSON.stringify({
            query: req.query,
            body: req.body,
            params: req.params
        }),
        headers: JSON.stringify(req.headers),
        url: req.originalUrl || null
    };
};

module.exports = {
    NotFoundError: NotFoundError,
    BadRequestError: BadRequestError,
    UnknownError: UnknownError,
    DuplicateError: DuplicateError,
    InvalidState: InvalidState,
    UnAuthorizedError:UnAuthorizedError,
    ForbiddenError:ForbiddenError,
    errorHandler: errorHandler
};