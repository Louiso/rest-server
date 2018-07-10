import './config/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoute from './routes/user';

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(userRoute);

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true
}, (err/* , res */) => {

  if(err) throw err;
  
  console.log('Base de datos conectada');
  app.listen(process.env.PORT, () => {

    console.log(`Server running on port : ${process.env.PORT}`);

  });

});