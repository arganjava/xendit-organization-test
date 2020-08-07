//Require Mongoose
const mongoose = require('mongoose');
const MemberModel = require('./member')
//Define a schema
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: String,
    members: [mongoose.modelSchemas['member']]
});

const OrganizationModel = mongoose.model('organization', OrganizationSchema);

module.exports = OrganizationModel;