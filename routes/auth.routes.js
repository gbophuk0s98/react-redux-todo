const { Router } = require('express')
const User = require('../models/User')
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
        console.log('regiter')
        res.status(200).json({ message: 'register !!!!!!' })
    }
    catch (e)
    {

    }
})


module.exports = router