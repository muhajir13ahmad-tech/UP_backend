# Backend API - Sistem Data Siswa (Express.js)

Aplikasi Backend RESTful API untuk mengelola data siswa menggunakan Node.js, Express.js, dan database SQLite. Dibuat sesuai skema uji praktik FullStack Web Developer.

---

## 🛠️ Teknologi yang Digunakan
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3 (Otomatis dibuat & diseed saat pertama kali dijalankan)
- **Middleware:** CORS, Express JSON parser, Dotenv
- **Dev Tool:** Nodemon

---

## 📋 Struktur Data Siswa (Database)
Tabel: `siswa`

| Field | Tipe Data | Keterangan |
|---|---|---|
| `id` | INTEGER (PK, Auto Increment) | Primary Key unik |
| `kode_siswa` | TEXT (Unique, Not Null) | Kode Siswa (cth: SIS001) |
| `nama_siswa` | TEXT (Not Null) | Nama Lengkap Siswa |
| `alamat_siswa` | TEXT (Not Null) | Alamat Tempat Tinggal |
| `tgl_siswa` | TEXT (Not Null) | Tanggal Lahir / Siswa (YYYY-MM-DD) |
| `jurusan_siswa` | TEXT (Not Null) | Jurusan Siswa |
| `created_at` | DATETIME | Waktu pembuatan data |

---

## 🚀 Cara Menjalankan Backend

1. **Buka terminal dan masuk ke folder `backend`:**
   ```bash
   cd backend
   ```

2. **Install dependensi (jika belum):**
   ```bash
   npm install
   ```

3. **Jalankan server (mode development dengan auto-reload):**
   ```bash
   npm run dev
   ```
   Atau untuk mode production:
   ```bash
   npm start
   ```

4. Server akan berjalan di:
   ```
   http://localhost:5000
   ```

---

## 📡 Daftar Endpoint API (CRUD)

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/siswa` | Mengambil semua data siswa |
| `GET` | `/api/siswa/:id` | Mengambil detail satu data siswa berdasarkan ID |
| `POST` | `/api/siswa` | Menambahkan data siswa baru |
| `PUT` | `/api/siswa/:id` | Mengupdate data siswa berdasarkan ID |
| `DELETE` | `/api/siswa/:id` | Menghapus data siswa berdasarkan ID |

### Contoh Request Body (POST / PUT):
```json
{
  "kode_siswa": "SIS004",
  "nama_siswa": "Muhammad Rizky",
  "alamat_siswa": "Jl. Melati No. 12, Bandung",
  "tgl_siswa": "2006-08-20",
  "jurusan_siswa": "Rekayasa Perangkat Lunak"
}
```

---

## 📤 Push ke GitHub (Repository Terpisah)
1. Buat repository baru di GitHub untuk backend (misal: `tugas-backend-siswa`).
2. Jalankan perintah berikut di terminal:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "feat: inisialisasi backend CRUD data siswa dengan Express.js dan SQLite"
   git branch -M main
   git remote add origin https://github.com/<USERNAME-KAMU>/<NAMA-REPO-BACKEND>.git
   git push -u origin main
   ```
