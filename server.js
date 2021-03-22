const express = require('express')
const mongo = require('mongoose')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080

app.use(express.json({ extended: true }))

app.use('/api/auth/', require('./routes/auth.routes'))
app.use('/api/todo/', require('./routes/todo.routes'))

if (process.env.NODE_ENV == 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, async () => {
    try
    {
        //mongodb+srv://surta:123@cluster0.nqkum.mongodb.net/todo?retryWrites=true&w=majority
        //mongodb://127.0.0.1:27017/todo
        await mongo.connect('mongodb+srv://surta:123@cluster0.nqkum.mongodb.net/todo?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(`Сервер работает на порту ${PORT}`))
    }
    catch (e) 
    {
        console.log(e)
    }
})