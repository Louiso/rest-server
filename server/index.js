import './config/config';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
  res.json({
    message: 'GET usuario'
  });
});

app.post('/usuario', (req, res) => {
  res.json({
    message: 'POST usuario'
  });
});

app.put('/usuario/:id', (req, res) => {
  res.json({
    message: 'PUT usuario'
  });
});

app.delete('/usuario/:id', (req, res) => {
  res.json({
    message: 'DELETE usuario'
  });
});

app.listen(process.env.PORT, () => {

  console.log(`Server running on port : ${process.env.PORT}`);
  
});