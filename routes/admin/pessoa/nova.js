var userPermissions = require("../../../UserPermissions");
var strings = require("../../../commonStrings");
var novaPessoaController = {
    get: {
        necessaryPermissions: [{
            key: 'viewDashboard',
            title: strings.viewDashboard,
            description: "Permission for viewing the dashboard page."
        }],
        action: function(req, res) {
            var models = require(luzUtil.getAppPath('/models'));
            models.system.User.find({}, function(err, pessoas) {
                res.render('pessoa/nova', {
                    teste: pessoas,
                    req: req
                });
            });
        }
}
};

module.exports = {
    controller: novaPessoaController,
    page: {
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
    }
};