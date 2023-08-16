const {Router} = require('express');

const bookController = require('../controllers/bookController');
const {authenticated} = require('../middlewares/auth');
const router = Router();

router.post("/register", authenticated, bookController.register);

router.delete("/delete/:id", bookController.delete);
module.exports = router;