/**
 * Created by Pedro Luz on 19/08/2014.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pessoaSchema = new Schema({
    nome1: {type: String, required: true},
    sobrenome2: {type: String, required: true},
    cpf3: {type: String},
    cnpj4: {type: String},
    dataNascimento5: {type: Date}
});

var Pessoa = mongoose.model('Pessoa1', pessoaSchema);
module.exports = Pessoa;