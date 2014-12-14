/* GET home page. */
var entidadesBig = require('../../models');
var util = require('util');
var fs = require('fs');
var uuid = require('node-uuid');


var indexController = {
    get: {
        auth: luzUtil.allowAnonymous,
        action: function(req, res) {
            var outputFilename = './GET-' + uuid.v1() + ".json";
            var myData = util.inspect(req.query, { showHidden: true, depth: 3 });
            fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to " + outputFilename);
                }
            });
            res.send(200);
        }
    },
    post: {
        auth: luzUtil.allowAnonymous,
        action: function(req, res) {
            var outputFilename = './GET-' + uuid.v1() + ".json";
            var myData = util.inspect(req.body, { showHidden: true, depth: 3 });
            fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to " + outputFilename);
                }
            });
            res.send(200);

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