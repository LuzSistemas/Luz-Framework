/**
 * Created by Pedro Luz on 22/08/2014.
 */
var strings = require("./commonStrings");
module.exports = {
    /**
     * Validates a user given a password.
     * @param user The user object to be validated.
     * @param pwd Any given password to be validated.
     * @param cb Callback function(err, result).
     */
    validatePassword: function (user, pwd, cb) {
        var pass = require('pwd');
        pass.hash(pwd, user.salt, function (err, hash) {
            if (err) {
                cb(err);
            }
            var authorized = user.password == hash;
            cb(authorized ? null : strings.wrongPassword, authorized ? user : null);
        });
    },
    /**
     * Generic Express middleware for validating user requests against its roles and permissions.
     * @param req The request object from Express.
     * @param res The response object from Express.
     * @param next The next() function to be executed in the middleware.
     * @returns {*}
     */
    checkAuth: function (req, res, next)
    {
        debugger;
        if (req.isAuthenticated()) {
            return next();
            //TODO: Verify custom user roles and permissions.
        }
        res.redirect('/login')
    },

    /**
     * Generic Express middleware for allowing anonymous requests.
     * @param req The request object from Express.
     * @param res The response object from Express.
     * @param next The next() function to be executed in the middleware.
     * @returns {*}
     */
    allowAnonymous: function (req, res, next) {
        debugger;
        return next();
    }
};
