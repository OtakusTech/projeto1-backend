const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        date: {type: Date, default: Date.now},
        name: {type: String, required: true, min: 6, max: 255},
        email: {type: String, required: true, max: 255, min: 6},
        password: {type: String, required: true, max: 1024, min: 6},
        img: { type: String, required: false, max: 500}
    },
    {collection: 'users'}
);

//UserSchema.index({slug: 1, userid:1}, {unique: true});
module.exports = mongoose.model('User', UserSchema);