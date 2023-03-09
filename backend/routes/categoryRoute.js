import express from 'express';
import categoryModel from '../models/categoryModel.js';

const router = express.Router();


// get one category
router.get('/:id', (req, res) => {
  // console.log(req.params.id)
  let id = req.params.id;
  categoryModel.findOne({_id: id})
         .then((data) => res.send(data));
});


router.get('/', async (req, res) => {
  const data = await categoryModel.find()
  res.send(data)
});

router.post('/create', async (req, res) => {
  const newCategory = new categoryModel({
    name: req.body.name,
  })
  let result = await newCategory.save()
  res.send(result);
});

router.post('/update/:id', async (req, res) => {
  const category = await categoryModel.findOne({_id: req.params.id});
  category.name = req.body.name;
  const result = await category.save() 
  res.send(result)
});

router.post('/delete/:id', async (req, res) => {
  let id = req.params.id;
  await categoryModel.deleteOne({_id: id});
  res.send('one of the categories has been deleted successfully')
}) 

export default router;