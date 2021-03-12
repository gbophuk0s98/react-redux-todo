const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS')
        return next()

    try
    {
        console.log('HELLO')
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
    }
    catch (e) 
    {
        return res.status(401).json({ message: e.message })
    }
}