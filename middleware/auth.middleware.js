const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (userId, secretKey) => {
    return jwt.sign(
        { userId: userId },
        secretKey,
        { expiresIn: '23h' },
    )
}

module.exports = async (req, res, next) => {

    if (req.method === 'OPTIONS')
        return next()

    try
    {
        const newSecretKey = Date.now().toString()
        const userId = req.headers.user.split(' ')[1]
        const token = req.headers.authorization.split(' ')[1]
        const [{ secretKey }] = await User.find({ _id: userId })
        // jwt.verify(token, secretKey, (err, payload) => {
        //     if (err) next()
        //     else if(payload) next()
        // })
        next()
    }
    catch (e) 
    {
        return res.status(401).json({ message: e.message })
    }
}