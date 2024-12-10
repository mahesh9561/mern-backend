const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const { PORT } = require('./config/Keys');
const connectDb = require('./config/db');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const cartRouter = require('./routes/cartRoutes');
const userRouter = require('./routes/userRoutes');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/orders', orderRouter);
// app.use('/api/cart', cartRouter);
// app.use('/api/user', userRouter);


connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});