const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars from backend root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Routes
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

// Enable CORS
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/razorpay', (req, res) =>
    res.send(process.env.RAZORPAY_KEY_ID || 'rzp_test_fallbackKey')
);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

app.get('/api/config/razorpay', (req, res) =>
    res.send(process.env.RAZORPAY_KEY_ID || 'rzp_test_fallbackKey')
);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
