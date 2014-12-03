/**
 * Created by Pedro on 27/11/2014.
 */
var azure = require('azure-storage');
var strings = require("../../commonStrings");
var luzUtil = require("../../LuzUtil");
var config = require("../../config");
var guid = require("easy-guid");
var _ = require("lodash");
var mailProcessController = {
    get: {
        auth: luzUtil.allowAnonymous,
        action: function(req, res)
        {
            try
            {
                var blobService = azure.createBlobService(config.mail.azureStorageAccount, config.mail.azureStorageKey);
                blobService.listBlobsSegmented("mails", null, function(err, result){
                    if (!err)
                    {
                        _.each(result.entries, function(e)
                        {
                            blobService.getBlobToText("mails", e.name, function(err, result){
                                if (!err)
                                {
                                    var mail = JSON.parse(result);
                                    if (mail.to)
                                    {
                                        var mailResult = luzUtil.handleIncomingSendGridMail(e.name, mail);
                                        if (mailResult == true){
                                            res.status(200);
                                            res.send("OK");
                                        }
                                        else{
                                            res.status(500);
                                            res.send(mailResult);
                                        }
                                        return;
                                    }
                                }
                            })
                        });
                    }
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
    controller: mailProcessController
};