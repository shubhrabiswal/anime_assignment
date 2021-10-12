const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    mal_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    rating: {
        type: Number,
        enum: [0,1, 2, 3, 4, 5],
        default:0
    },
    user_review: {
        type: String,
        trim:true
    }
},{ timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
