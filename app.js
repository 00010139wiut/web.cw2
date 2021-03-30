const express = require('express')
const app = express()

const fs = require('fs')


app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const title = req.body.title
    const body = req.body.body

    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err

        const todos = JSON.parse(data)

        todos.push({
            id: id(),
            title: title,
            body: body,
        })

        fs.writeFile('./data/todos.json', JSON.stringify(todos), err => {
         if (err) throw err
         res.redirect('/create')
        })
    })
})

app.listen(8000,  err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})


function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
};