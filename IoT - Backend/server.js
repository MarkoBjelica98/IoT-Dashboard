import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import sensorRoutes from './routes/sensorRoutes.js';
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: false,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'IoT backend radi' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

async function testDatabase() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected');
    console.log('Database time:', result.rows[0].now);
  } catch (error) {
    console.error('❌ Database connection error');
    console.error(error);
  }
}

testDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/sensors', sensorRoutes);

app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
