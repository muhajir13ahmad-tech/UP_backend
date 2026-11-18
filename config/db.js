const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database successfully.');
  }
});

// Inisialisasi tabel siswa dan seed data awal jika masih kosong
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS siswa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kode_siswa TEXT UNIQUE NOT NULL,
      nama_siswa TEXT NOT NULL,
      alamat_siswa TEXT NOT NULL,
      tgl_siswa TEXT NOT NULL,
      jurusan_siswa TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
      return;
    }

    // Periksa apakah tabel sudah memiliki data awal
    db.get('SELECT COUNT(*) as count FROM siswa', (err, row) => {
      if (err) {
        console.error('Error checking count:', err.message);
        return;
      }

      if (row.count === 0) {
        console.log('Seeding initial data siswa...');
        const stmt = db.prepare(`
          INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
          VALUES (?, ?, ?, ?, ?)
        `);

        const initialStudents = [
          ['SIS001', 'Ahmad Pratama', 'Jl. Merdeka No. 10, Jakarta', '2006-03-15', 'Rekayasa Perangkat Lunak'],
          ['SIS002', 'Siti Rahmawati', 'Jl. Sudirman No. 45, Bandung', '2006-07-22', 'Teknik Komputer & Jaringan'],
          ['SIS003', 'Budi Santoso', 'Jl. Diponegoro No. 8, Surabaya', '2005-11-05', 'Multimedia / DKV']
        ];

        for (const student of initialStudents) {
          stmt.run(student);
        }

        stmt.finalize();
        console.log('Initial data seeded successfully.');
      }
    });
  });
});

module.exports = db;
