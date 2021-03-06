const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    key: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'users' },
    cards: { type: Array, required: false },
    participants: { type: Array, required: false }
})

module.exports = model('projects', schema)