/* eslint-disable camelcase */
import express from 'express';
import xml from 'xml';
import pool from './db';

import patientRouter from './routes/infected';

const app = express();
app.use(express.json());
app.use(patientRouter);

app.get('/api/v1/on-covid-19', (req, res) => {
  res.status(200).send({ message: 'Testing covid-19 endpoint' });
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  // console.log(`listening on ${port}.....`);
});
