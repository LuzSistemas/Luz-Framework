/**
 * Created by Pedro on 27/11/2014.
 */
var azure = require('azure-storage');
var strings = require("../../../commonStrings");
var luzUtil = require("../../../LuzUtil");
var config = require("../../../config");
var guid = require("easy-guid");
var mailIncomingController = {
    post: {
        auth: luzUtil.allowAnonymous,
        action: function(req, res)
        {
            try
            {
                var blobService = azure.createBlobService(config.mail.azureStorageAccount, config.mail.azureStorageKey);
                blobService.createContainerIfNotExists('mails', function(error, result, response){
                    blobService.createBlockBlobFromText('mails', guid.new(16) + ".json", JSON.stringify(req.body), function(e, resu, resp){
                        if (!e){
                            res.status(200);
                            res.send("OK");
                            return;
                        }
                        res.status(500);
                        res.send(e);
                        return;
                    });
                });
            }
            catch (ex)
            {
                res.status(500);
                res.send(ex);
                return;
            }
        }
    }
};

module.exports = {
    controller: mailIncomingController
};