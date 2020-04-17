import xml from 'xml';
import pool from '../db';
import estimator from '../../estimator';

class Data {
  static async patientRecord(req, res) {
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
  }

  static async patientRecordLogs(req, res) {
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
  }
}

export default Data;
