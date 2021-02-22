const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    todoOwner: { type: Types.ObjectId, ref: 'cards' },
})

module.exports = model('todos', schema)