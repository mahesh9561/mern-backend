const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.AddOrder = async (req, res) => {
    const { productId, userId } = req.params;
    const {
        products,
        totalPrice,
        paymentMethod,
        paymentStatus,
        orderStatus,
        shippingAddress,
    } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }


        const order = new Order({
            user: userId,
            email: user.email,
            products,
            totalPrice,
            paymentMethod,
            paymentStatus: paymentStatus || 'Pending',
            orderStatus: orderStatus || 'Processing',
            shippingAddress
        });

        const savedOrder = await order.save();

        res.status(201).json({
            success: true,
            message: "Order added successfully",
            data: savedOrder
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add order",
            error: error.message
        });
    }
};

exports.editOrder = async (req, res) => {
    const { userId, email, orderId } = req.params;
    const {
        products,
        totalPrice,
        paymentMethod,
        paymentStatus,
        orderStatus,
        shippingAddress,
    } = req.body;

    try {
        const user = await User.findById(userId);  // Find user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await Product.findById(products[0].product);  // If products contain productId, check it
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Now update the order based on the orderId and other values
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,  // Update the order using the orderId
            {
                user: userId,  // Update the user reference
                email: email,  // Update email if needed
                ...(products && { products }),  // Only update if products are provided
                ...(totalPrice && { totalPrice }),  // Only update if totalPrice is provided
                ...(paymentMethod && { paymentMethod }),  // Update paymentMethod if provided
                ...(paymentStatus && { paymentStatus }),  // Update paymentStatus if provided
                ...(orderStatus && { orderStatus }),  // Update orderStatus if provided
                ...(shippingAddress && { shippingAddress }),  // Update shippingAddress if provided
            },
            { new: true }  // Ensure that the updated order is returned
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update order",
            error: error.message
        });
    }
};

exports.deleteOrder = async (req, res) => {
    const { userId, email, orderId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const deleteOrder = await Order.findByIdAndDelete(orderId);

        if (!deleteOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Send success response with the deleted order info
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            data: deleteOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the order",
            error: error.message
        });
    }
};
