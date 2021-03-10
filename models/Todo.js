const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    customId: { type: String, required: true },
    content: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'projects' },
    background: { type: String, required: false, default: '' }
})

module.exports = model('todos', schema)