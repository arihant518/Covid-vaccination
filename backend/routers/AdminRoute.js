const express = require('express')
const router = express.Router();
const centerController = require('../Controllers/centerController')
const userController = require('../Controllers/userController')

router.post('/createCenter',userController.protect,userController.restrictTo(["admin"]) ,centerController.createCenter)
router.post('/deleteCenter',userController.protect,userController.restrictTo(["admin"]) , centerController.deleteCenter)

module.exports = router