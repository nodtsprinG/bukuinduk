const { Router } = require('express')
const { Models } = require('../../models')
const { addPetugas, activatePetugas } = require('../../DTO/admin-petugas')
const router = Router()

/**
 * POST /admin/petugas
 * @summary Create a new petugas
 * @tags admin
 * @param {string} request.body.email.required - Email of the petugas
 * @param {string} request.body.password.required - Password for the petugas
 * @param {string} request.body.username.required - Username for the petugas
 * @return {object} 201 - Petugas created successfully - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example request - Example input for creating a petugas
 * {
 *   "email": "newpetugas@example.com",
 *   "password": "securepassword",
 *   "username": "newpetugas"
 * }
 * @example response - 201 - Petugas created
 * {
 *   "id": 1,
 *   "email": "newpetugas@example.com",
 *   "username": "newpetugas",
 *   "role": "petugas"
 * }
 */
// router.post('/petugas', async (req, res) => {
//   try {
//     const { email, password, username } = req.body

//     const newPetugas = await Models.admin.create({
//       email,
//       password,
//       username,
//       role: 'petugas', 
//     })

//     res.status(201).json(newPetugas)
//   } catch (error) {
//     console.error('Error creating petugas:', error)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// })
// Endpoint untuk menambahkan petugas
router.post('/petugas', addPetugas);

// Endpoint aktivasi akun petugas



/**
 * GET /admin/petugas
 * @summary Get all petugas
 * @tags admin
 * @return {array<object>} 200 - List of petugas - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example response - 200 - List of petugas
 * [
 *   {
 *     "id": 1,
 *     "email": "petugas1@example.com",
 *     "username": "petugas1",
 *     "role": "petugas"
 *   },
 *   {
 *     "id": 2,
 *     "email": "petugas2@example.com",
 *     "username": "petugas2",
 *     "role": "petugas"
 *   }
 * ]
 */
router.get('/petugas', async (req, res) => {
  try {
    const petugasList = await Models.admin.findAll({
      where: { role: 'petugas', status: 'active' },
    })

    res.json(petugasList)
  } catch (error) {
    console.error('Error fetching petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * PUT /admin/petugas/{id}
 * @summary Update a petugas
 * @tags admin
 * @param {string} id.path.required - ID of the petugas to update
 * @param {string} request.body.email - New email for the petugas
 * @param {string} request.body.password - New password for the petugas
 * @param {string} request.body.username - New username for the petugas
 * @return {object} 200 - Petugas updated successfully - application/json
 * @return {object} 404 - Petugas not found - application/json
 * @return {object} 500 - Internal server error - application/json
 * @example request - Example input for updating a petugas
 * {
 *   "email": "updatedpetugas@example.com",
 *   "password": "newpassword",
 *   "username": "updatedpetugas"
 * }
 * @example response - 200 - Petugas updated
 * {
 *   "id": 1,
 *   "email": "updatedpetugas@example.com",
 *   "username": "updatedpetugas",
 *   "role": "petugas"
 * }
 */
router.put('/petugas/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { email, password, username } = req.body

    const petugas = await Models.admin.findOne({
      where: { id, role: 'petugas' },
    })

    if (!petugas) {
      return res.status(404).json({ message: 'Petugas not found' })
    }

    petugas.email = email || petugas.email
    petugas.password = password || petugas.password
    petugas.username = username || petugas.username

    await petugas.save()

    res.json(petugas)
  } catch (error) {
    console.error('Error updating petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

/**
 * DELETE /admin/petugas/{id}
 * @summary Delete a petugas
 * @tags admin
 * @param {string} id.path.required - ID of the petugas to delete
 * @return {object} 204 - Petugas deleted successfully - application/json
 * @return {object} 404 - Petugas not found - application/json
 * @return {object} 500 - Internal server error - application/json
 */
router.delete('/petugas/:id', async (req, res) => {
  try {
    const { id } = req.params

    const petugas = await Models.admin.findOne({
      where: { id, role: 'petugas' },
    })

    if (!petugas) {
      return res.status(404).json({ message: 'Petugas not found' })
    }

    await petugas.destroy()

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting petugas:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
