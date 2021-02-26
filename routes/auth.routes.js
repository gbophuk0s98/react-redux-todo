const { Router } = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = Router()

router.post('/login', async (req, res) => {
    try
    {
        console.log('login')
        res.status(200).json({ message: 'login !!!!!!' })
    }
    catch (e)
    {

    }
})

router.post('/register', async (req, res) => {
    try
    {
        const { userName, email, password } = req.body

        const candidate = await User.findOne({ email })
        if (candidate) return res.json({ message: 'Такой пользователь уже существует!' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ userName, email, password: hashedPassword })
        await user.save()

        return res.status(200).json(user)
    }
    catch (e)
    {

    }
})


module.exports = router