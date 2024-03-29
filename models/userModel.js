const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   email: {
     type: String,
     required: true
   },
   password: {
    type: String,
    required: true
   },
   messages: [{
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
   }]
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
