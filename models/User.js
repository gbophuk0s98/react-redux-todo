const { Schema, model } = require('mongoose')

const schema = new Schema({
    userName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false }
})

module.exports = model('users', schema)