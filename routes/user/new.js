var userPermissions = require("../../UserPermissions");
var strings = require("../../commonStrings");
var novaPessoaController = {
    get: {
        necessaryPermissions: [{
            key: 'createUser',
            title: strings.createUser,
            description: "Permissão para criar novos usuários no sistema."
        }],
        action: function(req, res) {
            var models = require('../../models');
            models.system.User.find({}, function(err, pessoas) {
                res.render('index', {
                    teste: pessoas
                });
            });
        }
}
};

module.exports = {
    controller: novaPessoaController,
    menuItem: {
        title: 'Novo',
        icon: 'fa-plus'
    },
    page: {
        title: 'Novo usuário',
        header: {
            title: 'Criar novo usuário',
            description: 'Criação de um novo usuário para o sistema',
            icon: 'fa-user'
        }
    }
};