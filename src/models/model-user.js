const mongoose = require('mongoose'),
    { Schema } = mongoose;

const UserSchema = new Schema({
    avatar: {
        type: String,
        default: '/public/images/avatar.jpg',
        required: true
    },
    date: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true },
    facebookId: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
