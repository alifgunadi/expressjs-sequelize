const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const handlerProduct = require('./controller');


router.get('/product', handlerProduct.index);
router.get('/product/:id', handlerProduct.searchID);
router.post('/product', upload.single('image'), handlerProduct.storage);
router.put('/product/:id', upload.single('image'), handlerProduct.updateAllUsers);
router.delete('/product/:id', upload.single('image'), handlerProduct.deleteProduct);

module.exports = router;