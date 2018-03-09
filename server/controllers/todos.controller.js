const Todo = require('../models/todos.model');

module.exports = {
    create: (req, res) => {
        Todo.create({
            text: req.body.text,
            due_date: req.body.due_date
        }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to create todo'
                })
            }
            res.status(200).json({
                message: 'Todo created',
                data
            })
        })
    },
    findAll: (req, res) => {
        Todo.find()
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get all data !',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: `Failed to get all data !`
                })
            })
    },
    findById: (req, res) => {
        Todo.findOne({
            _id: req.params.id
        })
            .populate('List', 'title')
            .exec(function (err, data) {
                if (err) return res.status(400).json({ message: err })
                res.status(200).json({
                    message: 'Success get data !',
                    data
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: `Failed to get data !`
                })
            })
    },
    update: (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, {
            text: req.body.text,
            due_date: req.body.due_date
        }, { new: true }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to update todo'
                })
            }
            res.status(200).json({
                message: 'Todo updated',
                data
            })
        })
    },
    destroy: (req, res) => {
        Todo.remove({ _id: req.params.id }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to delete todo'
                })
            }
            res.status(200).json({
                message: 'Todo deleted',
            })
        })
    }
}
