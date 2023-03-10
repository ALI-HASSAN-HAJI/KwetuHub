import express from 'express';
import multer from 'multer';
import fs from 'fs';
import arsenalModel from '../models/arsenalModel.js';


const router = express.Router(); 


// How to upload the Picture of the Club;
const upload = multer({ dest: 'uploads/'});
const uploadArsenalImages = upload.fields([
  {name: 'image', maxCount: 1}
])

router.post('/upload/picture', uploadArsenalImages, (req, res) => {
  console.log(req.files.image[0]);
  let img = req.files.image[0];
  let fileType = (img.mimetype).split('/')[1];
  let newFileName = img.filename + '.' + fileType;
  fs.rename(`./uploads/${img.filename}`, `./uploads/${newFileName}`, () => {
    console.log("The file is successfully renamed, Congratulation!!!");
  });

  res.send("It's fully functioning well!!!!!");
})


// Example showing Arsenal Player by getting, Creating, updating and also deleting;

// The first example shows how to get one player;
router.get('/:id', async (req, res) => {
  let id = req.params.id;
  const result = await arsenalModel.findOne({_id: id})
  res.send(result)
});

// The Second example shows how to get all the players;

router.get('/', async (req, res) => {
  let players = await arsenalModel.find();
  res.send(players);
});

// The third example shows how to create players and it must you first create players before you get them;
router.post('/create', async (req, res) => {

  const newArsenal = new arsenalModel({
    playerName: req.body.playerName,
    playerNumber: req.body.playerNumber,
    playerNationality: req.body.playerNationality,
    playerGoals: req.body.playerGoals,
    playerAssist: req.body.playerAssist,
    playerPosition: req.body.playerPosition
  });
  let result = await newArsenal.save()
  res.send(result);
});

// The fourth example shows how to update a player;
router.post('/update/:id', async (req, res) => {
  let player = await arsenalModel.findOne({_id: req.params.id});
  player.playerName = req.body.playerName;
  player.playerNumber = req.body.playerNumber;
  player.playerNationality = req.body.playerName;
  player.playerGoals = req.body.playerGoals;
  player.playerAssist = req.body.playerAssist;
  player.playerPosition = req.body.playerPosition;
  const result = await player.save()
  res.send(result)
});


// This fifth Example shows that to delete a player after he left from the club;
router.post('/delete/:id', async (req, res) => {
  let id = req.params.id;
  await arsenalModel.deleteOne({_id: id});
  res.send("Alexis Sanches has been deleted following his depature from the club!!!");
})

export default router; 