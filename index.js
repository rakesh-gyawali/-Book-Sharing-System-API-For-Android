const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const bookRouter = require('./routes/bookRouter');
const categoryRouter = require('./routes/categoryRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Welcome To My App, Stranger!!!');
});

app.use('/api/users', userRouter);
app.use('/api/books', bookRouter);
app.use('/api/categories', categoryRouter);

app.listen(process.env.Port,  () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
});
