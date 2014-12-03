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
        filename: {type: String},
        type: {type: String}
    }],
    date: {type: Date, required: true}
};

module.exports = {
    key: "Mail",
    schema: mailSchema
};