// import { Schema, model, Types } from 'mongoose'

// const schema = new Schema({
//     customId: { type: String, required: true },
//     content: { type: String, required: true },
//     startDate: { type: String, required: true },
//     endDate: { type: String, required: true },
//     owner: { type: Types.ObjectId, ref: 'cards' },
// })

// export default model('todos', schema)

const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    customId: { type: String, required: true },
    content: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'projects' },
})

module.exports = model('todos', schema)