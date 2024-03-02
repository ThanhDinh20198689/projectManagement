const mongoose = require("mongoose");// nhung module của mongoose vào khi cần dùng những module của mongoose
const slug = require('mongoose-slug-updater');//nhúng module của slug

mongoose.plugin(slug);// sử dụng biến slug

const productSchema = new mongoose.Schema({ // tạo ra 1 bộ khung để ổng back-end insert vào database
    title: String,
    slugTest: {                 // tạo ra slug để khi cần tra cứu dữ liệu trong database dễ hơn vè thân thiện với URL
        type: String,
        slug: "title",
        unique: true
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true  // mongose hỗ trợ timestamps để tạo creatAt và updateAt
});

const Product = mongoose.model("Product", productSchema, "products");// trỏ thằng vào collection mang tên products database của mongoDB  để lấy data

module.exports = Product;