/* GET users listing. */
var novaPessoaController = {
    get: {
        action: function(req, res) {
            debugger;
            var entidadesBig = require('../../entidadesBig');
            entidadesBig.Pessoa.find({}, function(err, pessoas) {
                res.render('index', {
                    teste: pessoas
                });
            });
        }
    }
};

module.exports = {
    controller: novaPessoaController,
    pageTitle: 'Nova pessoa',
    pageHeaderTitle: 'Criar nova pessoa',
    pageHeaderDescription: 'Tela para criação de novas pessoas',
    pageHeaderIcon: 'fa-user',
    menuItem: {
        title: 'Nova',
        icon: 'fa-plus'
    }
};