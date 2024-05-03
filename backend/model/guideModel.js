const mongoose = require('mongoose')

const guideSchema = mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    age:{
        type: Number,
        required: true
    },

    phone:{
        type: Number,
        required: true
    },

    gender:{
        type: String,
        required: true
    },

    language:{
        type: String,
        required: true
    },

    image: {
        type: String, // Assuming you'll store the image URL as a string
        required: true
    }
    

})

module.exports = mongoose.model('Guide',guideSchema)