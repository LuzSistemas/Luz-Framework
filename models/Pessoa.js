/**
 * Created by Pedro Luz on 19/08/2014.
 */
var mongoose = require('mongoose');

var pessoaSchema = {
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    cpf: {type: String},
    cnpj: {type: String},
    dataNascimento: {type: Date}
};

module.exports = {
    key: "Pessoa",
    schema: pessoaSchema
};