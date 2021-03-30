const express = require('express')
const app = express()
var validator = require('validator');

const fs = require('fs')



app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.render('home')
})

//PASTE CREATE HERE
const create = require('./routes/create.js')
app.use('/create', create)

app.get('/todos', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        
        const todos = JSON.parse(data)
        res.render('todos', {todos: todos})
    })
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        
        const todos = JSON.parse(data)
        const todo = todos.filter(todo => todo.id == id)[0]
        res.render('todo', {todo: todo})
    })
})

app.get('/api/v1/todos', (req, res) => {
    fs.readFile('./data/todos.json', (err, data) => {
        if (err) throw err
        
        const todos = JSON.parse(data)
        res.json(todos)
    })
})

app.listen(8000,  err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})


