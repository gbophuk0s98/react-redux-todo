const { Router } = require('express')
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