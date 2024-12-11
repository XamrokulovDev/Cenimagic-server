const mongoose = require("mongoose");

const movies = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    video: {
        type:String,
    },
    status: {
        type: String,
        default: false
    },
    episodes: {
        episode_number: {
            type: String,
        },
        episode_url: {
            type:String,
        }
    },
},{
    timestamps:true,
});

module.exports = mongoose.model("Movies", movies);