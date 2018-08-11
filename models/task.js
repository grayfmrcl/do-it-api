const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, `title is required`]
    },
    due_time: { type: Date },
    tags: [{ type: String }],
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: new Date },
    updated_at: { type: Date, default: new Date }
})

taskSchema.pre('save', function(next){
    this.due_time = this.due_time == 'Invalid Date' ? null : this.due_time
    this.updated_at = new Date
    next()
})

module.exports = mongoose.model('Task', taskSchema)