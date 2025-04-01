'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tempat_tinggal', [
      {
        alamat: 'JL Raya Tunjungtirto No. 10',
        no_telepon: '081234567890',
        tinggal_dengan: 'ortu',
        jarak_ke_sekolah: '5',
        user_id: 1,
      },
      {
        alamat: 'JL Raya Tunjungtirto No. 15',
        no_telepon: '082345678901',
        tinggal_dengan: 'ortu', 
        jarak_ke_sekolah: '3',
        user_id: 2,
      },
      {
        alamat: 'JL Raya Tunjungtirto No. 20',
        no_telepon: '083456789012',
        tinggal_dengan: 'saudara', 
        jarak_ke_sekolah: '7',
        user_id: 3,
      },
      {
        alamat: 'JL Raya Tunjungtirto No. 25',
        no_telepon: '084567890123',
        tinggal_dengan: 'ortu', 
        jarak_ke_sekolah: '4',
        user_id: 4,
      },
      {
        alamat: 'JL Raya Tunjungtirto No. 30',
        no_telepon: '085678901234',
        tinggal_dengan: 'ortu',
        jarak_ke_sekolah: '6',
        user_id: 5,
      },
      {
        alamat: 'JL Raya Tunjungtirto No. 35',
        no_telepon: '086789012345',
        tinggal_dengan: 'saudara',
        jarak_ke_sekolah: '2',
        user_id: 6,
      },
      {
        alamat: 'JL Raya Tunjungtirto No. 40',
        no_telepon: '087890123456',
        tinggal_dengan: 'ortu',
        jarak_ke_sekolah: '8',
        user_id: 7,
      },
      {
        alamat: 'JL Raya Tunjungtirto No. 45',
        no_telepon: '088901234567',
        tinggal_dengan: 'wali',
        jarak_ke_sekolah: '5',
        user_id: 8,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tempat_tinggal', null, {})
  },
}
