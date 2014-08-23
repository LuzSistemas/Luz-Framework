/**
 * Created by Pedro Luz on 23/08/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * User schema definition
 * @type {Schema}
 */
var usuarioSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    salt: {type: String}
});

/**
 * Validates a user given a password.
 * @param user The user to be validated.
 * @param pwd Any given password to be validated.
 * @param cb Callback function(err, result).
 */
function validatePassword(user, pwd, cb) {
    var pass = require('pwd');
    pass.hash(pwd, user.salt, function (err, hash) {
        if (err) {
            cb(err);
        }
        cb(null, user.password == hash ? user : false);
    });
}

/**
 * Instance method version of the validatePassword method
 * @param pwd Given password.
 * @param cb Callback function(err, result).
 */
usuarioSchema.methods.validatePassword = function (pwd, cb) {
    validatePassword(this, pwd, cb)
};

/**
 * Static helper method for user login.
 * @param username A given username.
 * @param pwd A given password.
 * @param cb A callback function(err, result)
 */
usuarioSchema.statics.login = function (username, pwd, cb) {
    this.find({username: username}, function (err, user) {
        if (err) {
            cb(err, null);
        }
        validatePassword(user, pwd, cb);
    });
};

/**
 * Middleware for user objects BEFORE saving to the database.
 */
usuarioSchema.pre('save', function (next) {
    var user = this;
    console.log('hahahah');
    debugger;
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