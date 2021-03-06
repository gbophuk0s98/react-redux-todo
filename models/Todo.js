const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    customId: { type: String, required: true },
    description: { type: String, required: false },
    content: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'projects' },
    creator: { type: Types.ObjectId, ref: 'users' },
    background: { type: String, required: false, default: 'rgba(27, 42, 53, 1)' },
    creationNumber: { type: String, required: true },
    priority: { type: String, required: false },
})

module.exports = model('todos', schema)