const { Router } = require('express')
const uuid = require('uuid')
const User = require('../models/User')
const Card = require('../models/Card')
const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const router = Router()

const generateToken = (userId, secretKey) => {
    return jwt.sign(
        { userId: userId },
        'gbophuk0s98' + secretKey,
        { expiresIn: '23h' },
    )
}

const updateCards = async (cards) => {

    const newCards = []

    for (const card of cards) {
        const { id, columnType, name } = card
        const data = await Todo.find({ owner: card.id })
        newCards.push({ id: id, name: name, columnType: columnType, items: [...data] })
    }
    return newCards
}

const loginFormValidator = [
    check('userName').exists().withMessage('Имя не может быть пустым'),
    check('email').isEmail().withMessage('Некорректный email'),
    check('password').isLength({ min: 3 }).withMessage('Пароль должен содержать минимум 3 символов')
]

router.post('/login', loginFormValidator, async (req, res) => {
    try
    {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(200).json({ errors: errors.array(), message: 'Проверьте правильность вводимых данных!'})

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(200).json({ message: 'Пользователь не найден!' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(200).json({ message: 'Неверный пароль!' })

        console.log(req.body)
        
        console.log('login')
        res.status(200).json({ message: 'login !!!!!!' })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/register', async (req, res) => {
    try
    {
        const { userName, email, password } = req.body

        const candidate = await User.findOne({ email })
        if (candidate) return res.status(200).json({ message: 'Такой пользователь уже существует!' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ userName, email, password: hashedPassword })
        await user.save()

        return res.status(200).json(user)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

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