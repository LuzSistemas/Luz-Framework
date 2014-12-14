/**
 * Created by Pedro on 09/10/2014.
 */
var userPermissions = require("../../../UserPermissions");
var strings = require("../../../commonStrings");

var funcNewUser = function(req, res) {
    var models = require(luzUtil.getAppPath('/models'));
    var userData = req.method == "POST" ? req.body : req.query;
    var newUser = new models.system.User(userData);
    newUser.save(function(err, s)
    {
        if (err)
        {
            return res.send(err);
        }
        return res.send(newUser);
    });
};

var novaPessoaController = {
    get: {
        /*necessaryPermissions: [{
         key: 'createUser',
         title: strings.createUser,
         description: "Permissão para criar novos usuários no sistema."
         }],*/
        auth: luzUtil.allowAnonymous,
        action: funcNewUser
    },
    post: {
        /*necessaryPermissions: [{
         key: 'createUser',
         title: strings.createUser,
         description: "Permissão para criar novos usuários no sistema."
         }],*/
        auth: luzUtil.allowAnonymous,
        action: funcNewUser
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