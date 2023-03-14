import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import exampleRoute from './routes/exampleRoute.js';
import practiceRoute from './routes/practiceRoute.js';
import studentRoutes from './routes/studentRoutes.js';
import categoryRoute from './routes/categoryRoute.js';
import arsenalRoutes from './routes/arsenalRoutes.js'; 
import productRoutes from './routes/productRoutes.js'; 
import userAuth from './routes/userAuth.js';


const app = express();
const PORT = 4000;
app.use(bodyParser.json())
app.use(express.static('uploads')); // exposes this folder so that we can access the images from the front end
const mongoUri = 'mongodb+srv://Ali-Haji:'+ encodeURIComponent('Haji@1234') +'@cluster0.7cpeakk.mongodb.net/?retryWrites=true&w=majority'

mongoose
   .connect(mongoUri)
   .then(() => console.log("mongoDB is connected!!!!!"))
   .catch(console.error)

app.use('/lesson', exampleRoute);
app.use('/practice', practiceRoute);
app.use('/student', studentRoutes);
app.use('/category', categoryRoute);
app.use('/arsenal', arsenalRoutes);
app.use('/product', productRoutes);
app.use('/', userAuth);

app.listen(PORT, () => {
  console.log("Server listening on PORT: "+PORT)
});