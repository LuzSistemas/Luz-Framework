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
            models.system.Mailbox.findOne({user: req.user._id}).populate('folders.mails.mail').exec(function(err, mailbox)
            {
                debugger;
                if (!err)
                {
                   /*models.system.Mail.find({}, function(err, mails){
                        _.forEach(mails, function (m){
                            luzUtil.processEmail(m);
                        });
                    });*/

                    res.render('\\mail\\index', {
                        mailbox: mailbox
                    });
                }
                else{
                    res.send(err);
                }
            });
        }
    }
};

module.exports = {
    controller: mailIndexController,
    menuItem: {
        title: commonStrings.mail.folders.inbox,
        icon: "fa-envelope"
    },
    page: {
        title: commonStrings.mailBox,
        header: {
            title: commonStrings.mail.folders.inbox,
            description: 'Bem-vindo aos seus e-mails.',
            icon: 'fa-envelope'
        }
    }
};