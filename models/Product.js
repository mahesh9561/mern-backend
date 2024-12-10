const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number },
    comment: { type: String },
    date: { type: Date, default: Date.now },
    reviewerName: { type: String },
    reviewerEmail: { type: String },
});

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number },
    stock: { type: Number, required: true },
    tags: { type: [String], default: [] }, 
    brand: { type: String, required: true },
    warrantyInformation: { type: String, default: "No warranty information provided" },
    reviews: { type: [reviewSchema], default: [] }, 
    returnPolicy: { type: String, default: "No return policy specified" },
    images: { type: [String], default: [] }, 
    thumbnail: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
