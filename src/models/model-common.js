const mongoose = require('mongoose'),
    { Schema } = mongoose;

const CommonSchema = new Schema({
    name: { type: String, default: 'main' },
    colors: {
        monday: { type: String },
        tuesday: { type: String },
        wednesday: { type: String },
        thursday: { type: String },
        friday: { type: String },
        saturday: { type: String },
        sunday: { type: String }
    },
    one: { type: String },
    two: { type: String },
    three: { type: String },
    four: { type: String },
    five: { type: String },
    six: { type: String },
    seven: { type: String },
    eight: { type: String },
    nine: { type: String },
    ten: { type: String }
});

module.exports = mongoose.model('Common', CommonSchema);
