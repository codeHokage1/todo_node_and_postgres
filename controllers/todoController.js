const todoPool = require('../config/dbConfig');

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await todoPool.query("SELECT * FROM todo");
        res.send(todos.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const toDo = await todoPool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [parseInt(req.params.id)]
        );
        if (!toDo.rows.length) return res.status(404).send(`Todo with id ${req.params.id} not found`);
        res.send(toDo.rows);
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

exports.createTodo = async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await todoPool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description] 
        );
        res.status(201).json({
            message: "New todo added",
            newTodo: newTodo.rows
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        //find the todo
        const toDo = await todoPool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [parseInt(id)]
        );
        if (!toDo.rows.length) return res.status(404).send(`Todo with id ${req.params.id} not found`);

        
        const updatedTodo = await todoPool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
            [description, parseInt(id)]
        );
        res.status(201).json({
            message: "Update successful",
            updatedTodo: updatedTodo.rows
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        
        //find the todo
        const toDo = await todoPool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [parseInt(id)]
        );
        if (!toDo.rows.length) return res.status(404).send(`Todo with id ${req.params.id} not found`);

        await todoPool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [parseInt(id)]
        )
        res.status(201).send(`Todo with id ${id} has been deleted successfully`);
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}