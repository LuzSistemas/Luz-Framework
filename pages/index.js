var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {

    //    res.render("layout", {});
    //    return;
    var entidadesBig = require('../entidadesBig');
    //    entidadesBig.Pessoa.update(req.query, {$set: {cpf: '999.999.999-99'}}, {multi: true}, function (e, i){
    //        entidadesBig.Pessoa.find(req.query, function(err, pessoas)
    //        {
    //            res.send({erros:err, registrosAfetados: i, pessoas: pessoas});
    //        });
    //    });
    debugger;
    var novaPessoa = new entidadesBig.Pessoa(req.query);
    novaPessoa.save(function (err) {
        debugger;
        if (err) return handleError(err);
        // saved!
        entidadesBig.Pessoa.find({}, function (err, pessoas) {
            res.render('index', {teste: pessoas});
        })
    });
});

module.exports = {
    controller: router,
    menuItem:{
        title: "Testes Logos",
        icon:"fa-cogs"
    }
};