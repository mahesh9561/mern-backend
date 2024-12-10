const prductSchema = require('../models/Product');

exports.addProduct = async (req, res) => {
    const imageUrl = req.file ? `http://localhost:8005/uploads/${req.file.filename}` : '';

    const { title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        tags,
        brand,
        warrantyInformation,
        reviews,
        returnPolicy,
        images,
        thumbnail
    } = req.body;

    const product = new prductSchema({
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        tags,
        brand,
        warrantyInformation,
        reviews,
        returnPolicy,
        images: imageUrl,
        thumbnail
    })
    try {
        await product.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        res.status(400).json({ message: "Product not added" });
    }
}

exports.editProduct = async (req, res) => {
    const { id } = req.params;
    const { title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        tags,
        brand,
        warrantyInformation,
        reviews,
        returnPolicy,
        images,
        thumbnail } = req.body;
    try {
        const updateProduct = await prductSchema.findByIdAndUpdate(
            id,
            {
                ...(title && { title }),
                ...(description && { description }),
                ...(category && { category }),
                ...(price && { price }),
                ...(discountPercentage && { discountPercentage }),
                ...(rating && { rating }),
                ...(stock && { stock }),
                ...(tags && { tags }),
                ...(brand && { brand }),
                ...(warrantyInformation && { warrantyInformation }),
                ...(reviews && { reviews }),
                ...(returnPolicy && { returnPolicy }),
                ...(images && { images }),
                ...(thumbnail && { thumbnail })
            }, { new: true, runValidators: true }
        )
        if (!updateProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updateProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await prductSchema.findByIdAndDelete(id);
        return res.status(200).json({ message: "Delete Product succesfull", deleteProduct });
    } catch (error) {
        return res.status(200).json({ message: "Delete Product failed", error });
    }
}