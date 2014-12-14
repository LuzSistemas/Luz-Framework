/**
 * Created by Pedro on 10/12/2014.
 */
var mongoose = require('mongoose');

var mailboxSchema = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
        id: mongoose.Schema.Types.ObjectId,
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