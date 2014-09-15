/**
 * Created by Pedro on 05/09/2014.
 */
var luzUtil = require('../../LuzUtil');
var mongoose = require('mongoose');
var user = require ('./User');
var _ = require('lodash-node')

var modelKey = 'UserGroup;'

/**
 * User schema definition based on Mongoose standards.
 */
var userGroupSchema = {
    title: {type: String, required: true},
    description: {type: String},
    //Hierarchy relationship
    _parentGroupId: { type: mongoose.Schema.Types.ObjectId, ref: modelKey },
    users: [mongoose.Schema.Types.ObjectId],
    permissions: [String],
    deniedPermissions: [String]
};

module.exports =
{
    key: modelKey,
    schema: userGroupSchema
};