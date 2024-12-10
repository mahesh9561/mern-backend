const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/imageUpload')

router.post('/products', upload.single('image'), productController.addProduct);
router.put('/editproduct/:id', productController.editProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;