/**
 * Created by Pedro Luz on 22/08/2014.
 */
var strings = require("./commonStrings");
var _ = require('lodash-node');
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
    checkAuth: function (req, res, next) {
        debugger;
        if (req.isAuthenticated()) {
            var currentPage = req.session.currentPage;
            var tMethod = req.method.toLowerCase();
            var user = req.user;
            if (user.superAdmin) {
                next();
            }
            if (currentPage && currentPage.controller[tMethod] && !_.isEmpty(currentPage.controller[tMethod].necessaryPermissions)) {
                var necessaryPermissions = currentPage.controller[tMethod].necessaryPermissions;
                for (var p in necessaryPermissions) {
                    if (!_.contains(user.permissions, necessaryPermissions[p].key)) {
                        /**
                         * Missing permission for this page!
                         */
                        res.redirect('/login')
                    }
                }
            }
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
    },

    /**
     * Helper function for removing specific values from an Array instance.
     * @param deleteValue The value to be removed.
     * @returns {Array} The Array instance already cleaned up.
     */
    cleanArray: function (arr, deleteValue) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == deleteValue) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr;
    },

    /**
     * Gets the current page and it's breadcrumb object.
     * @param req The request relayed from the controller.
     * @param cb The callback for getting this result: function(currentPage)
     */
    getCurrentPage: function (req, cb) {
        /**
         * Gets current page from session.
         * @type {*|currentPage|$scope.currentPage}
         */

        var urlRoutes = req.url.split('/');
        /**
         * Checks if the last route url is a file, if it is, ignore the current page logic for this request.
         */
        if (urlRoutes[urlRoutes.length - 1].indexOf('.') > -1) {
            return cb(null);
        } else {
            var currentPage = req.session.currentPage;
            if (currentPage) {
                /**
                 * Check if page has been changed.
                 */
                var url = currentPage.breadCrumb[currentPage.breadCrumb.length - 1].url;
                if (url.substr(0, url.length - 1) == req.url) {
                    return cb(currentPage);
                }
            }
            var breadCrumb = [];
            currentPage = global.pages;
            var urlPath = this.cleanArray(req.originalUrl.split('?')[0].split('/'), '');
            if (!urlPath.length) {
                urlPath = ['index'];
            }
            var currUrl = "/";
            for (var r in urlPath) {
                var tUrl = urlPath[r] === '/' ? 'index' : urlPath[r];
                currentPage = currentPage[tUrl];
                currUrl += urlPath[r] + "/";
                if (currentPage.hasOwnProperty('pageTitle')) {
                    breadCrumb.push({
                        title: currentPage.pageTitle,
                        url: currUrl
                    });
                } else if (currentPage.hasOwnProperty('menuItem')) {
                    breadCrumb.push({
                        title: currentPage.menuItem.title
                    });
                } else {
                    breadCrumb.push({
                        title: urlPath[r]
                    });
                }
            }
            breadCrumb[breadCrumb.length - 1].active = true;
            currentPage.breadCrumb = breadCrumb;
            //Sets session variable for caching
            req.session.currentPage = currentPage;
            return cb(currentPage);
        }
    }
};