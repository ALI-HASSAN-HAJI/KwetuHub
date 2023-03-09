import {model, Schema} from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export default model("categoryModel", categorySchema);