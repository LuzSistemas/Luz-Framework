/**
 * Created by Pedro on 02/12/2014.
 */
var mongoose = require('mongoose');

var mailSchema = {
    key: {type: String, required: true},
    to: [String],
    from: {type: String, required: true},
    subject: {type: String},
    spam_score: {type: Number},
    attachments:[{
        key: {type: String, required: true},
        filename: {type: String},
        mimeType: {type: String},
        size: {type: Number}
    }],
    date: {type: Date, required: true}
};

module.exports = {
    key: "Mail",
    schema: mailSchema
};