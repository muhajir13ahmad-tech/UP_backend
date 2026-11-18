const db = require('../config/db');

// Mengambil semua data siswa
exports.getAllSiswa = (req, res) => {
  const sql = 'SELECT * FROM siswa ORDER BY id DESC';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil data siswa',
        error: err.message
      });
    }
    res.status(200).json({
      success: true,
      data: rows
    });
  });
};

// Mengambil detail satu data siswa berdasarkan ID
exports.getSiswaById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM siswa WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Gagal mengambil detail siswa',
        error: err.message
      });
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        message: `Data siswa dengan ID ${id} tidak ditemukan`
      });
    }
    res.status(200).json({
      success: true,
      data: row
    });
  });
};

// Menambahkan data siswa baru
exports.createSiswa = (req, res) => {
  const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

  // Validasi input
  if (!kode_siswa || !nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
    return res.status(400).json({
      success: false,
      message: 'Semua field (Kode Siswa, Nama Siswa, Alamat Siswa, Tgl Siswa, Jurusan Siswa) wajib diisi!'
    });
  }

  // Cek apakah kode_siswa sudah digunakan
  const checkSql = 'SELECT id FROM siswa WHERE kode_siswa = ?';
  db.get(checkSql, [kode_siswa.trim()], (err, existing) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error saat pengecekan kode siswa',
        error: err.message
      });
    }
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Kode Siswa '${kode_siswa}' sudah terdaftar, gunakan kode lain!`
      });
    }

    const insertSql = `
      INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      kode_siswa.trim(),
      nama_siswa.trim(),
      alamat_siswa.trim(),
      tgl_siswa,
      jurusan_siswa.trim()
    ];

    db.run(insertSql, params, function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Gagal menambahkan data siswa',
          error: err.message
        });
      }
      res.status(201).json({
        success: true,
        message: 'Data siswa berhasil ditambahkan',
        data: {
          id: this.lastID,
          kode_siswa,
          nama_siswa,
          alamat_siswa,
          tgl_siswa,
          jurusan_siswa
        }
      });
    });
  });
};

// Mengupdate data siswa
exports.updateSiswa = (req, res) => {
  const { id } = req.params;
  const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

  // Validasi input
  if (!kode_siswa || !nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
    return res.status(400).json({
      success: false,
      message: 'Semua field (Kode Siswa, Nama Siswa, Alamat Siswa, Tgl Siswa, Jurusan Siswa) wajib diisi!'
    });
  }

  // Cek apakah data siswa ada
  db.get('SELECT id FROM siswa WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error saat mencari data siswa',
        error: err.message
      });
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        message: `Data siswa dengan ID ${id} tidak ditemukan`
      });
    }

    // Cek apakah kode_siswa duplikat dengan siswa lain
    const checkSql = 'SELECT id FROM siswa WHERE kode_siswa = ? AND id != ?';
    db.get(checkSql, [kode_siswa.trim(), id], (err, duplicate) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error saat pengecekan kode siswa',
          error: err.message
        });
      }
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `Kode Siswa '${kode_siswa}' sudah digunakan oleh siswa lain!`
        });
      }

      const updateSql = `
        UPDATE siswa 
        SET kode_siswa = ?, nama_siswa = ?, alamat_siswa = ?, tgl_siswa = ?, jurusan_siswa = ?
        WHERE id = ?
      `;
      const params = [
        kode_siswa.trim(),
        nama_siswa.trim(),
        alamat_siswa.trim(),
        tgl_siswa,
        jurusan_siswa.trim(),
        id
      ];

      db.run(updateSql, params, function (err) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Gagal mengupdate data siswa',
            error: err.message
          });
        }
        res.status(200).json({
          success: true,
          message: 'Data siswa berhasil diperbarui',
          data: {
            id: Number(id),
            kode_siswa,
            nama_siswa,
            alamat_siswa,
            tgl_siswa,
            jurusan_siswa
          }
        });
      });
    });
  });
};

// Menghapus data siswa
exports.deleteSiswa = (req, res) => {
  const { id } = req.params;

  db.get('SELECT id FROM siswa WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error saat mencari data siswa',
        error: err.message
      });
    }
    if (!row) {
      return res.status(404).json({
        success: false,
        message: `Data siswa dengan ID ${id} tidak ditemukan`
      });
    }

    db.run('DELETE FROM siswa WHERE id = ?', [id], function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Gagal menghapus data siswa',
          error: err.message
        });
      }
      res.status(200).json({
        success: true,
        message: `Data siswa dengan ID ${id} berhasil dihapus`
      });
    });
  });
};
