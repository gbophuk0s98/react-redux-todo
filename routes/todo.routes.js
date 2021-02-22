const { Router } = require('express')
const Todo = require('../models/Todo')
const Card = require('../models/Card')
const router = Router()

router.get('/todos', async (req, res) => {
    
})

router.post('/createCard', async (req, res) => {
    try
    {
        const { title } = req.body

        const card = new Card({ title: title })
        await card.save()

        res.status(201).json({ message: 'Карточка создана' })
    }
    catch (e)
    {
        res.status(400).json({ message: 'Что-то пошло не так' })
    }
})

router.post('/createTodo', async (req, res) => {
    try
    {
        const { name, id } = req.body

        const todo = new Todo({ name: name, id: id })
        await todo.save()
    }
    catch (e)
    {
        res.status(400).json({ message: 'Что-то пошло не так' })
    }
})


module.exports = router