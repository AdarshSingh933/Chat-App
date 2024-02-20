const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    messages: [{
        text: {
            type: String,
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Assuming you have a User model
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const chatModel = mongoose.model('Chat', chatSchema);

module.exports = chatModel;


