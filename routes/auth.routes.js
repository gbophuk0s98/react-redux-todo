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
        secretKey,
        { expiresIn: '23h' },
    )
}

const loginFormValidator = [
    check('userName').exists().withMessage('Имя не может быть пустым'),
    check('email').isEmail().withMessage('Некорректный email'),
    check('password').isLength({ min: 3 }).withMessage('Пароль должен содержать минимум 3 символов')
]

router.post('/login', loginFormValidator, async (req, res) => {
    try
    {
        const errors = validationResult(req.body)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), message: 'Проверьте правильность вводимых данных!'})

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: 'Пользователь не найден!' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Неверный пароль!' })        
        
        const secretKey = Date.now().toString()
        await User.updateOne({ email: user.email }, { token: generateToken(user.id, secretKey), secretKey: secretKey })

        const userToFront = await User.findOne({ _id: user.id })

        res.status(200).json({
            id: userToFront.id, userName: userToFront.userName, email: userToFront.email, token: userToFront.token
        })
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
        if (candidate) return res.status(400).json({ message: 'Такой пользователь уже существует!' })

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const secretKey = Date.now().toString()
        const user = new User({ userName, email, password: hashedPassword, secretKey: secretKey })
        await user.save()

        await User.updateOne({ email: user.email }, { token: generateToken(user.id, secretKey) })

        const userToFront = await User.findOne({ _id: user.id })

        return res.status(200).json({
            id: userToFront.id, userName: userToFront.userName, email: userToFront.email, token: userToFront.token
        })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router