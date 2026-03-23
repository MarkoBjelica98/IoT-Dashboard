import pool from '../config/db.js';

export async function addSensorData(req, res) {
  try {
    const { temperature, humidity, light } = req.body;
    const userId = req.user.userId;

    if (
      temperature === undefined ||
      humidity === undefined ||
      light === undefined
    ) {
      return res.status(400).json({
        message: 'temperature, humidity and light are mandatory',
      });
    }

    const result = await pool.query(
      `INSERT INTO sensor_data (user_id, temperature, humidity, light)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, temperature, humidity, light, created_at`,
      [userId, temperature, humidity, light],
    );

    return res.status(201).json({
      message: 'Sensor data saved',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('ADD SENSOR ERROR:', error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
}

export async function generateSensorData(req, res) {
  try {
    const userId = req.user.userId;

    const temperature = Number((20 + Math.random() * 10).toFixed(2));
    const humidity = Number((35 + Math.random() * 25).toFixed(2));
    const light = Number((50 + Math.random() * 50).toFixed(2));

    const result = await pool.query(
      `INSERT INTO sensor_data (user_id, temperature, humidity, light)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, temperature, humidity, light, created_at`,
      [userId, temperature, humidity, light],
    );

    return res.status(201).json({
      message: 'Generated sensor data',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('GENERATE SENSOR ERROR:', error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
}

export async function getLatestSensorData(req, res) {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT id, temperature, humidity, light, created_at
       FROM sensor_data
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId],
    );

    return res.status(200).json({
      latest: result.rows[0] || null,
    });
  } catch (error) {
    console.error('LATEST SENSOR ERROR:', error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
}

export async function getSensorHistory(req, res) {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT id, temperature, humidity, light, created_at
       FROM sensor_data
       WHERE user_id = $1
       ORDER BY created_at ASC
       LIMIT 50`,
      [userId],
    );

    return res.status(200).json({
      history: result.rows,
    });
  } catch (error) {
    console.error('HISTORY SENSOR ERROR:', error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
}

export async function cleanupSensorData(req, res) {
  try {
    const userId = req.user.userId;

    await pool.query(
      `DELETE FROM sensor_data
       WHERE user_id = $1
         AND id NOT IN (
           SELECT id
           FROM sensor_data
           WHERE user_id = $1
           ORDER BY created_at DESC
           LIMIT 50
         )`,
      [userId],
    );

    return res.status(200).json({
      message: 'Cleanup successful',
    });
  } catch (error) {
    console.error('CLEANUP SENSOR ERROR:', error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
}

export async function deleteAllSensorData(req, res) {
  try {
    const userId = req.user.userId;

    await pool.query(
      `DELETE FROM sensor_data
       WHERE user_id = $1`,
      [userId],
    );

    return res.status(200).json({
      message: 'All sensor data deleted',
    });
  } catch (error) {
    console.error('DELETE ALL SENSOR ERROR:', error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
}
