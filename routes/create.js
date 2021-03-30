const express = require('express')
const router = express.Router()
var validator = require('validator')
const fs = require('fs')

router.route('/')
.get((req, res) => {
    res.render('create')
})
.post((req, res) => {
    const title = req.body.title
    const body = req.body.body

    let validate = validator.isEmpty(title);
    if (validate) {
        res.render('create', {error: "All areas should be filled"})
    }
    else {
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
         res.render('create', {success: "Success"})
        })
    })
    }
})

function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = router