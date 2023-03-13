const path = require('path');
const fs = require('fs');
const ProductV2 = require('./model');




const index = async (req, res) => {
    try{
    const info = req.body;
    if(info) {
        const result = await ProductV2.findAll(info);
        res.send(result);
    } else {
        res.send('Resource not found')
    }
    }catch (error) {
        res.send(error);
    }
    
};

const searchID = async (req, res) => {
    let id = req.params.id;
    try {
        const search = await ProductV2.findOne({ where: { id } });
        res.send(search);
    }catch (error) {
        res.send(error);
    }
    
};

const storage = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    let sql = '';
    let values = [];
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        sql = 'UPDATE products SET users_id ?, name?, price ?, stock ?, status ?, image_url WHERE id = ?';
        values = [parseInt(users_id), name, price, stock, status]
    }else{
        sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?';
        values = [parseInt(users_id), name, price, stock, status, req.params.id]
    }
    try{
        await ProductV2.sync();
        const result = await ProductV2.create({users_id, name, price, stock, status, image_url: `http://localhost:3003/public/${image.originalname}`});
        res.send(result);
    }catch(error) {
        res.send(error);
    }
};


const updateAllUsers = async (req, res) =>  {
    let id = req.params.id;
    const image = req.file;
    const info = {
        users_id: req.body.users_id,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.status,
        status: req.body.status,
        image_url: `http://localhost:3003/public/${image.originalname}`
    }
    try {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        // const result = await ProductV2.update(info, { where: { id }});
        const search = await ProductV2.findOne({ where: { id } });
        const result = await search.update(info)
        res.send(result);
    }catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (req, res) => {
    let id = req.params.id;
    let image = req.file;
    const info = {
        users_id: req.body.users_id,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.status,
        status: req.body.status,
        image_url: `http://localhost:3003/public/${image.originalname}`,
    };
    try{
        const target = path.join(__dirname,'../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        const search = await ProductV2.findOne({where: { id }});
        const result = await search.destroy(info);
        res.send(result);
    }catch (error) {
        res.send(error);
    }
}



module.exports = {
    index, 
    searchID,
    storage,
    updateAllUsers,
    deleteProduct
}