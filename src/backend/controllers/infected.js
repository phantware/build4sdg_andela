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
    const resData = estimator(req.body);

    const endTime = Date.now();

    const reqLog = [
      req.method,
      req.originalUrl,
      res.statusCode,
      endTime - startTime
    ];
    pool.query(
      'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
      reqLog
    );
    return res.status(200).json({
      data: resData.data,
      impact: resData.impact,
      severeImpact: resData.severeImpact
    });
  }

  static async patientRecordJson(req, res) {
    const startTime = Date.now();

    const resData = estimator(req.body);

    const endTime = Date.now();

    const reqLog = [
      req.method,
      req.originalUrl,
      res.statusCode,
      endTime - startTime
    ];
    pool.query(
      'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
      reqLog
    );

    return res.status(200).json(resData);
  }

  static async patientRecordXml(req, res) {
    const startTime = Date.now();
    const resData = estimator(req.body);

    const endTime = Date.now();

    const reqLog = [
      req.method,
      req.originalUrl,
      res.statusCode,
      endTime - startTime
    ];

    pool.query(
      'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
      reqLog
    );
    res.set('Content-Type', 'application/xml');
    return res.send(jsonToXml(resData));
  }

  static async getLogs(req, res) {
    const startTime = Date.now();
    await pool.query('SELECT * FROM  logs');

    const endTime = Date.now();

    const reqLog = [
      req.method,
      req.originalUrl,
      res.statusCode,
      endTime - startTime
    ];

    const logs = await pool.query(
      'with getlogs as (insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *) select * from logs union all table getlogs;',
      reqLog
    );
    let logStr = '';
    logs.rows.forEach(({ method, url, status, log_time }) => {
      logStr += `${method} ${url} ${status} ${log_time}ms\n`;
    });
    res.type('text/plain');
    res.status(200).send(logStr);
  }
}

export default Data;
