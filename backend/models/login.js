const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({
// add email and password
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
     
})

const login = mongoose.model("logins", loginSchema); //customer - DB table name

module.exports = login;
