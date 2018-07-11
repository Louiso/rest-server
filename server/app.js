import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './routes';
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(indexRoute);

export default app;