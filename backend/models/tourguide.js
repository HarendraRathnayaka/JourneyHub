const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const guideSchema = new Schema({

    guideNo: {
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

})

autoIncrement.initialize(mongoose.connection);
guideSchema.plugin(autoIncrement.plugin, {
    model: 'guides',
    field: 'guideNo',
    startAt: 1,
    incrementBy: 1
});


const guide = mongoose.model("guides", guideSchema);

module.exports = guide;