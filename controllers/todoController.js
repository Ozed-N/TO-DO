const asyncHandler = require('express-async-handler');

const Todo = require('../models/todoModel');
const User = require('../models/userModel');
//@description   GET Todo
//@route         GET /api/todo
//@access         PRIVATE
const getTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.find({ user: req.user.id })
    res.status(200).json(todo)
});

//@description   SET Todo
//@route         POST /api/todo
//@access         PRIVATE
const setTodo = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const todo = await Todo.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(todo)

});


//@description   UPDATE Todo
//@route         PUT /api/todo/:id
//@access         PRIVATE
const updateTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure te logged in user matches the todo user
    if (todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')

    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedTodo)
});


//@description  DELETE Todo
//@route         DELETE /api/todo/:id
//@access         PRIVATE
const deleteTodo = asyncHandler(async(req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error('Todo not found')
    }
    const user = await User.findById(req.user.id)

    //Check for user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure te logged in user matches the todo user
    if (todo.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')

    }

    await todo.remove(),

        res.status(200).json({ id: req.params.id })
});


module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
}