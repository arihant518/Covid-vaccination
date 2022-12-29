const express = require('express')
const router = express.Router();
const userController = require('../Controllers/userController')

router.post('/register', userController.regUser)
router.post('/login', userController.loginUser)
router.get('/getAllCenters', userController.getAllCenters)
router.get('/getOneCenter/:centerId', userController.getOneCenter)
router.post('/addSlot',userController.protect, userController.addSlot)


module.exports = router