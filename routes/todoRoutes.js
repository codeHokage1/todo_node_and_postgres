const express = require('express');
const route = express.Router();
const todoControllers = require('../controllers/todoController');


route
    .get('/', todoControllers.getAllTodos)
    .get('/:id', todoControllers.getTodoById)
    .post('/', todoControllers.createTodo)
    .put('/:id', todoControllers.updateTodo)
    .delete('/:id', todoControllers.deleteTodo)

module.exports = route;