import express from 'express';
import studentModel from '../models/studentModel.js'


const router = express.Router();
 
// router.get('/', (req, res) => {
//   studentModel.find()
//   .then((data) => res.send(data))
// });

// async and await example

router.get('/', async (req, res) => {
  const data = await studentModel.find()
  res.send(data)
});

router.post('/create', (req, res) => {

  const newStudent = new studentModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    admissionNumber: req.body.admissionNumber,
    grade: req.body.grade,
    yob: req.body.yob
  });

  newStudent.save()
  .then((doc) => res.send(doc))
  .catch(console.error)
});

// get one student
// router.get('/:id', (req, res) => {
//   // console.log(req.params.id)
//   let id = req.params.id;
//   studentModel.findOne({_id: id})
//          .then((data) => res.send(data));
// });

// example of async and a wait


//This is how to get one item
router.get('/:id', async (req, res) => {
  let id = req.params.id;
  const result = await studentModel.findOne({_id: id});
  res.send(result)
});


// getting students who are in grade 5x
router.post('/:getgrade', async (req, res) => {
  let grade = req.body.grade;
  const outCome = await studentModel.find({grade: grade})
  res.send(outCome)
});

// update student details
router.post('/update/:id', async (req, res) => {
  const student = await studentModel.findOne({_id: req.params.id});
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;
  student.admissionNumber = req.body.admissionNumber;
  student.yob = req.body.yob;
  student.grade = req.body.grade;
  const result = await student.save();
  res.send(result)
});


// Deleting a student;
router.post('/delete/:id', async (req, res) => {
  let id = req.params.id;
  await studentModel.deleteOne({_id: id});
  res.send('Student has been deleted successfully')
}) 


export default router;