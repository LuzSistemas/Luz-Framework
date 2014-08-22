/**
 * Created by Pedro Luz on 19/08/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    cpf: {type: String},
    cnpj: {type: String},
    dataNascimento: {type: Date}
});

var Pessoa = mongoose.model('Pessoa', pessoaSchema);
module.exports = Pessoa;