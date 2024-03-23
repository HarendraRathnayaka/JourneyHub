const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const tourSchema = new Schema({

    tourId: {
        type: Number,
        required: true
    },
    tourName: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    pricePerPerson: {
        type: Number,
        required: true
    },

     
})

autoIncrement.initialize(mongoose.connection);
tourSchema.plugin(autoIncrement.plugin, {
    model: 'tours',
    field: 'tourId',
    startAt: 1,
    incrementBy: 1
});

const tour = mongoose.model("tours", tourSchema);

module.exports = tour;