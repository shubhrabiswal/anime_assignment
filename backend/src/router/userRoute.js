const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')


router.post('/signup',usercontroller.adduser)
router.post('/signin',usercontroller.signin)
router.get('/logout',usercontroller.logout)
router.get('/verify',usercontroller.verifytoken)
router.post('/review/:id',usercontroller.addreview)
router.get('/review',usercontroller.getreview)
router.put('/review/:id',usercontroller.updatereview)
router.get('/rating/:id',usercontroller.avgrating)


module.exports = router;