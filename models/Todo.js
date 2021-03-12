const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    customId: { type: String, required: true },
    content: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'projects' },
    background: { type: String, required: false, default: 'rgba(27, 42, 53, 1)' },
    creationNumber: { type: String, required: true },
    priority: { type: String, required: false },
})

module.exports = model('todos', schema)