const { Schema, model } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false }
})

module.exports = model('projects', schema)