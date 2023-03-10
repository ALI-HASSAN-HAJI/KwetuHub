import {model, Schema} from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  images: [String],
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: [String],
    
  discountPercentage: {
    type: Number,
  }
});
export default model("productModel", productSchema);