import {model, Schema} from 'mongoose';

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  admissionNumber: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  yob: {
    type: Number,
    required: true
  }
});

export default model("studentModel", studentSchema);
