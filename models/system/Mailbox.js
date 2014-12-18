/**
 * Created by Pedro on 10/12/2014.
 */
var mongoose = require('mongoose');


var folderSchema = {
    title: {
        type: String,
        required: true
    },
    mails: [{
        _id: false,
        mail: {type: mongoose.Schema.Types.ObjectId, ref: 'Mail'},
        readOn: Date,
        tags: [String]
    }],
    createdOn: {
        type: Date
    }
};

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
    folders: [folderSchema]
};

module.exports = {
    key: "Mailbox",
    schema: mailboxSchema
};