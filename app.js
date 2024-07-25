const express = require('express');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/reviews', reviewRouter);
app.use('*', (req, res) => res.end('Unrecognized route'));

app.use((req, res, next) => {
    next(createError(404));
});

module.exports = app;
