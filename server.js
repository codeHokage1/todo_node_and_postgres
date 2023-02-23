const express = require('express')
const app = express();

app.use(express.json());

const todoRoutes = require('./routes/todoRoutes');

app.get('/', (req, res) => {
    res.send('Welcome to the Todo app. Add stuffs.')
});

app.use('/api/v1/todos', todoRoutes)

app.listen(5001, () => {
    console.log("Server listening on port 5001");
})