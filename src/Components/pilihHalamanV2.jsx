import React from 'react'
import { Link } from 'react-router-dom'
const pilihHalamanV2 = () => {
  return (
    <div className='grid grid-cols-2 gap-10'>
      <div className='flex items-center justify-center px-2 py-2 bg-[#0C7FDA] rounded-md'>
        <Link to={'/siswa/lihat-data/biodata'} className='text-white'>Nigga</Link>
      </div>
      <div className='flex items-center justify-center px-2 py-2 bg-[#0C7FDA] rounded-md'>
        <Link to={'/siswa/lihat-data/halaman-belakang'} className='text-white'>Halaman Belakang</Link>
      </div>
    </div>
  )
}

export default pilihHalamanV2