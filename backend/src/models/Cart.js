const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
}, { _id: false });

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    items: [cartItemSchema],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);
