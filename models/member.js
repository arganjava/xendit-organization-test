//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: String,
    avatarUrl: String,
    totalFollower : Number,
    totalFollowerTo : Number
});

const MemberModel = mongoose.model('member', MemberSchema );

module.exports = MemberModel;