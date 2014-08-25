/**
 * Created by Pedro Luz on 23/08/2014.
 */
var luzUtil = require('../../LuzUtil');
var pessoa = require("../Pessoa");
var _ = require('lodash-node')
/**
 * User schema definition based on Mongoose standards.
 */
var userSchema = {
    username: {type: String, required: true, lowercase: true, index: {unique: true}},
    password: {type: String, required: true},
    email: {type: String, required: true, lowercase: true},
    salt: {type: String, default: 'defaultHash', required: true}
};

/**
 * Extending user schema with entity 'pessoa' schema (call it an improved inheritance move).
 */
_.merge(userSchema, pessoa.schema);


var schemaSetup = function (schema){
    /**
     * Static helper method for retrieving an user by it's username.
     * @param username A given username.
     * @param cb A callback function(err, result)
     */
    schema.statics.getByUsername = function (username, cb) {
        this.findOne({username: username}, function (err, user) {
            return cb(err, user);
        });
    };

    /**
     * Middleware for user objects BEFORE saving to the database.
     */
    schema.pre('save', function (next) {
        var user = this;
        console.log('hahahah');
        /**
         * Only hash the password if it has been modified (or is new)
         */
        if (!user.password) return next();

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
}



module.exports =
{
    key: "User",
    schema: userSchema,
    setup: schemaSetup
};