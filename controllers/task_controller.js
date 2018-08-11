const Task = require('../models/task')

const getTasks = (req, res) => {
    Task.find()
        .then(tasks => res.status(200).json(tasks))
        .catch(err => console.log(err))
}

const addTask = (req, res) => {

    Task.create({
        title: req.body.title,
        due_time: req.body.due_time,
        tags: req.body.tags
    })
        .then(task => res.status(201).json(task))
        .catch(err => {
            res.status(400)
                .json(Object.values(err.errors).map(e => e.message))
        })
}

const updateTask = (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (task) {
                task.title = req.body.title || task.title
                task.due_time = new Date(req.body.due_time) == 'Invalid Date' ? new Date : new Date(req.body.due_time)
                task.tags = req.body.tags || task.tags
                task.save()
                    .then(task => res.status(200).json(task))
                    .catch(err => console.log(err))
            }
            else
                res.status(204).json()
        })
        .catch(err => console.log(err))
}

const deleteTask = (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then(task => {
            if (task)
                res.status(200).json(task)
            else
                res.status(204).json()
        })
        .catch(err => console.log(err))
}

const completeTask = (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (task) {
                task.completed = true
                task.save()
                    .then(task => res.status(200).json(task))
                    .catch(err => console.log(err))
            }
            else
                res.status(204).json()
        })
        .catch(err => console.log(err))    
}

const uncompleteTask = (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (task) {
                task.completed = false
                task.save()
                    .then(task => res.status(200).json(task))
                    .catch(err => console.log(err))
            }
            else
                res.status(204).json()
        })
        .catch(err => console.log(err))
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    uncompleteTask
}