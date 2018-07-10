import './config/config';

import mongoose from 'mongoose';

import app from './app';

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true
}, (err) => {

  if(err) throw err;
  
  console.log('Base de datos conectada');
  app.listen(process.env.PORT, () => {

    console.log(`Server running on port : ${process.env.PORT}`);

  });

});