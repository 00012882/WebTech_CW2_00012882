const path = require('path')
const express = require('express')
const app = express()
const PORT = 12000

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/wines', require('./routes/wines'))

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' })
})

app.get('/countries', (req, res) => {
    res.render('countries', { title: 'countries' })
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${ PORT }`)
})