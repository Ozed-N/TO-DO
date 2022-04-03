const asyncHandler = require('express-async-handler');

//@description   GET Todo
//@route         GET /api/todo
//@access         PRIVATE
const getTodo = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `Get to-do` })
});

//@description   SET Todo
//@route         POST /api/todo
//@access         PRIVATE
const setTodo = asyncHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({
        message: 'Set to-do'
    })

});


//@description   UPDATE Todo
//@route         PUT /api/todo/:id
//@access         PRIVATE
const updateTodo = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Update to-do ${req.params.id}`
    })
});


//@description  DELETE Todo
//@route         DELETE /api/todo/:id
//@access         PRIVATE
const deleteTodo = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: `Delete to-do ${req.params.id}`
    })
});


module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
}