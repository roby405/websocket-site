const router = require("express").Router();
const { signup, signin, whoami } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/whoami", authMiddleware, whoami);

module.exports = router