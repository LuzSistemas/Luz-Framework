/**
 * Created by Pedro on 03/12/2014.
 */
/* GET home page. */
var util = require('util');
var fs = require('fs');
var uuid = require('node-uuid');

var mailIndexController = {
    get: {
        necessaryPermissions: [{
            key: 'viewMail',
            title: commonStrings.mail.view,
            description: "Permissão para visualizar e-mails no sistema."
        }],
        action: function(req, res) {
            res.render('\\mail\\index', {});
        }
    }
};

module.exports = {
    controller: mailIndexController,
    menuItem: {
        title: commonStrings.mail.inbox,
        icon: "fa-envelope"
    },
    page: {
        title: commonStrings.mailBox,
        header: {
            title: commonStrings.mail.inbox,
            description: 'Bem-vindo aos seus e-mails.',
            icon: 'fa-envelope'
        }
    }
};