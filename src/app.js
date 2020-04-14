import express from 'express';
import morgan from 'morgan';
import estimator from './estimator';

const app = express();
app.use(express.json());
// app.use(morgan('dev'));
const logger = morgan((tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ].join(' ')
);

console.log('before', logger);
app.post('/api/v1/on-covid-19', (req, res) => {
  logger(req, res, (err) => {
    // req.body = {};
    // POST /api/v1/on-covid-19 200 30ms
    const startTime = Date.now();

    // console.log(req.body, '========');
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

    res.status(201).send(resData);
    const endTime = Date.now();
    // console.log(startTime, 'end', endTime, 'diff', endTime - startTime);
    console.log(req.method, req.url, res.statusCode, endTime - startTime, 'ms');
    console.log('after', logger);
  });
});
app.get('/api/v1/on-covid-19', (req, res) => {
  res.status(200).send({ message: 'Testing covid-19 endpoint' });
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
