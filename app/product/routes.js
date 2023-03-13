const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const controller = require('./controller');



router.get('/product', controller.index);
router.get('/product/:id', controller.findID);
router.post('/product/', upload.single('image'), controller.store);
router.put('/product/:id', upload.single('image'), controller.update);
router.delete('/product/:id', upload.single('image'), controller.destroy);



router.get('/uploads');

module.exports = router;