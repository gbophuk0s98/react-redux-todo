const express = require('express')
const mongo = require('mongoose')
const app = express()
const PORT = 8080

app.use(express.json({ extended: true }))
app.use('/api/auth/', require('./routes/auth.routes'))
app.use('/api/todo/', require('./routes/todo.routes'))

app.listen(PORT, async () => {
    try
    {
        await mongo.connect('mongodb://127.0.0.1:27017/todo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(`Сервер работает на порту ${PORT}`))
    }
    catch (e) 
    {
        console.log(e)
    }
})