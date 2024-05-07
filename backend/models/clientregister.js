const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
// add details
const clientSchema = new Schema({
    clientId: {
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
    address: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,// Store the phoneNo  here
        required: true
    },
    qrCode: {
        type: String // Store the QR code string here
    }
});

autoIncrement.initialize(mongoose.connection);
clientSchema.plugin(autoIncrement.plugin, {
    model: 'clients',
    field: 'clientId',
    startAt: 1,
    incrementBy: 1
});


const client = mongoose.model("clients", clientSchema);

module.exports = client;
