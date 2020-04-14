const xml = require('xml');
const pg = require('pg');
const express = require('express');

const app = express();

app.post('/save-world', (req, res) => {
  const startTime = Date.now();
  res.send('hello world');
  const endTime = Date.now();

  const reqLog = [req.method, req.url, res.statusCode, endTime - startTime];
  pool.query(
    'insert into logs(method,url,status,log_time) values($1,$2,$3,$4) returning *',
    reqLog
  );
});

app.post('/save-world/:type', (req, res) => {
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

app.get('/logs', async (req, res) => {
  const logs = await pool.query('SELECT * FROM  logs');
  let logStr = '';
  logs.rows.forEach(({ method, url, status, log_time }) => {
    logStr += `${method} ${url} ${status} ${log_time}ms\n`;
  });
  res.status(200).send(logStr);
});

const connect = {
  user: 'u0_a78',
  database: 'postgres'
};
const pool = new pg.Pool(connect);
const port = 3000;
pool
  .query('select 1+1')
  .then(() => {
    console.log('starting database...');
    app.listen(port, console.log('server running on port, port', port));
  })
  .catch(console.error);
