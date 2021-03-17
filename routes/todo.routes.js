const { Router } = require('express')
const Todo = require('../models/Todo')
const Card = require('../models/Card')
const Project = require('../models/Project')
const User = require('../models/User')
const router = Router()
const uuid = require('uuid')
const auth = require('../middleware/auth.middleware')

const updateCards = async (cards) => {
    const newCards = []

    for (const card of cards) {
        // const { id, columnType, name } = card
        const { id, name } = card
        const data = await Todo.find({ owner: card.id })
        // newCards.push({ id: id, name: name, columnType: columnType, items: [...data] })
        newCards.push({ id: id, name: name, items: [...data] })
    }
    return newCards
}

const getCardIdAndName = (card) => {
    return {
        id: card.id,
        name: card.name
    }
}

const errorResponse = (res, e)=> res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })

const updateCardItem = (items, id, startDate = null, endDate = null, color = null, title = null, priority = null) => {
    return items.map(item => {
        if (item._id.toString() === id) {
            if (startDate && endDate) {
                return { ...item, startDate: startDate, endDate: endDate }
            }
            else if (color) {
                return { ...item, background: color }
            }
            else if (title) {
                return { ...item, content: title }
            }
            else if (priority) {
                return { ...item, priority: priority }
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
            priority: todo.priority,
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
    
        // const { _id, items } = await Card.findOne({ columnType: 'TaskList', project: projectId })
        const card = await Card.findOne({ project: projectId })
        console.log(card)
        if (!card) return res.status(400).json({ message: 'Нельзя создать тудушку без владельца' })
        const allTodos = await Todo.find({ owner: projectId })

        const todo = new Todo({ 
            customId: customId,
            content: content,
            startDate: startDate,
            endDate: endDate,
            owner: projectId,
            background: 'rgba(69, 108, 134, 1)',
            priority: 'Средний',
            creationNumber: allTodos.length + 1
        })
        await Card.updateOne(
            { _id: card._id }, 
            { 
                $push: { 
                    items: {
                        _id: todo._id,
                        customId: customId,
                        content: content,
                        startDate: startDate,
                        endDate: endDate,
                        posNumber: card.items.length,
                        background: 'rgba(69, 108, 134, 1)',
                        priority: 'Средний',
                        creationNumber: todo.creationNumber
                    } 
                }
            })

        await todo.save()

        let todoToFront = {
            _id: todo._id,
            customId: todo.customId,
            content: todo.content,
            startDate: todo.startDate,
            endDate: todo.endDate,
            background: todo.background,
            priority: todo.priority,
            creationNumber: todo.creationNumber,
        }
        return res.status(200).json(todoToFront)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.put('/updateTodo', async (req, res) => {
    try
    {
        const { id, color, title, priority, startDate, endDate } = req.body

        let objToUpdate = {}
        if (startDate && endDate) objToUpdate = { startDate, endDate }
        else if (color) objToUpdate = { background: color } 
        else if (title) objToUpdate = { content: title }
        else if (priority) objToUpdate = { priority: priority }
        else if (startDate && endDate) objToUpdate = { startDate, endDate }

        await Todo.updateOne({ _id: id }, objToUpdate, { upset: false })
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
        if (JSON.stringify(req.body) !== '{}') {
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
        const { id, startDate, endDate, color, title, priority } = req.body
        const [todo] = await Todo.find({ _id: id })
        let currentCardId, currentCardItems

        const [card] = await Card.find(
            {items: {"$elemMatch": { _id: {$eq: id} }}}
            )
        if (!card) {
            // значит последний добавленный!
            const [firstCard] = await Card.find(
                {items: {"$elemMatch": { _id: {$eq: todo._id} }}}
                )
            if (!firstCard) return res.status(400).json({ message: 'У карточки нет владельца' })
            currentCardId = firstCard._id
            currentCardItems = firstCard.items
        } else {
            currentCardId = card._id
            currentCardItems = card.items
        }
        let newItems = []
        if (startDate && endDate) newItems = updateCardItem(currentCardItems, id, startDate, endDate)
        else if (color) newItems = updateCardItem(currentCardItems, id, null, null, color)
        else if (title) newItems = updateCardItem(currentCardItems, id, null, null, null, title)
        else if (priority) newItems = updateCardItem(currentCardItems, id, null, null, null, null, priority)

        await Card.updateOne({ _id: currentCardId }, { items: newItems })
        res.status(200).json({ message: 'Карточки успешно обновлены!' })
    }
    catch (e)
    {
        console.log(e)
        console.log(e.message)
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/createProject', async (req, res) => {
    try
    {
        const { projectName, projectKey, userId } = req.body
        
        const project = new Project({ title: projectName, description: '', key: projectKey, owner: userId, cards: [] })
        await project.save()

        // const tasksCard = new Card({ name: 'Бэклог', columnType: 'TaskList', items: [], project: project.id })
        const tasksCard = new Card({ name: 'Бэклог', items: [], project: project.id })
        await tasksCard.save()

        // const selectedCard = new Card({ name: 'Выбрано для разработки', columnType: 'SelectedList', items: [], project: project.id })
        const selectedCard = new Card({ name: 'Выбрано для разработки', items: [], project: project.id })
        await selectedCard.save()

        // const processingCard = new Card({ name: 'В работе', columnType: 'ProcessingList', items: [], project: project.id })
        const processingCard = new Card({ name: 'В работе', items: [], project: project.id })
        await processingCard.save()

        // const doneCard = new Card({ name: 'Готово', columnType: 'DoneList', items: [], project: project.id })
        const doneCard = new Card({ name: 'Готово', items: [], project: project.id })
        await doneCard.save()

        for (const card of [
            getCardIdAndName(tasksCard),
            getCardIdAndName(selectedCard),
            getCardIdAndName(processingCard),
            getCardIdAndName(doneCard)
        ]) await Project.updateOne({ _id: project.id }, { $push: { cards: card } })

        const currProject = await Project.findOne({ _id: project.id })
        
        
        return res.status(200).json(currProject)
    }
    catch (e)
    {
        errorResponse(res, e)
    }
})

router.post('/createCard', async (req, res) => {
    try
    {
        console.log('/createCard')
        const { name, projectId } = req.body

        const newCard = new Card({ name: name, items: [], project: projectId })
        await newCard.save()
        console.log(newCard)

        await Project.updateOne({ _id: projectId }, { 
            $push: { 
                cards: {
                    id: newCard._id,
                    name: newCard.name,
                } 
            }
        })

        const project = await Project.findOne({ _id: projectId })
        console.log('project', project)

        res.status(200).json({ message: 'Все хорошо!' })
    }
    catch (e)
    {
        errorResponse(res, e)
    }
})

router.delete('/deleteCard', async (req, res) => {
    try
    {
        const { cardId, projectId } = req.body
        await Card.deleteOne({ _id: cardId, project: projectId }) 
        return res.status(200).json({ message: 'Удалено' })
    }
    catch (e)
    {
        errorResponse(res, e)
    }
})

router.put('/updateProjectItems', async (req, res) => {
    try
    {
        const { projectId, items } = req.body
        await Project.updateOne({ _id: projectId }, { cards: items })
        const project = await Project.findOne({ _id: projectId })
        console.log(project)
        return res.status(200).json({ message: 'Успешно обновлен!' })
    }
    catch (e)
    {
        errorResponse(res,)
    }
})

router.get('/getProjects', auth, async (req, res) => {
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

router.get('/getProject', async (req, res) => {
    try
    {
        const projectId = req.headers.project.split(' ')[1]
        const [project] = await Project.find({ _id: projectId })
        return res.status(200).json(project)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router