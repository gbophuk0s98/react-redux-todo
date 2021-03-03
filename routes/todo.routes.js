const { Router } = require('express')
const Todo = require('../models/Todo')
const Card = require('../models/Card')
const router = Router()
const uuid = require('uuid')

const updateCards = async (cards) => {

    const newCards = []

    for (const card of cards) {
        const { id, columnType, name } = card
        const data = await Todo.find({ owner: card.id })
        newCards.push({ id: id, name: name, columnType: columnType, items: [...data] })
    }
    return newCards
}

router.get('/getCards', async (req, res) => {
    try
    {
        const cards = await Card.find()
        const newCards = await updateCards(cards)
        return res.status(200).json(cards)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })   
    }
})

router.get('/getTodos', async (req, res) => {
    try
    {
        const todos = await Todo.find()
        return res.status(200).json(todos)

    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/createTodo', async (req, res) => {
    try
    {
        const { content, startDate, endDate } = req.body
        const { _id, items } = await Card.findOne({ columnType: 'TaskList'})
        const customId = uuid.v4()
        await Card.updateOne({ columnType: 'TaskList' }, { $push: {items : { customId: customId, content: content, startDate: startDate, endDate: endDate, posNumber: items.length} }})
        const todo = new Todo({ customId: customId, content: content, startDate: startDate, endDate: endDate, owner: _id })
        await todo.save()
        return res.status(200).json({ message: 'Успешно создана!'})
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.put('/updateTodo', async (req, res) => {
    try
    {
        let updateItem = {}
        
        if (req.body.hasOwnProperty('startDate')) updateItem = { startDate: req.body.startDate}
        else if (req.body.hasOwnProperty('endDate')) updateItem = { endDate: req.body.endDate }

        await Todo.updateOne({ _id: req.body.id }, updateItem, { upset: false })
        return res.status(200).json({ message: 'Задача обновлена!'})
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/saveCards', async (req, res) => {
    try
    {
        if (req.body) {
            for (const key in req.body) {
                await Card.updateOne({ _id: req.body[key]._id }, { items: req.body[key].items })
            }
        }

        return res.status(200).json({ message: 'Успешно обновлены!' })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router