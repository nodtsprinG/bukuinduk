/* eslint-disable no-undef */
const { Router } = require('express')
const { Models } = require('../models')
const { v4: uuidv4 } = require('uuid')
const {
  loginRequest,
  getMeRequest,
  loginSiswaRequest,
  codeAdminRequest,
} = require('../DTO/login-request')
const { activatePetugas } = require('../DTO/admin-petugas')
const nodemailer = require('nodemailer')
const dotEnv = require('dotenv')
dotEnv.config()

const router = Router()

function generateRandomCode(length = 5) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomCode = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomCode += characters.charAt(randomIndex)
  }

  return randomCode
}

/**
 * POST /auth/login-admin
 * @summary Login Admin dan kirimkan kode verifikasi melalui email
 * @tags admin
 * @param {string} request.body.email.required - Email admin yang terdaftar
 * @param {string} request.body.password.required - Password admin yang terdaftar
 * @return {object} 200 - Kode verifikasi dikirimkan ke email - application/json
 * @return {object} 404 - Password atau email salah - application/json
 * @return {object} 500 - Terjadi kesalahan pengiriman email - application/json
 * @example request - Login Admin
 * {
 *   "email": "admin@example.com",
 *   "password": "admin123"
 * }
 * @example response - 200 - Kode verifikasi berhasil dikirimkan
 * {
 *   "code": "123456"
 * }
 * @example response - 404 - Email atau password salah
 * {
 *   "message": "Password atau Email Salah"
 * }
 * @example response - 500 - Kesalahan dalam pengiriman email
 * {
 *   "message": "Error : Error send email .env is required, EMAIL, PASSWORD"
 * }
 */
router.post('/login-admin', loginRequest, async (req, res) => {
  const { email, password } = req.body

  console.log(process.env.EMAIL)

  const data = await Models.admin.findOne({
    where: {
      email,
      password,
    },
  })

  console.log(data)

  if (data == undefined) {
    res.status(404).json({ message: 'Password atau Email Salah' })
    return
  }

  data.code = generateRandomCode()
  data.token = null
  await data.save()

  try {
    if (process.env.EMAIL == undefined) throw new Error()

    const trasnport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })

    const response = trasnport.sendMail({
      from: process.env.EMAIL,
      to: data.email,
      subject: 'Buku Induk Code',
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Kode Verifikasi Login</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f7f7f7;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
            }
            .header img {
              max-width: 100px;
            }
            .content {
              margin: 20px 0;
            }
            .content h1 {
              font-size: 24px;
              color: #333333;
            }
            .content p {
              font-size: 16px;
              color: #666666;
              line-height: 1.5;
            }
            .verification-code {
              display: block;
              width: fit-content;
              margin: 20px auto;
              padding: 10px 20px;
              background-color: #4caf50;
              color: #ffffff;
              font-size: 18px;
              border-radius: 5px;
              text-align: center;
              text-decoration: none;
            }
            .footer {
              text-align: center;
              padding: 20px 0;
              font-size: 12px;
              color: #aaaaaa;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://smkn2-singosari.sch.id/wp-content/uploads/2021/10/cropped-logo-2.png" alt="Company Logo" />
            </div>
            <div class="content">
              <h1>Kode Verifikasi Login</h1>
              <p>Halo ${data.username},</p>
              <p>Untuk melanjutkan login, silakan masukkan kode verifikasi berikut:</p>
              <div class="verification-code">${data.code}</div>
              <p>Jika Anda tidak meminta kode ini, abaikan email ini.</p>
              <p>Terima kasih,</p>
              <p>Tim Rekayasa Perangkat Lunak</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Rekayasa Perangkat Lunak. Semua Hak Cipta Dilindungi.</p>
            </div>
          </div>
        </body>
      </html>`,
    })
  } catch (ex) {
    console.log('Error : Error send email .env is required, EMAIL, PASSWORD')
  }

  res.json({ code: data.code })
})

/**
 * POST /auth/code-admin
 * @summary Verifikasi Kode OTP untuk Login Admin
 * @tags admin
 * @param {string} request.body.code.required - Kode OTP yang dikirimkan ke email admin
 * @return {object} 200 - Token berhasil dibuat dan dikirimkan - application/json
 * @return {object} 404 - Kode OTP salah - application/json
 * @return {object} 500 - Terjadi kesalahan pada server - application/json
 * @example request - Verifikasi Kode OTP Admin
 * {
 *   "code": "123456"
 * }
 * @example response - 200 - Token berhasil dibuat
 * {
 *   "id": 1,
 *   "username": "adminuser",
 *   "email": "admin@example.com",
 *   "token": "newly-generated-token"
 * }
 * @example response - 404 - Kode OTP salah
 * {
 *   "message": "Kode OTP Salah"
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "message": "Internal server error"
 * }
 */
router.post('/code-admin', codeAdminRequest, async (req, res) => {
  try {
    const { code } = req.body
    const data = await Models.admin.findOne({
      where: {
        code,
      },
    })

    if (data == undefined) {
      res.status(404).json({ message: 'Kode OTP Salah' })
      return
    }

    data.token = uuidv4()
    data.code = null
    await data.save()

    res.json({
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      token: data.token,
    })
  } catch (ex) {
    if (ex) console.log(ex)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * POST /auth/login-siswa
 * @summary Melakukan login untuk siswa dengan memverifikasi NISN dan tanggal lahir
 * @tags siswa
 * @param {string} request.body.nisn.required - Nomor Induk Siswa Nasional (NISN) siswa
 * @param {string} tanggal_request.body.lahir.required - Tanggal lahir siswa
 * @return {object} 200 - Response sukses dengan token baru dan data siswa - application/json
 * @return {object} 200 - Data tidak ditemukan atau tidak cocok - application/json
 * @return {object} 500 - Terjadi kesalahan pada server - application/json
 * @example request - Login dengan NISN dan Tanggal Lahir
 * {
 *   "nisn": "1234567890",
 *   "tanggal_lahir": "2005-01-01"
 * }
 * @example response - 200 - Login sukses dengan token baru
 * {
 *   "isMatch": true,
 *   "id": 1,
 *   "full_name": "John Doe",
 *   "token": "newly-generated-token"
 * }
 * @example response - 200 - Data tidak ditemukan atau tidak cocok
 * {
 *   "isMatch": false,
 *   "message": "Data tidak ditemukan atau tidak cocok."
 * }
 * @example response - 500 - Kesalahan pada server
 * {
 *   "message": "Terjadi kesalahan pada server."
 * }
 */
router.post('/login-siswa', loginSiswaRequest, async (req, res) => {
  const { nisn, tanggal_lahir } = req.body

  try {
    const data = await Models.user.findOne({
      include: [
        {
          model: Models.data_diri,
          as: 'data_diri',
          where: {
            tanggal_lahir,
          },
        },
      ],
      where: { nisn },
    })

    if (!data) {
      return res.status(200).json({
        isMatch: false,
        message: 'Data tidak ditemukan atau tidak cocok.',
      })
    }

    data.token = uuidv4()
    await data.save()

    return res.status(200).json({
      isMatch: true,
      id: data.id,
      full_name: data.data_diri.nama_lengkap,
      token: data.token,
    })
  } catch (error) {
    console.error('Gagal login siswa:', error)
    res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
  }
})

/**
 * GET /auth/me
 * @summary Mengambil informasi admin yang sedang login berdasarkan token
 * @tags admin
 * @security BearerAuth
 * @return {Admin} 200 - Response sukses dengan data admin - application/json
 * @return {object} 401 - Unauthorized response jika token tidak valid - application/json
 * @example response - 200 - Sukses mengambil data admin
 * {
 *   "id": 1,
 *   "username": "admin_user",
 *   "email": "admin@example.com",
 *   "token": "valid-token"
 * }
 * @example response - 401 - Unauthorized, token tidak valid
 * {
 *   "message": "Unauthorised"
 * }
 */
router.get('/me', getMeRequest, async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  const admin = await Models.admin.findOne({
    where: {
      token,
    },
    attributes: ['id', 'username', 'email', 'token', "role"],
  })
  if (admin != undefined) {
    res.json(admin)
    return
  } else res.status(401).json({ message: 'Unauthorised' })
})

router.get('/activate', activatePetugas);

module.exports = router
