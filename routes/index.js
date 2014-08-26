/* GET home page. */
var entidadesBig = require('../bigJsEntities');
var indexController = {
    get: {
        auth: require("../LuzUtil").allowAnonymous,
        action: function(req, res) {

            //    res.render("layout", {});
            //    return;
            //    entidadesBig.Pessoa.update(req.query, {$set: {cpf: '999.999.999-99'}}, {multi: true}, function (e, i){
            //        entidadesBig.Pessoa.find(req.query, function(err, pessoas)
            //        {
            //            res.send({erros:err, registrosAfetados: i, pessoas: pessoas});
            //        });
            //    });
            var novaPessoa = new entidadesBig.system.User(req.query);
            novaPessoa.save(function(err) {
                if (err) return console.log(err);
                // saved!
                entidadesBig.system.User.find({}, function(err, pessoas) {
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