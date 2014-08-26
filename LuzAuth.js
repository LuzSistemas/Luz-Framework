/**
 * Created by Pedro Luz on 24/08/2014.
 */
var entidadesBig = require('./bigJsEntities');
var commonStrings = require('./commonStrings');
var luzUtil = require('./LuzUtil');
var LocalStrategy = require('passport-local').Strategy;

module.exports =
    function(passport)
    {
        passport.serializeUser(function (user, done) {
            return done(null, user.id);
        });

        passport.deserializeUser(function (userId, done)
        {
            entidadesBig.system.User.findOne({_id: userId}, function (err, user)
            {
                return done(err, user);
            });
        });

        /**
         * Defining Passport Local (username and password) logic.
         */
        passport.use(new LocalStrategy(
            function (username, password, done) {
                /**
                 * Make it async!
                 */
                process.nextTick(function () {
                    /**
                     * Gets the user object by the username provided.
                     */
                    entidadesBig.system.User.getByUsername(username, function (err, user) {
                        /**
                         * Return query errors.
                         */
                        if (err) {
                            return done(err);
                        }
                        /**
                         * User not found!
                         */
                        if (!user) {
                            return done(commonStrings.userNotFound);
                        }
                        /**
                         * Validates password through hash verification.
                         */
                        luzUtil.validatePassword(user, password, function (err, result) {
                            return done(err, result);
                        })
                    });
                });
            }
        ));


    };