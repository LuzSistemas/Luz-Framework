var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var entidadesBig = require('../../entidadesBig');
    entidadesBig.Pessoa.find({}, function (err, pessoas){
        res.render('index', {teste: pessoas});
    });
});

module.exports =
{
    controller: router,
    menuItem: {
        title: 'Nova',
        icon: 'fa-plus'
    }
};
