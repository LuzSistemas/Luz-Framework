/**
 * Created by Pedro on 11/12/2014.
 */
var createMailboxPermission = {
    key: 'createMailAccount',
    title: commonStrings.createMailAccount,
    description: "Permissão para criar contas de e-mail no sistema."
};

var createMailboxController = {
    post: {
        necessaryPermissions: [createMailboxPermission],
        action: function(req, res) {
            models.system.Mailbox.findOne({userId: req.body.userId}, function(err, mailbox) {

                if (err)
                {
                    res.send(err);
                    return;
                }

                if (mailbox)
                {
                    res.send(commonStrings.mail.mailboxAlreadyExists);
                    return;
                }

                var now = new Date();

                models.system.User.findById(req.body.userId, function(uErr, user){
                    if (!uErr && user){
                        mailbox = new models.system.Mailbox();
                        mailbox.user = user;
                        mailbox.addresses = req.body.addresses;
                        mailbox.pageSize = config.mail.defaults.pageSize;
                        _.forEach(config.mail.defaults.folders, function(f){
                            mailbox.folders.push({
                                title: f,
                                createdOn: now
                            });
                        });
                        mailbox.save(function(err){
                            if (!err)
                            {
                                res.send('OK');
                                return;
                            }
                            res.send(uErr);
                            return;
                        });
                    }
                });
            });
        }
    }
};

module.exports = {
    controller: createMailboxController
    //menuItem: {
    //    title: 'Novo',
    //    icon: 'fa-plus'
    //},
    //page: {
    //    title: 'Novo usuário',
    //    header: {
    //        title: 'Criar novo usuário',
    //        description: 'Criação de um novo usuário para o sistema',
    //        icon: 'fa-user'
    //    }
    //}
};