/**
 * Created by Pedro on 15/12/2014.
 */
var fs = require('fs');

var mailReadController = {
    get: {
        necessaryPermissions: [{
            key: 'viewMail',
            title: commonStrings.mail.view,
            description: "Permissão para visualizar e-mails no sistema."
        }],
        action: function(req, res) {
            models.system.Mail.findById(req.query.id).exec(function(err, mail) {
                if (!err) {
                    var blobService = luzUtil.getBlobService();
                    blobService.getBlobToText('mails', mail.key, function(error, json) {
                        if (!error) {
                            mail.original = JSON.parse(json);
                            res.render('\\mail\\read', {
                                mail: mail
                            });
                        }
                    });
                } else {
                    res.send(err);
                }
            });
        }
    }
};

module.exports = {
    controller: mailReadController,
    page: {
        title: commonStrings.mail.read,
        header: {
            title: commonStrings.mail.read,
            description: 'Ler e-mail',
            icon: 'fa-envelope'
        }
    }
};