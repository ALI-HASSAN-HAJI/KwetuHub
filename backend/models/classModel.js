import {model, Schema} from 'mongoose';

const classSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    requrired: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  }
});
export default model("classModel", classSchema);
 