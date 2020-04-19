/* eslint-disable camelcase */
import express from 'express';

import patientRouter from './routes/infected';

const app = express();
app.use(express.json());
app.use('/api/v1/on-covid-19/', patientRouter);

app.get('/api/v1/on-covid-19', (req, res) => {
  res.status(200).send({
    message: 'BuildForSDG Cohort-1 JavaScript Assessment',
    message2:
      '<p>Too many patients, not enough hospitals and beds. A serious shortage of ventilators, masks and other PPE - if we don’t practice social distancing</p>',
    message3:
      '<p>Job losses or freezes, low cash flow and low production (even for essentials like food). These and more from too many people being sick, a sizable number dying (including some of the best people in many fields), and many others affected by the impact of losing loved ones or a world operating in slow motion......... </p>'
  });
});

const port = process.env.PORT || 5050;

app.listen(port, () => {
  // console.log(`listening on ${port}.....`);
});
