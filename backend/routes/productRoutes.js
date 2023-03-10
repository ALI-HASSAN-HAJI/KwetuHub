import express from 'express';
import multer from 'multer';
import productModel from '../models/productModel.js';
import fs from 'fs';


const router = express.Router();

// Getting one product
// router.get('/:id', async (req, res) => {
//   let id = req.params.id;
//   const result = await productModel.findOne({_id: id})
//   res.send(result)
// });

// Getting all the products
// router.get('/', async (req, res) => {
//   let product = await productModel.find();
//   res.send(product);
// });

// Creating Products;

const upload = multer({ dest: 'uploads/'});
const uploadProductImages = upload.fields([
  {name: 'image', maxCount: 1}
])


router.post('/create', uploadProductImages, (req, res) => {
   console.log(req.files.image[0])
   let img = req.files.image[0]
   let fileType = (img.mimetype).split('/')[1];
   let newFileName = img.filename + '.' + fileType;
   fs.rename(`./uploads/${img.filename}`, `./uploads/${newFileName}`, () => {
    console.log('File renamed successfully!!');
   });
   res.send('Ok')
//   const newProduct = new productModel({
//     name: req.body.name,
//     price: req.body.price,
//     currency: req.body.currency,
//     quality: req.body.quality,
//     category: req.body.category,
//     discount_percentage: req.body.discount_percentage
//   })
//   let result = await newProduct.save();
//   res.send(result);
})








export default router;
