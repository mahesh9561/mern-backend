const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        email: {
            type: String,
            required: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending'
        },
        orderStatus: {
            type: String,
            enum: [
                'Processing',
                'Shipped',
                'Delivered',
                'Cancelled'
            ],
            default: 'Processing'
        },
        shippingAddress: {
            fullName: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            phoneNumber: { type: String, required: true }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
