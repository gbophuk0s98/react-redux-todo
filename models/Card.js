const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true},
    columnType: { type: String, required: true },
    items: { type: Array, required: false },
    project: { type: Types.ObjectId, ref: 'projects'},
})

module.exports =  model('cards', schema)