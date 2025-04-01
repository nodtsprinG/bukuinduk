const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Models } = require('../models'); // Sesuaikan path ke model database
const process = require('process');
const SECRET_KEY = process.env.SECRET_KEY || 'secret123';

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
})

// Fungsi untuk menambahkan petugas
const addPetugas = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        // Cek apakah email sudah digunakan
        const existingUser = await Models.admin.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan petugas ke database dengan status inactive
        const newPetugas = await Models.admin.create({
            email,
            password: hashedPassword,
            username,
            role: 'petugas',
            status: 'inactive',
        });

        // Buat token aktivasi dengan JWT

        // Kirim email aktivasi
        await transporter.sendMail({
          from: '"Admin System" <your-email@gmail.com>',
          to: email,
          subject: 'Aktivasi Akun Petugas',
          html: `<p>Halo ${username},</p>
                 <p>Silakan klik link di bawah ini untuk mengaktifkan akun Anda:</p>
                 <a href="http://localhost:8080/admin/activate?email=${encodeURIComponent(email)}">Aktivasi Akun</a>
                 <p>Link ini berlaku selama 24 jam.</p>`,
      });
      
        res.status(201).json({ message: 'Petugas berhasil ditambahkan, cek email untuk aktivasi' });
    } catch (error) {
        console.error('Error creating petugas:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fungsi untuk aktivasi akun petugas
const activatePetugas = async (req, res) => {
  try {
      const { email } = req.query; // Ambil email dari query params

      if (!email) {
          return res.status(400).json({ message: "Email tidak valid" });
      }

      const petugas = await Models.admin.findOne({ where: { email } });

      if (!petugas) {
          return res.status(404).json({ message: "Petugas tidak ditemukan" });
      }

      if (petugas.status === "active") {
          return res.status(400).json({ message: "Akun sudah aktif" });
      }

      await Models.admin.update({ status: "active" }, { where: { email } });

      res.json({ message: "Akun berhasil diaktifkan, silakan login" });
  } catch (error) {
      console.error("Error activating account:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
  
module.exports = { addPetugas, activatePetugas };
