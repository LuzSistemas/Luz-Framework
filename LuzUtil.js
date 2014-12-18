/**
 * Created by Pedro Luz on 22/08/2014.
 */
var path = require("path");
var azure = require('azure-storage');
var fs = require('fs');
var _ = require('lodash-node');

module.exports = {
    /**
     * Validates a user given a password.
     * @param user The user object to be validated.
     * @param pwd Any given password to be validated.
     * @param cb Callback function(err, result).
     */
    validatePassword: function(user, pwd, cb) {
        var pass = require('pwd');
        pass.hash(pwd, user.salt, function(err, hash) {
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
    checkAuth: function(req, res, next) {
        //Checks if there's an user logged
        if (req.isAuthenticated()) {
            var currentPage = req.session.currentPage;
            var tMethod = req.method.toLowerCase();
            var user = req.user;

            //If user is superAdmin, clear!
            if (user.superAdmin) {
                return next();
            }

            //Checks if the current action needs specific permissions.
            if (currentPage && currentPage.controller[tMethod] && !_.isEmpty(currentPage.controller[tMethod].necessaryPermissions)) {
                var necessaryPermissions = currentPage.controller[tMethod].necessaryPermissions;
                for (var p in necessaryPermissions) {
                    if (!_.contains(user.permissions, necessaryPermissions[p].key)) {
                        /**
                         * Missing permission for this page!
                         */
                            //TODO: Missing permissions page!
                        res.redirect('/admin/login')
                    }
                }
            }
            /*
             Ok! Authorized!
             */
            return next();
        }

        //You shall not pass!
        res.redirect('/admin/login')
    },

    /**
     * Generic Express middleware for allowing anonymous requests.
     * @param req The request object from Express.
     * @param res The response object from Express.
     * @param next The next() function to be executed in the middleware.
     * @returns {*}
     */
    allowAnonymous: function(req, res, next) {
        return next();
    },

    /**
     * Helper function for removing specific values from an Array instance.
     * @param deleteValue The value to be removed.
     * @returns {Array} The Array instance already cleaned up.
     */
    cleanArray: function(arr, deleteValue) {
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
    getCurrentPage: function(req, cb) {

        /*
         Igore API requests (that doesn't need a currentPage variable!)
         */
        if (req.url.indexOf('/api') >= 0) {
            if (cb) {
                return cb(null);
            }

            return null;
        }
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
                if (url && url.substr(0, url.length - 1) == req.url) {
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
            var counter = 1;
            for (var r in urlPath) {
                var tUrl = urlPath[r] === '/' ? 'index' : urlPath[r];
                /**
                 * Fix for pages with missing info.
                 */
                if (_.isUndefined(currentPage[tUrl])) {
                    currentPage[tUrl] = {};
                }

                currentPage = counter == urlPath.length ? (currentPage[tUrl].index ? currentPage[tUrl].index.page : currentPage[tUrl].page) : currentPage[tUrl];

                if (!currentPage) {
                    currentPage = {};
                }

                currUrl += urlPath[r] + "/";
                if (currentPage.hasOwnProperty('title')) {
                    breadCrumb.push({
                        title: currentPage.title,
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
                counter++;
            }
            breadCrumb[breadCrumb.length - 1].active = true;
            currentPage.breadCrumb = breadCrumb;
            //Sets session variable for caching
            req.session.currentPage = currentPage;
            return cb(currentPage);
        }
    },
    setProperty: function(obj, path, value) {
        var tObj = obj;
        var paths = path.split('.');
        for (i = 0; i < paths.length - 1; i++) {
            if (_.isUndefined(tObj[paths[i]])) {
                tObj[paths[i]] = {}
            }
            tObj = tObj[paths[i]];
        }
        tObj[paths[paths.length - 1]] = value;
    },
    getProperty: function(obj, path, cb) {
        var tObj = obj;
        var paths = path.split('.');
        for (i = 0; i < paths.length - 1; i++) {
            if (_.isUndefined(tObj[paths[i]])) {
                if (cb) {
                    return cb(undefined);
                }
                return undefined;
            }
            tObj = tObj[paths[i]];
        }
        if (cb) {
            return cb(tObj[paths[paths.length - 1]]);
        }

        return tObj[paths[paths.length - 1]];
    },
    endsWith: function(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },
    getValidationErrorMessage: function(input) {

    },
    /*
     Gets a string or boolean value based on a given string
     */
    getStringOrBoolean: function(str) {
        switch (str.toLowerCase()) {
            case "true":
                return true;
                break;
            case "false":
                return false;
                break;
            default:
                return str;
                break;
        }
    },
    /*
     Gets the current application directory, if filename is specified, returns the full file path.
     */
    getAppPath: function(fp) {
        var ret = config.appDir;
        if (fp) {
            ret = path.join(ret, fp);
        }
        return ret;
    },

    /*
     Handles incoming mail from SendGrid inbound parse service and sends relevants data to database.
     */
    handleIncomingSendGridMail: function(key, req) {
        var models = require(luzUtil.getAppPath('/models'));
        var newMail = new models.system.Mail();

        var to = req.body.to.split(',');
        to = _.map(to, function(t) {
            return t.trim();
        });

        var attachments = [];
        var blobService = azure.createBlobService(config.mail.azureStorageAccount, config.mail.azureStorageKey);

        blobService.createContainerIfNotExists('mailattachments', function(error, result, response) {
            _.forEach(req.files, function(f) {
                attachments.push({
                    key: f.name,
                    filename: f.originalname,
                    mimeType: f.mimetype,
                    size: f.size
                });
                fs.readFile(f.path, function(err, data) {
                    if (!err) {
                        blobService.createBlockBlobFromText('mailattachments', f.name, data, function(e, resu, resp) {
                            if (!e) {
                                fs.unlink(f.path);
                            }
                        });
                    }
                });

            });

            newMail.key = key;
            newMail.to = to;
            newMail.from = req.body.from;
            newMail.spam_score = req.body.spam_score;
            newMail.subject = req.body.subject;
            newMail.date = new Date();

            if (req.body.attachments > 0) {
                newMail.attachments = attachments;
            }

            newMail.save(function(err, s) {
                if (err) {
                    return err;
                }
                luzUtil.processEmail(newMail);
                return true;
            });
        });
    },
    /**
     * Processes an incoming email amongs it's mailboxes.
     * @param mail The email received on the incoming action.
     */
    processEmail: function(mail) {
        var dbMailbox = models.system.Mailbox;
        _.each(mail.to, function(t) {
            t = t.replace('<', '').replace('<', '').trim().toLowerCase();
            dbMailbox.find({
                addresses: {
                    $in: [t]
                }
            }, function(err, mailboxes) {
                if (!err) {
                    _.forEach(mailboxes, function(mailbox) {
                        /* var i = _.findIndex(mailbox.folders, function(f){
                         f.title == commonStrings.mail.folders.inbox;
                         });*/
                        var i = 0;
                        mailbox.folders[i].mails.push({
                            mail: mail
                        });
                        mailbox.save();
                    });
                }
            });
        });

    },
    importEmailsFromAzure: function() {
        var ret = [];
        try {
            var blobService = azure.createBlobService(config.mail.azureStorageAccount, config.mail.azureStorageKey);
            blobService.listBlobsSegmented("mails", null, function(err, result) {
                if (!err) {
                    _.each(result.entries, function(e) {
                        blobService.getBlobToText("mails", e.name, function(err, result) {
                            if (!err) {
                                var mail = JSON.parse(result);
                                if (mail.to) {
                                    ret.push(luzUtil.handleIncomingSendGridMail(e.name, mail));
                                }
                            }
                        })
                    });
                }
            });
        } catch (ex) {

        }

        return ret;
    },
    getBlobService: function(){
        var blobService = azure.createBlobService(config.mail.azureStorageAccount, config.mail.azureStorageKey);
        return blobService;
    }
};