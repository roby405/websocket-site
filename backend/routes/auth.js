const router = require("express").Router();
const { signup, signin, whoami, updateprofile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/whoami", authMiddleware, whoami);
router.patch("/updateprofile", authMiddleware, updateprofile);

module.exports = router