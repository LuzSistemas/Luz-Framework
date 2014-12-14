/**
 * Created by Pedro on 10/12/2014.
 */
var mongoose = require('mongoose');

var mailboxSchema = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addresses: [String],
    pageSize: {
        type: Number
    },
    tags: [{
        title: {
            type: String,
            createdOn: Date
        }
    }],
    mails: [{
        _id: false,
        mail: {type: mongoose.Schema.Types.ObjectId, ref: 'Mail'},
        readOn: Date,
        tags: [String]
    }],
    folders: [{
        title: {
            type: String
        },
        mails: [mongoose.Schema.Types.ObjectId],
        createdOn: Date
    }]
};

module.exports = {
    key: "Mailbox",
    schema: mailboxSchema
};