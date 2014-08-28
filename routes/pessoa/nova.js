var userPermissions = require("../../UserPermissions");
var strings = require("../../commonStrings");
var novaPessoaController = {
    get: {
        necessaryPermissions: [{
            key: 'viewDashboard',
            title: strings.viewDashboard,
            description: "Permission for viewing the dashboard page."
        }],
        action: function(req, res) {
            debugger;
            var entidadesBig = require('../../bigJsEntities');
            entidadesBig.system.User.find({}, function(err, pessoas) {
                res.render('index', {
                    teste: pessoas
                });
            });
        }
    }
};

module.exports = {
    controller: novaPessoaController,
    title: 'Nova pessoa',
    header: {
        title: 'Criar nova pessoa',
        description: 'Tela para criação de novas pessoas',
        icon: 'fa-user'
    },
    menuItem: {
        title: 'Nova',
        icon: 'fa-plus'
    }
};