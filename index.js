const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/userRouter');
const profileRouter = require('./routes/profileRouter');
const bookRouter = require('./routes/bookRouter');
const categoryRouter = require('./routes/categoryRouter');
const districtRouter = require('./routes/districtRouter');

const app = express();
mongoose.connect(process.env.DbURI,{
    useNewUrlparser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
.then(()=> console.log('----------------- Database server connected --------------------'))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Welcome To My App, Stranger!!!');
});

app.use('/api/users', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/books', bookRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/districts', districtRouter);

app.listen(process.env.Port,  () => {
    console.log(`Server is running at localhost:${process.env.Port}`);
});
