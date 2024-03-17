const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paySchema = new Schema({

    clientId: {
        type: Number,
        required: true
    },
    totalYet: {
        type: String,
        required: true
    },
     
})

const pay = mongoose.model("pays", paySchema);

module.exports = pay;