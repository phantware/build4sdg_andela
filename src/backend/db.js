import { Pool } from 'pg';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const { connectionString } = process.env;
const pool = new Pool({ connectionString });

pool.query('SELECT NOW()');
export default pool;
