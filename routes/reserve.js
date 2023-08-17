const {Router} = require('express');

const reseveController = require('../controllers/reserveController');
const {authenticated} = require('../middlewares/auth');
const router = Router();

router.post("/reserve-book/:id", authenticated, reseveController.borrowBook);

router.delete("/return-book/:id", authenticated, reseveController.returnBook);

module.exports = router;