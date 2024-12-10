const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/imageUpload');

// router.post('/register', upload.single('image'), authController.registerUser);
router.post('/register', upload.single('image'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
    }
    next();
}, authController.registerUser);

router.post('/login', authController.loginUser);

module.exports = router;