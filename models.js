/**
 * Created by Pedro Luz on 19/08/2014.
 */

if (global.models)
{
    module.exports = global.models;
    return;
}
var entities = {};
var mongoose = require('mongoose');
var config = require("./config");
var luzUtil = require("./LuzUtil");
var models = require('require-dir')('./models', {
    recurse: true
});

setupModels(models,[]);
global.models = models;

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
            luzUtil.setProperty(entities, (parentModels.length > 0 ? parentModels.join('.') + "." : "") + m, mongoose.model(model[m].key ? model[m].key : parentModels.join('.') + "." +  m, schema))
        }
        else {
            var cParentModel = parentModels.slice(0);
            cParentModel.push(m);
            setupModels(model[m], cParentModel);
        }
    }
}

if (config.dbEnabled == true)
{
    mongoose.connect(config.connectionString);
}

module.exports = entities;