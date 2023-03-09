import {model, Schema} from 'mongoose'; 

const arsenalSchema = new Schema({
  playerName: {
    type: String,
    required: true
  },
  playerNumber: {
    type: Number,
    required: true
  },
  playerNationality: {
    type: String,
    required: true
  },
  playerGoals: {
    type: Number,
    required: true
  },
  playerAssist: {
    type: Number,
    required: true
  },
  playerPosition: {
    type: String,
    required: true
  }
});

export default model("arsenalModel", arsenalSchema);