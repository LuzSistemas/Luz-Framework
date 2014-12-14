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
                if (mailbox)
                {
                    res.send(commonStrings.mail.mailboxAlreadyExists);
                    return;
                }
                mailbox = new models.system.Mailbox();
                mailbox.userId = req.body.userId;
                mailbox.pageSize = config.mail.defaults.pageSize;
                mailbox.save(function(err){
                    if (!err)
                    {
                        res.send('OK');
                        return;
                    }
                    res.send(err);
                    return;
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