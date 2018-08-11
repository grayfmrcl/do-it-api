const router = require('express').Router()

const { 
    getTasks, 
    addTask, 
    updateTask, 
    deleteTask,
    completeTask,
    uncompleteTask 
} = require('../controllers/task_controller')

router.get('/', getTasks)
router.post('/', addTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)
router.patch('/:id/complete', completeTask)
router.patch('/:id/uncomplete', uncompleteTask)

module.exports = router