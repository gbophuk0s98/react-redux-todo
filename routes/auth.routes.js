const { Router, response } = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const { check, validationResult } = require('express-validator')
const CLIENT_ID = "279291504148-ocdee30nc0f7hpu6bbtftof75qhgn0gi.apps.googleusercontent.com"
const SECRET_KEY = "SOME SECRET KEY"

const router = Router()
const client = new OAuth2Client(CLIENT_ID)

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
    try {
        const errors = validationResult(req.body)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Проверьте правильность вводимых данных!' });
        }

        const { email, password } = req.body
        console.log("req.body", req.body)

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
    catch (e) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/register', async (req, res) => {
    try {
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
    catch (e) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.post('/googleLogin', async (req, res) => {
    try {
        const { tokenId } = req.body
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: CLIENT_ID
        })
        const { email_verified, email, name } = ticket.getPayload()

        if (email_verified) {

            const candidate = await User.findOne({ email: email })
            const secretKey = Date.now().toString()

            if (candidate) {
                await User.updateOne({ email: email }, { token: generateToken(candidate.id, secretKey), secretKey: secretKey })

                return res.status(200).json({
                    id: candidate.id, userName: candidate.userName, email: candidate.email, token: candidate.token
                })
            }
            const password = await bcrypt.hash(email, 10)

            const user = new User({ userName: name, email: email, password: password, secretKey: secretKey })
            await user.save()

            await User.updateOne({ email: user.email }, { token: generateToken(user.id, secretKey) })

            const userToFront = await User.findOne({ _id: user.id })

            return res.status(200).json({
                id: userToFront.id, userName: userToFront.userName, email: userToFront.email, token: userToFront.token
            })
        }

        throw new Error({ message: 'Что-то пошло не так! Попробуйте снова.' })
    }
    catch (e) {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router