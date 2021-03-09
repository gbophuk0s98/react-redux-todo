const { Router } = require('express')
const Todo = require('../models/Todo')
const Card = require('../models/Card')
const Project = require('../models/Project')
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

router.post('/createTodo', async (req, res) => {
    try
    {
        const projectId = req.headers.project.split(' ')[1]

        const { content, startDate, endDate } = req.body
        const customId = uuid.v4()
    
        const { _id, items } = await Card.findOne({ columnType: 'TaskList', project: projectId })

        await Card.updateOne(
            { _id: _id }, 
            { 
                $push: { 
                    items: { customId: customId, content: content, startDate: startDate, endDate: endDate, posNumber: items.length } 
                }
            })

        const todo = new Todo({ customId: customId, content: content, startDate: startDate, endDate: endDate, owner: projectId })
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

router.post('/createProject', async (req, res) => {
    try
    {
        const { projectName, projectKey, userId } = req.body
        
        const project = new Project({ title: projectName, description: '', key: projectKey, owner: userId })
        await project.save()

        const tasksCard = new Card({ name: 'Задачи', columnType: 'TaskList', items: [], project: project.id })
        await tasksCard.save()

        const selectedCard = new Card({ name: 'Выбрано для разработки', columnType: 'SelectedList', items: [], project: project.id })
        await selectedCard.save()

        const processingCard = new Card({ name: 'Выполняется', columnType: 'ProcessingList', items: [], project: project.id })
        await processingCard.save()

        const doneCard = new Card({ name: 'Выполнено', columnType: 'DoneList', items: [], project: project.id })
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
        return res.status(200).json(projects)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router