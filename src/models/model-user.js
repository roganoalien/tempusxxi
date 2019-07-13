const mongoose = require('mongoose'),
    { Schema } = mongoose;

const UserSchema = new Schema({
    avatar: {
        type: String,
        default: '/public/images/avatar.jpg',
        required: true
    },
    birthday: { type: String },
    color: { type: Number },
    date: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true },
    facebookId: { type: String, required: true },
    gender: { type: String },
    location: { type: String },
    name: { type: String, required: true },
    sum: { type: Number }
});

module.exports = mongoose.model('User', UserSchema);
