const express = require('express');
const cors = require('cors');
require('dotenv').config();

const siswaRoutes = require('./routes/siswaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing API
app.use('/api/siswa', siswaRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di API Data Siswa (Express.js)',
    endpoints: {
      getAllSiswa: 'GET /api/siswa',
      getSiswaById: 'GET /api/siswa/:id',
      createSiswa: 'POST /api/siswa',
      updateSiswa: 'PUT /api/siswa/:id',
      deleteSiswa: 'DELETE /api/siswa/:id'
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Backend Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api/siswa`);
  console.log(`=========================================`);
});
