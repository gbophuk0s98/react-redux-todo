const { Router } = require('express')
const User = require('../models/User')
const router = Router()

router.get('/register', async (req, res) => {
    try
    {
        res.send('Hello')
    }
    catch (e)
    {

    }
})

module.exports = router