/**
 * Created by Pedro Luz on 19/08/2014.
 */
var entities = {};
var mongoose = require('mongoose');
var config = require("./config");
var models = require('require-dir')('./models', {
    recurse: true
});

setupModels(models,[]);

/**
 * Helper function for models setup
 * @param model The current model object.
 * @param parentModels The parent model object.
 */
function setupModels(model, parentModels) {
    for (var m in model) {
        if (model[m].schema) {
            var schema = new mongoose.Schema(model[m].schema);
            if (model[m].setup) {
                model[m].setup(schema);
            }
            entities[m] = mongoose.model(model[m].key ? model[m].key : parentModels.join('.') + "." +  m, schema);
        }
        else {
            var cParentModel = parentModels.slice(0);
            cParentModel.push(m);
            setupModels(model[m], cParentModel);
        }
    }
}

mongoose.connect(config.connectionString);
module.exports = entities;