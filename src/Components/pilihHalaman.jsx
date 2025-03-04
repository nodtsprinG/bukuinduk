import React from 'react'
import { Link, } from 'react-router-dom'

const id = localStorage.getItem('akun-id')
const pilihHalaman = () => {
  return (
    <div className='grid grid-cols-2 gap-10'>
      <div className='flex items-center justify-center px-2 py-2 bg-[#0C7FDA] rounded-sm'>
        <Link to={`/admin/lihat/${id}/biodata`} className='text-white'>Halaman Depan</Link>
      </div>
      <div className='flex items-center justify-center px-2 py-2 bg-[#0C7FDA] rounded-sm'>
        <Link to={`/admin/lihat/${id}/halaman-belakang`} className='text-white'>Halaman Belakang</Link>
      </div>
    </div>
  )
}

export default pilihHalaman