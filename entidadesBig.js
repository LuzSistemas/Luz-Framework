/**
 * Created by Pedro Luz on 19/08/2014.
 */
var contextoBig = {};
var mongoose = require('mongoose');
var models = require('require-dir')('./models', {
    recurse: true
});

for (var m in models) {
    contextoBig[m] = models[m];
}

mongoose.connect('mongodb://localhost/BigJS');
module.exports = contextoBig;