const router = require("express").Router();
const multer = require('multer')
const upload = multer({ storage: require("../middleware/multer") })
const userController = require("../Controllers/userController")

router.post("/register", userController.register_user);
router.post("/login", userController.login_user);
router.post("/profile/update/:userId", upload.single('profile'), userController.update_profile);
router.get("/checkAuth", userController.user_auth_check)

module.exports = router
