var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var expressLayouts = require('express-ejs-layouts')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);


//Initialize pages from files
var pages = requireDir('./pages', { recurse: true });
var menuItems = [];
setupPages(pages, "/");
buildMenuItems(menuItems, pages, "/")

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
            buildMenuItems(pages[p].menuItem.subItems, pages[p],itemUrl + "/");
            items.push(pages[p].menuItem);
        }
    }
}

/**
 * Setups all pages setting its proper routes and controllers based on the pages folder.
 * @param pages The pages to be processed.
 * @param parentUrl The string reference for the parent route in URL format.
 */
function setupPages(pages, parentUrl) {
    for (var r in pages) {
        if (pages[r].hasOwnProperty('controller')) {
            app.use(parentUrl + (r === 'index' ? '' : r), pages[r].controller);
        }
        else {
            if (r != 'menuItem') {
                setupPages(pages[r], parentUrl + r + '/');
            }
        }
    }
}

/**
 * Returns all menu items to the client.
 */
app.use('/api/menuItems', function (req, res) {
    //TODO: Filter menu items per user permissions and roles!!
    debugger;
    res.send(menuItems);
});


/// catch 404 and forward to error handler
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