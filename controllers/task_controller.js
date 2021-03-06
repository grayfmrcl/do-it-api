const Task = require('../models/task')

const getTasks = (req, res, next) => {
    Task
        .find({ user_id: req.user.id })
        .then(tasks => res.status(200).json(tasks))
        .catch(err => next(err))
}

const addTask = (req, res, next) => {
    Task
        .create({
            user_id: req.user.id,
            title: req.body.title,
            due_time: req.body.due_time,
            tags: req.body.tags
        })
        .then(task => res.status(201).json(task))
        .catch(err => next(err))
}

const updateTask = (req, res, next) => {
    console.log('user_id', req.user.id)
    console.log('task_id', req.params.id)
    Task
        .findOne({
            user_id: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            if (task) {
                task.title = req.body.title || task.title
                task.due_time = new Date(req.body.due_time)
                task.tags = req.body.tags || task.tags
                task.save()
                    .then(task => res.status(200).json(task))
                    .catch(err => console.log(err))
            }
            else
                next()
        })
        .catch(err => next(err))
}

const deleteTask = (req, res, next) => {
    Task
        .findOneAndRemove({
            user_id: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            if (task)
                res.status(200).json(task)
            else
                next()
        })
        .catch(err => next(err))
}

const completeTask = (req, res, next) => {
    Task
        .findOne({
            user_id: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            if (task) {
                task.completed = true
                task.save()
                    .then(task => res.status(200).json(task))
                    .catch(err => next(err))
            }
            else
                next()
        })
        .catch(err => next(err))
}

const uncompleteTask = (req, res, next) => {
    Task
        .findOne({
            user_id: req.user.id,
            _id: req.params.id
        })
        .then(task => {
            if (task) {
                task.completed = false
                task.save()
                    .then(task => res.status(200).json(task))
                    .catch(err => console.log(err))
            }
            else
                next()
        })
        .catch(err => next(err))
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    uncompleteTask
}