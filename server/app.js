import express from 'express';
import bodyParser from 'body-parser';
import indexRoute from './routes';
import path from 'path';
const app = express();

const dirPublic = path.resolve(__dirname,'../public');

app.use(express.static( dirPublic ));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(indexRoute);

export default app;