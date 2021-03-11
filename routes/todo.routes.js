const { Router } = require('express')
const Todo = require('../models/Todo')
const Card = require('../models/Card')
const Project = require('../models/Project')
const User = require('../models/User')
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

const updateCardItem = (items, id, color = null, title = null) => {
    return items.map(item => {
        if (item._id === id) {
            if (color) {
                return { ...item, background: color }
            }
            if (title) {
                return { ...item, content: title }
            }
        }
        return item
    })
}

router.get('/getTodos', async (req, res) => {
    try
    {
        const projectId = req.headers.project.split(' ')[1]
        const todos = await Todo.find({ owner: projectId })
        return res.status(200).json(todos)

    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.get('/getTodo', async (req, res) => {
    try
    {
        const id = req.headers.todo.split(' ')[1]
        const [todo] = await Todo.find({ _id: id })
        const project = await Project.findOne({ _id: todo.owner })
        const user = await User.findOne({ _id: project.owner })
        const todoToFront = {
            _id: todo._id,
            content: todo.content,
            startDate: todo.startDate,
            endDate: todo.endDate,
            owner: user.userName,
            ownerEmail: user.email,
            background: todo.background,
         }
        return res.status(200).json(todoToFront)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/createTodo', async (req, res) => {
    try
    {
        const projectId = req.headers.project.split(' ')[1]

        const { content, startDate, endDate } = req.body
        const customId = uuid.v4()
    
        const { _id, items } = await Card.findOne({ columnType: 'TaskList', project: projectId })

        const todo = new Todo({ customId: customId, content: content, startDate: startDate, endDate: endDate, owner: projectId, background: 'rgba(69, 108, 134, 1)'})
        await todo.save()

        await Card.updateOne(
            { _id: _id }, 
            { 
                $push: { 
                    items: { _id: todo._id, customId: customId, content: content, startDate: startDate, endDate: endDate, posNumber: items.length, background: 'rgba(69, 108, 134, 1)' } 
                }
            })

        

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
        const { todoId, startDate, endDate } = req.body

        await Todo.updateOne({ _id: todoId }, { startDate, endDate }, { upset: false })
        return res.status(200).json({ message: 'Задача обновлена!'})
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.put('/updateTodoColor', async (req, res) => {
    try
    {
        const { id, color } = req.body
        await Todo.updateOne({ _id: id }, { background: color }, { upset: false })
        return res.status(200).json({ message: 'Задача обновлена!'})
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.put('/updateTodoTitle', async (req, res) => {
    try
    {
        const { id, title } = req.body
        await Todo.updateOne({ _id: id }, { content: title }, { upset: false })
        return res.status(200).json({ message: 'Задача обновлена!'})
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.get('/getCards', async (req, res) => {
    try
    {
        const projectId = req.headers.project.split(' ')[1]
        const cards = await Card.find({ project: projectId })
        const newCards = await updateCards(cards)
        return res.status(200).json(cards)
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

router.put('/updateCards', async (req, res) => {
    try
    {
        const { id, color, title } = req.body
        const [{ _id, items }] = await Card.find(
            {items: {"$elemMatch": {_id: id}}}
            )
        let newItems = []
        if (title) {
            newItems = updateCardItem(items, id, null, title)
        }
        else if (color) {
            newItems = updateCardItem(items, id, color, null)
        }
        await Card.updateOne({ _id: _id }, { items: newItems }, { upsert: true })
        res.status(200).json({ message: 'Карточки успешно обновлены!' })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/createProject', async (req, res) => {
    try
    {
        const { projectName, projectKey, userId } = req.body
        
        const project = new Project({ title: projectName, description: '', key: projectKey, owner: userId })
        await project.save()

        const tasksCard = new Card({ name: 'Бэклог', columnType: 'TaskList', items: [], project: project.id })
        await tasksCard.save()

        const selectedCard = new Card({ name: 'Выбрано для разработки', columnType: 'SelectedList', items: [], project: project.id })
        await selectedCard.save()

        const processingCard = new Card({ name: 'В работе', columnType: 'ProcessingList', items: [], project: project.id })
        await processingCard.save()

        const doneCard = new Card({ name: 'Готово', columnType: 'DoneList', items: [], project: project.id })
        await doneCard.save()
        
        return res.status(200).json(project)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.get('/getProjects', async (req, res) => {
    try
    {
        const userId = req.headers.user.split(' ')[1]
        const projects = await Project.find({ owner: userId })
        const [{ userName }] = await User.find({ _id: userId })
        const newProjects = projects.map(project => {
            return { _id: project._id, title: project.title, description: project.description, key: project.key, owner: userName }
        })
        return res.status(200).json(newProjects)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router