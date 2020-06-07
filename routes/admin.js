const express = require('express');

const router = express.Router();
const adminController = require('../controllers/admin')

router.get('/add-product', adminController.addProduct);
router.post('/add-product', adminController.renderProduct);

exports.route = router;