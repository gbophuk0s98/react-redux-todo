const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true},
    columnType: { type: String, required: true },
    items: { type: Array, required: false }
})

module.exports =  model('cards', schema)