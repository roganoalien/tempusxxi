const mongoose = require('mongoose'),
    { Schema } = mongoose;

const CommonSchema = new Schema({
    colors: { type: Array, required: true },
    1: { type: String, required: true },
    2: { type: String, required: true },
    3: { type: String, required: true },
    4: { type: String, required: true },
    5: { type: String, required: true },
    6: { type: String, required: true },
    7: { type: String, required: true },
    8: { type: String, required: true },
    9: { type: String, required: true },
    10: { type: String, required: true }
});

module.exports = mongoose.model('Common', CommonSchema);
