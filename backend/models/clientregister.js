const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

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
        type: Number,
        required: true
    },

})

autoIncrement.initialize(mongoose.connection);
guideSchema.plugin(autoIncrement.plugin, {
    model: 'clients',
    field: 'clientId',
    startAt: 1,
    incrementBy: 1
});


const client = mongoose.model("clients", clientSchema);

module.exports = client;