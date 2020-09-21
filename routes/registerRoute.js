const registerController = require("../controllers/registerController");
const router = require("express").Router();

// REGISTER A NEW USER
router.post("/", registerController.registerUser);

module.exports = router;
