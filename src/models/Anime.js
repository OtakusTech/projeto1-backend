const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema(
    {
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
            type: String,
            required: true,
        },
        synopsis: {
            text: {
                type: String,
                required: true,
                max: 500
            },
            font: {
                type: String,
                required: true
            }
        },
        tags: {
            type: [String],
            required: false,
        },
        img: {
            type: String,
            required: false,
            max: 500
        }
    },
    { collection: 'animes' }
);

module.exports = mongoose.model('Animes', animeSchema);
