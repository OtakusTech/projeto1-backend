const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            max: 255
        },
        creator: {
            type: String,
            required: true,
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
                max: 1000
            },
            font: {
                type: String,
                required: true
            }
        },
        tags: {
            type: [{
                tagId: {
                    type: ObjectId,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                folks: {
                    type: [ObjectId]
                }
            }],
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
