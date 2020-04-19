import { Pool } from 'pg';

const connectionString = 'postgresql://postgres:postgres@localhost:5432/sdg_db';
const pool = new Pool({ connectionString });

// eslint-disable-next-line no-unused-vars
pool.query('SELECT NOW()').then(({ rows: [time] }) => {
  // console.log('connected to database', time);
});

export default pool;
