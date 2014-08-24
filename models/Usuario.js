/**
 * Created by Pedro Luz on 23/08/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var luzUtil = require('../LuzUtil');
/**
 * User schema definition
 * @type {Schema}
 */
var usuarioSchema = new Schema({
    username: {type: String, required: true, lowercase: true, index: {unique: true}},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true},
    salt: {type: String, default: 'defaultHash', required: true}
});

/**
 * Static helper method for retrieving an user by it's username.
 * @param username A given username.
 * @param cb A callback function(err, result)
 */
usuarioSchema.statics.getByUsername = function (username, cb) {
    this.findOne({username: username}, function (err, user) {
        return cb(err, user);
    });
};

/**
 * Middleware for user objects BEFORE saving to the database.
 */
usuarioSchema.pre('save', function (next) {
    var user = this;
    console.log('hahahah');
    /**
     * Only hash the password if it has been modified (or is new)
     */
    if (!user.isModified('password')) return next();

    /**
     * Generate salt, update user object properties and move on
     */
    var pass = require('pwd');
    pass.hash(user.password, function (err, salt, hash) {
        if (err) return next(err);
        user.salt = salt;
        user.password = hash;
        next();
    });
});

var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;