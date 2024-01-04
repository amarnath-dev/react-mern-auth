const router = require("express").Router();
const adminController = require("../Controllers/adminController")

// router.post("/register", adminController.admin_signup);
router.post('/login', adminController.admin_login)
router.get('/users', adminController.admin_home)
router.get('/edit/:userId', adminController.admin_edit)
router.put('/edit/:userId', adminController.admin_edit_put)
router.delete('/delete/:userId', adminController.admin_delete_user)
router.get('/search', adminController.admin_search)

router.get("/checkAuthAdmin", adminController.admin_auth_check)

module.exports = router