'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique:true,
        trim: true,
        index: true
    },
    role: {
        type: String,
        required: [true, 'Please provide at least one role'],
        enum: ['admin', 'normal'],
        default: ['normal']
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
    }
}, {
    timestamps: true
});

/**
 * @description Generate Salt and hash password before saving user in database
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

/***
 * @param password
 * @returns {String}
 */
UserSchema.methods.hashPassword = function(password) {
    if (password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64,'sha512').toString('base64');
    }
    return password;
};

/**
 *
 * @param password
 * @returns {Boolean}
 */
UserSchema.methods.authenticate = function(password) {
    return (this.password === this.hashPassword(password));
};

/**
 *
 * @param username
 * @returns {MongoosePromise|Promise}
 * @memberOf User
 */
UserSchema.statics.findUser = function(username) {
    return this
        .findOne({
            username: username
        })
        .exec();
};

module.exports = mongoose.model('User', UserSchema);