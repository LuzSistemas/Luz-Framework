/* GET home page. */
var indexController = {
    get: {
        action: function(req, res) {

            //    res.render("layout", {});
            //    return;
            var entidadesBig = require('../entidadesBig');
            //    entidadesBig.Pessoa.update(req.query, {$set: {cpf: '999.999.999-99'}}, {multi: true}, function (e, i){
            //        entidadesBig.Pessoa.find(req.query, function(err, pessoas)
            //        {
            //            res.send({erros:err, registrosAfetados: i, pessoas: pessoas});
            //        });
            //    });
            var novaPessoa = new entidadesBig.Usuario(req.query);
            novaPessoa.save(function(err) {
                if (err) return console.log(err);
                // saved!
                entidadesBig.Usuario.find({}, function(err, pessoas) {
                    res.render('index', {
                        teste: pessoas
                    });
                });
            });
        }
    }
};

module.exports = {
    controller: indexController,
    menuItem: {
        title: "Testes Logos",
        icon: "fa-cogs"
    }
};