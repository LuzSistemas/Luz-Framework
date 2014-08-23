var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var _ = require('underscore')
var entidadesBig = require('./entidadesBig');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pwd = require('pwd');
var commonStrings = require('./commonStrings');


var app = express();

/**
 * Internal middleware setup
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
    getCurrentPage(req, function (currentPage) {
        // override view rendering logic
        res.render = function (view, options, fn) {
            // do some custom logic
            _.extend(options,
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
var pages = requireDir('./pages', { recurse: true });
global.pages = pages;
var menuItems = [];
setupPages(pages, "/", function (router) {
    app.use(router);
});
buildMenuItems(menuItems, pages, "/");

/**
 * Builds all the menu items based on the pages folder.
 * @param items The parent menu item reference.
 * @param pages The pages to be processed into menu items.
 */
function buildMenuItems(items, pages, parentUrl) {
    for (var p in pages) {
        if (pages[p].hasOwnProperty('menuItem')) {
            if (pages[p].menuItem.subItems === true) {
                pages[p].menuItem.subItems = [];
            }

            var itemUrl = parentUrl + (p === 'index' ? '' : p);
            pages[p].menuItem.url = itemUrl;
            buildMenuItems(pages[p].menuItem.subItems, pages[p], itemUrl + "/");
            items.push(pages[p].menuItem);
        }
    }
}

/**
 * Setups all pages and builds up an Express Router object setting its proper routes and controllers based on the pages folder.
 * @param pages The pages to be processed.
 * @param parentUrl The string reference for the parent route in URL format.
 * @param cb The callback function when the setup is done passing out the built router
 * @param cb The external router param for recursive calling.
 */
function setupPages(pages, parentUrl, cb, router) {
    if (!router)
    {
        router = express.Router();
    }
    for (var r in pages) {
        if (pages[r].hasOwnProperty('controller'))
        {
            var tUrl = parentUrl + (r === 'index' ? '' : r);
            if (pages[r].controller.hasOwnProperty('get'))
            {
                for (var m in pages[r].controller)
                {
                    switch (m)
                    {
                        case "get":
                            router.get(tUrl, pages[r].controller.get);
                            break;
                        case "post":
                            router.post(tUrl, pages[r].controller.post);
                            break;
                    }
                }
            }
            else
            {
                router.get(tUrl, pages[r].controller);
                router.post(tUrl, pages[r].controller);
            }
        }
        else {
            if (r != 'menuItem') {
                setupPages(pages[r], parentUrl + r + '/', function(){}, router);
            }
        }
    }
    cb(router);
}

/**
 * Returns all menu items to the client.
 */
app.use('/api/menuItems', function (req, res) {
    //TODO: Filter menu items per user permissions and roles!!
    debugger;
    res.send(menuItems);
});

/**
 * Returns all page objects to the client.
 */
app.use('/api/pages', function (req, res) {
    //TODO: Filter menu items per user permissions and roles!!
    debugger;
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

/**
 * Helper function for removing specific values from an Array instance.
 * @param deleteValue The value to be removed.
 * @returns {Array} The Array instance already cleaned up.
 */
global.cleanArray = function (arr, deleteValue) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == deleteValue) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
};

/**
 * Gets the current page and it's breadcrumb object.
 * @param req The request relayed from the controller.
 * @param cb The callback for getting this result: function(currentPage)
 */
global.getCurrentPage = function (req, cb) {
    /**
     * Gets current page from session.
     * @type {*|currentPage|$scope.currentPage}
     */

    var urlRoutes = req.url.split('/');
    /**
     * Checks if the last route url is a file, if it is, ignore the current page logic for this request.
     */
    if (urlRoutes[urlRoutes.length - 1].indexOf('.') > -1) {
        cb(null);
        return;
    }
    var currentPage = req.session.currentPage;
    if (currentPage) {
        /**
         * Check if page has been changed.
         */
        var url = currentPage.breadCrumb[currentPage.breadCrumb.length - 1].url;
        if (url.substr(0, url.length - 1) == req.url) {
            cb(currentPage);
            return;
        }
    }
    var breadCrumb = [];
    currentPage = global.pages;
    var urlPath = global.cleanArray(req.originalUrl.split('?')[0].split('/'), '');
    if (!urlPath.length) {
        urlPath = ['index'];
    }
    var currUrl = "/";
    for (var r in urlPath) {
        var tUrl = urlPath[r] === '/' ? 'index' : urlPath[r];
        currentPage = currentPage[tUrl];
        currUrl += urlPath[r] + "/";
        if (currentPage.hasOwnProperty('pageTitle')) {
            breadCrumb.push({title: currentPage.pageTitle, url: currUrl});
        }
        else if (currentPage.hasOwnProperty('menuItem')) {
            breadCrumb.push({title: currentPage.menuItem.title});
        }
        else {
            breadCrumb.push({title: urlPath[r]});
        }
    }
    breadCrumb[breadCrumb.length - 1].active = true;
    currentPage.breadCrumb = breadCrumb;
    //Sets session variable for caching
    req.session.currentPage = currentPage;
    cb(currentPage);
};

passport.use(new LocalStrategy(
    function (username, password, done) {
        entidadesBig.Usuario.find({email: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: commonStrings.userNotFound });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: commonStrings.wrongPassword });
            }
            return done(null, user);
        });
    }
));

module.exports = app;