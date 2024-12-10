const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/addorder/:userId/:email/:productId', orderController.AddOrder);
router.put('/editOrder/:userId/:email/:orderId', orderController.editOrder);
router.delete('/delete/:userId/:orderId', orderController.deleteOrder);

module.exports = router;