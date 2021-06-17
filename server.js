const express = require('express')
const mongo = require('mongoose')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080
const LOCAL_DB = 'mongodb://127.0.0.1:27017/todo'
const REMOTE_DB = 'mongodb+srv://surta:123@cluster0.nqkum.mongodb.net/todo?retryWrites=true&w=majority'

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
        await mongo.connect(REMOTE_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log(`The server is running on port ${PORT}`))
    }
    catch (e) 
    {
        console.log(e.message)
    }
})