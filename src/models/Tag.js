const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        tag: {
            type: String,
            required: true,
            max: 20
        },
        user: {
            type: mongoose.ObjectId,
            required: false
        }
    },
    {collection: 'tags'}
);

module.exports = mongoose.model('Tags', tagSchema);