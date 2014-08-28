var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var _ = require('lodash-node');
var entidadesBig = require('./bigJsEntities');
var passport = require('passport');
var pwd = require('pwd');
var commonStrings = require('./commonStrings');
var luzUtil = require('./LuzUtil');
var luzAuth = require('./LuzAuth');
var userPermissions = require("./UserPermissions");
var ls = require('list-directory-contents');
var config = require("./config");


ls('../views', function (err, tree) {
    var views = {};
    for (var i in tree)
    {
        if (!luzUtil.endsWith(tree[i], "/"))
        {
            luzUtil.setProperty(views, tree[i].replace('..\\views\\', '').split('.')[0].replace(/\\/g,'.'), true);
        }
    }
    debugger;
    global.views = views;
});

/**
 * Setup authentication using Passport.
 */
luzAuth(passport);

/**
 * Express starting up.
 */
var app = express();

/**
 * Internal Express middleware setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon("./public/brackets/images/favicon.png"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(session({secret: 'logos no node!!'}));
app.use(passport.initialize());
app.use(passport.session());


/**
 * Custom middleware setup
 */

/**
 * Middleware to add parameters to view rendering.
 */
app.use(function (req, res, next) {
    //Grab render function reference

    var _render = res.render;

    /**
     * Gets current page object and continues the common view rendering behavior
     */
    luzUtil.getCurrentPage(req, function (currentPage) {
        // override view rendering logic
        res.render = function (view, options, fn) {

            /**
             * Checks if:
             * - There's a base layout defined for the active template
             * - There's not a specific layout already defined
             * If both apply, replace default layout with the one from the active template.
             */

            if (global.views.templates[config.activeTemplate].layout && options && !options.layout)
            {
                _.merge(options,
                    {
                        layout: "templates/" + config.activeTemplate + "/layout"
                    });
            }
            /**
             * Checks if this view exists within the active template.
             */
            if (luzUtil.getProperty(global.views.templates[config.activeTemplate], view.replace(/\\/g, '.')))
            {
                debugger;
                /**
                 * If it does, replaces the default view with the template one.
                 */
                view = "templates/" + config.activeTemplate + "/" + view;
            }
            _.merge(options,
                {
                    currentPage: currentPage
                });
            _render.call(this, view, options, fn);
        };
        next();
    });
});

/**
 * Builds page objects from pages folder.
 * @type {*|map|exports}
 */
var pages = requireDir('./routes', { recurse: true });
global.pages = pages;
var menuItems = [];
setupPages(pages, "/", function (router, extractedPermissions) {
    app.use(router);
    _.forEach(extractedPermissions, function(newPermission) {
        /**
         * Ingore permissions with the same key.
         */
        if (_.isUndefined(userPermissions[newPermission.key]))
        {
            var key = newPermission.key;
            delete newPermission.key;
            userPermissions[key] = newPermission;
        }
    });
});
buildMenuItems(menuItems, pages, "/");

/**
 * Builds all the menu items based on the pages folder.
 * @param items The parent menu item reference.
 * @param pages The pages to be processed into menu items.
 */
function buildMenuItems(items, pages, parentUrl) {
    for (var p in pages) {
        /**
         * Checks if page has a menu item definition.
         */
        if (pages[p].hasOwnProperty('menuItem')) {
            if (pages[p].menuItem.subItems === true) {
                pages[p].menuItem.subItems = [];
            }

            var itemUrl = parentUrl + (p === 'index' ? '' : p);
            pages[p].menuItem.url = itemUrl;
            /**
             * Recursiveness for menu sub-items.
             */
            buildMenuItems(pages[p].menuItem.subItems, pages[p], itemUrl + "/");
            items.push(pages[p].menuItem);
        }
    }
}

/**
 * Setups all pages shaping up an Express Router object with its proper routes and controllers based on the pages folder.
 * @param pages The pages to be processed.
 * @param parentUrl The string reference for the parent route in URL format.
 * @param cb The callback function when the setup is done passing out the built router
 * @param cb The external router param for recursive calling.
 */
function setupPages(pages, parentUrl, cb, router) {
    /**
     * If router object is empty, create one.
     */
    var userPermissions = [];
    if (!router) {
        router = express.Router();
    }
    for (var r in pages) {
        /**
         * Checks if page has a controller defined, if not, will be treated as a DIRECTORY.
         */
        if (pages[r].hasOwnProperty('controller'))
        {
            var tUrl = parentUrl + (r === 'index' ? '' : r);
            for (var m in pages[r].controller) {
                var userAuthenticationStrategy = pages[r].controller[m].auth ? pages[r].controller[m].auth : luzUtil.checkAuth;
                if (pages[r].controller[m].action.necessaryPermissions)
                {
                    userPermissions = userPermissions.concat(pages[r].controller[m].action.necessaryPermissions);
                }
                router[m](tUrl, userAuthenticationStrategy, pages[r].controller[m].action)
            }
        }
        else {
            /**
             * Implementing recursive directories and files, ignoring menu item definition files (menuItem.js).
             */
            if (r != 'menuItem') {
                setupPages(pages[r], parentUrl + r + '/', function (rr, permissions)
                {
                    userPermissions = userPermissions.concat(permissions);
                }, router);
            }
        }
    }
    /**
     * All done, router is ready to roll.
     */
    cb(router, userPermissions);
}

/**
* Returns all menu items to the client.
    */
app.use('/api/menuItems', function (req, res) {
    //TODO: Filter menu items per user permissions and roles!!

    res.send(menuItems);
});

/**
* Returns all menu items to the client.
*/
app.use('/api/commonStrings', function (req, res) {
    res.send(commonStrings);
});

/**
 * Returns all page objects to the client.
 */
app.use('/api/routes', function (req, res) {
    //TODO: Filter menu items per user permissions and roles!!

    res.send(pages);
});


/**
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;