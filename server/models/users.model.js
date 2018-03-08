const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    facebook_id:String,
    list:[{
        type: Schema.Type.ObjectId,
        ref:'List'
    }],
});

module.exports = mongoose.model('User', userSchema);