import express from 'express';
import multer from 'multer';
import fs from 'fs';
import exampleModel from '../models/exampleModel.js';

const router = express.Router();

// How to upload a picture;
const upload = multer({ dest: 'uploads/'});
const uploadExampleImages = upload.fields([
  {name: 'image', maxCount: 1},
  {name: 'images', maxCount: 6}
])

router.post('/upload/pic', uploadExampleImages, (req, res) => {
  console.log(req.files.image[0])
  let img = req.files.image[0]
  let fileType = (img.mimetype).split('/')[1];
  let newFileName = img.filename + '.' + fileType;
  fs.rename(`./uploads/${img.filename}`, `./uploads/${newFileName}`, () => {
    console.log("File renamed Successfully!!!!!");
  });

  // Uploading multiple pictures;
  let multipleImages = req.files.images
  let imageArray = multipleImages.map((image) => {
    let mFileType = (image.mimetype).split('/')[1];
    let mNewFileName = image.filename + '.' + mFileType;
    fs.rename(`./uploads/${image.filename}`, `./uploads/${mNewFileName}`, () => {
      console.log("File renamed successfully!!")
    });
    return newFileName;
  });
  console.log(imageArray)
  res.send('All files uploaded successfully!!!!');
})















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