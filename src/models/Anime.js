const mongoose = require('mongoose');
const User = require('./User');
 
const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    creator: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    year: {
        type: Number,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
        max: 500
    },
    tags: {
        type: [String],
        required: false,
    },
    img: {
        type: String,
        required: false,
        max: 500
    },
    user: {
        type: User,
        required: true
    },  
    {collections: 'animes'}

});
 
module.exports = mongoose.model('Anime', animeSchema);