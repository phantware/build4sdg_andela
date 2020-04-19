/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
// import xml from 'xml';
import jsonToXml from 'jsontoxml';
// import fs from 'fs';
// import path from 'path';
import pool from '../db';
import estimator from '../../estimator';

class Data {
  static async patientRecord(req, res) {
    const startTime = Date.now();
    const {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation,
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
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
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
    const startTime = Date.now();
    const {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation,
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
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };

    const resData = estimator(data);

    res.status(200).json(resData);
    const endTime = Date.now();

    const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
    pool.query(
      'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
      reqLog
    );
  }

  static async patientRecordXml(req, res) {
    const startTime = Date.now();
    const {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation,
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
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };

    const resData = estimator(data);
    res.set('Content-Type', 'application/xml');
    res.send(jsonToXml(resData));
    const endTime = Date.now();

    const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
    pool.query(
      'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
      reqLog
    );
  }

  static async getLogs(req, res) {
    // try {
    //   const logs = fs.readFileSync(path.join(__dirname, 'logs.txt'), {
    //     encoding: 'utf-8'
    //   });
    //   res.type('text/plain');
    //   return res.status(200).send(logs);
    // } catch (error) {
    //   throw new Error('Error reading log file');
    // }
    const logs = await pool.query('SELECT * FROM  logs');
    let logStr = '';
    logs.rows.forEach(({ method, url, status, log_time }) => {
      logStr += `${method} ${url} ${status} ${log_time}ms\n`;
    });
    res.status(200).send(logStr);
  }
}

export default Data;
