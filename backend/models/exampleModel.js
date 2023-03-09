import {model, Schema} from 'mongoose';

const exampleSchema = new Schema({
  lessonToday: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export default model("exampleModel", exampleSchema);