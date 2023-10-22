const express = require('express');
const router = express.Router();
const {
    loginUser,
    RegisterUser,
    CurrentUser} = require('../controllers/userController');
const validateToken = require('../middlewear/validateJwt');


router.post("/register",RegisterUser);
router.post("/login",loginUser);
router.get("/current",validateToken,CurrentUser);


module.exports=router;