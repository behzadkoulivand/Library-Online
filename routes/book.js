const {Router} = require('express');

const bookController = require('../controllers/bookController');
const {authenticated} = require('../middlewares/auth');
const router = Router();

router.post("/register", authenticated, bookController.register);

module.exports = router;