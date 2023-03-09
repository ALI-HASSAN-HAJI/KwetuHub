import express from 'express';
import classModel from '../models/classModel.js';

const router = express.Router();

router.get('/contact', (req, res) => {
  res.send('This is a contact page')
});

router.get('/practice', (req, res) => {
  res.send('This is a practice page')
});
router.post('/post/example', (req, res) => {
  let data = req.body;
  res.send(data)
});
// create a route with path calculation -> it is a post route
// on postman send 2 numbers
// on your route, add the numbers(use req to get the numbers)
// send the total
router.post('/calculation', (req, res) => {
  let num1 = req.body.num1;
  let num2 = req.body.num2;
  let total = num1 + num2;
  res.send("The total of the calculation is " + total);
  
});

// create a route with path greeting -> it is a post route
// on postman send a name
// on your route, concatenate Hello and the name(use req to get the name)
// send the greeting eg 'Hello Sarah'
router.post('/greeting', (req, res) => {
  let name = req.body.name;
  res.send("Hello " + name);
});

router.get('/getAll', (req, res) => {
  classModel.find()
  .then((data) => res.send(data))
});


router.post('/create', (req, res) => {
  console.log(req.body)
 const newClass = new classModel({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password,
  age: req.body.age
 });
 newClass.save()
 .then((doc) => res.send(doc))
 .catch(console.error)
})

export default router;