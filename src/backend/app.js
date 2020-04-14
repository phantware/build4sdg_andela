/* eslint-disable camelcase */
import express from 'express';
import xml from 'xml';
import pool from './db';
import estimator from '../estimator';

const app = express();
app.use(express.json());

app.post('/api/v1/on-covid-19', (req, res) => {
  const startTime = Date.now();
  const {
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = req.body;
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };

  const resData = estimator(data);

  res.status(200).send(resData);
  const endTime = Date.now();

  const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
  pool.query(
    'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
    reqLog
  );
});

app.post('/api/v1/on-covid-19/logs/:type', (req, res) => {
  const startTime = Date.now();
  const { type } = req.params;
  if (type === 'json') res.status(201).json({ success: 'hello world' });
  else if (type === 'xml') {
    res.type('application/xml');
    res.status(201).send(
      xml({
        data: 'data1',
        status: '45'
      })
    );
  }
  const endTime = Date.now();

  const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
  pool.query(
    'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
    reqLog
  );
});

app.get('/api/v1/on-covid-19', (req, res) => {
  res.status(200).send({ message: 'Testing covid-19 endpoint' });
});

app.get('/api/v1/on-covid-19/logs', async (req, res) => {
  const logs = await pool.query('SELECT * FROM  logs');
  let logStr = '';
  logs.rows.forEach(({ method, url, status, log_time }) => {
    logStr += `${method} ${url} ${status} ${log_time}ms\n`;
  });
  res.status(200).send(logStr);
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
