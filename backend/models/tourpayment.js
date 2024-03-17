const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    clientId: {
        type: Number,
        required: true
    },
    paymentId: {
        type: Number,
        required: true,
        unique: true,
        default: 0
    },
    totalPayment:{
        type: Number,
        required: true
    },
    discountedPayment:{
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },

})

autoIncrement.initialize(mongoose.connection);
guideSchema.plugin(autoIncrement.plugin, {
    model: 'payments',
    field: 'paymentId',
    startAt: 1,
    incrementBy: 1
});


const payment = mongoose.model("payments", paymentSchema);

module.exports = payment;