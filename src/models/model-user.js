const mongoose = require('mongoose'),
    { Schema } = mongoose;

const UserSchema = new Schema({
    avatar: {
        type: String,
        default: '/public/images/avatar.jpg',
        required: true
    },
    birthday: { type: Date },
    color: { type: Number },
    day_of_birth: { type: String },
    date: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true },
    facebookId: { type: String, required: true },
    facebookUser: { type: String, required: true },
    name: { type: String, required: true },
    sum: { type: Number },
    total_answered: { type: Number }
});

module.exports = mongoose.model('User', UserSchema);
