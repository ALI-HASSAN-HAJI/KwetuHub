import express from 'express';
import exampleModel from '../models/exampleModel.js';

const router = express.Router();

router.get('/home', (req, res) => {
  res.send('This is a home page:')
});

router.get('/about', (req, res) => {
  res.send('This is about page')
});

// Example about lessons


// This is how to get one lesson
router.get('/:id', async (req, res) => {
 let id = req.params.id;
 const result = await exampleModel.findOne({_id: id})
 res.send(result)
})


// This is how to get all the lessons
router.get('/', async (req, res) => {
 let lessons = await exampleModel.find();
 res.send(lessons);
});


// This is how to create the lessons
router.post('/create', async (req, res) => {
  const newExample = new exampleModel({
    lessonToday: req.body.lessonToday,
    date: req.body.date
  })
  let result = await newExample.save()
  res.send(result);
});


// This is how to update lessons
router.post('/update/:id', async (req, res) => {
  const example = await exampleModel.findOne({_id: req.params.id});
  example.lessonToday = req.body.lessonToday;
  example.date = req.body.date;
  const result = await example.save()
  res.send(result)
});


// This is how to delete lessons
router.post('/delete/:id', async (req, res) =>{
  let id = req.params.id;
  await exampleModel.deleteOne({_id: id});
  res.send("One of the lessons has been deleted successfully")
})
 
export default router;