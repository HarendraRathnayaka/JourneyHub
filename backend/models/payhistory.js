const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    clientId: {
        type: Number,
        required: true
    },
    totalYet: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    }
     
})

const payment = mongoose.model("payments", paymentSchema);

module.exports = payment;