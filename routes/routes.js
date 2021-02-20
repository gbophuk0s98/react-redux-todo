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

export default router