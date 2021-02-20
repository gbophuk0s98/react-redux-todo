const express = require('express')
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth/', require('./routes/routes'))

app.listen(8080, () => {
    console.log('server')
})