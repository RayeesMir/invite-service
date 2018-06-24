'use strict';
const mongoose = require('mongoose');
const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Token is required'],
        minlength: 6,
        trim: true,
        index: true
    },
    active: {
        type: Boolean,
    },
    expiry: {
        type: Date
    }
}, { timestamps: true });

/**
 *
 * @param token
 * @returns {MongoosePromise|Promise}
 * @memberOf Token
 */
TokenSchema.statics.findToken = function (token) {
    return this
        .findOne({
            token: token
        })
        .select('token active expiry')
        .lean()
        .exec();
};

/**
 *
 * @param token
 * @returns {MongoosePromise|Promise}
 * @description Find All Tokens
 * @memberOf Token
 */
TokenSchema.statics.findAll = function (token) {
    return this
        .find()
        .select('token active expiry')
        .lean()
        .exec();
};

/**
 *
 * @param token
 * @returns {MongoosePromise|Promise}
 * @description Disable Token
 * @memberOf Token
 */
TokenSchema.statics.disableToken = function (token) {
    return this
        .findOneAndUpdate({ token: token }, { active: false }, { new: true })
        .select('token active expiry')
        .lean()
        .exec();
};


module.exports = mongoose.model('Token', TokenSchema);