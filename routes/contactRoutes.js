const express = require('express');
const router = express.Router();
const {
     getContacts,
     createContact,
     deleteContact,
     getContact,
     updateContact} = require("../controllers/contactControllers");
const validateToken = require('../middlewear/validateJwt');

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;