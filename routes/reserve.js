const {Router} = require('express');

const reseveController = require('../controllers/reserveController');
const {authenticated} = require('../middlewares/auth');
const router = Router();

router.post("/reserve/:id", authenticated, reseveController.borrowBook);

module.exports = router;