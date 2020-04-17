/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
// import xml from 'xml';
import jsonToXml from 'jsontoxml';
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

    res.status(200).json({
      data: resData.data,
      impact: resData.impact,
      severeImpact: resData.severeImpact
    });
    const endTime = Date.now();

    const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
    pool.query(
      'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
      reqLog
    );
  }

  static async patientRecordJson(req, res) {
    // const startTime = Date.now();
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

    res.status(200).json({
      data: resData.data,
      impact: resData.impact,
      severeImpact: resData.severeImpact
    });
    // const endTime = Date.now();

    // const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
    // pool.query(
    //   'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
    //   reqLog
    // );
  }

  static async patientRecordXml(req, res) {
    // const startTime = Date.now();
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
    res.header('content-Type', 'application/xml; charset=UTF-8');
    res.send(jsonToXml(resData));
    // const endTime = Date.now();

    // const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
    // pool.query(
    //   'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
    //   reqLog
    // );
  }

  static async getLogs(req, res) {
    const logs = await pool.query('SELECT * FROM  logs');
    let logStr = '';
    logs.rows.forEach(({ method, url, status, log_time }) => {
      logStr += `${method} ${url} ${status} ${log_time}ms\n`;
    });
    res.status(200).send(logStr);
  }
}

export default Data;
