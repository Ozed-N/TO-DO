const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000


connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/', function(req, res) {

    console.log(req.body);

    res.end();
});

app.listen(8080, function() {
    console.log("Application initialized.");
});
app.use('/api/todo', require('./routes/todoRoutes'));
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))