import { Link } from "react-router-dom";
import Logo from '../assets/logosekolah.png'
const Home = () => {
    return (
        <div className="flex justify-center items-center bg-gray-500 w-full h-screen">
            <div className="text-white flex flex-col justify-center items-center ">
                <img src={Logo} alt="Logo Sekolah" className="w-40 h-40"/>
                <p className="font-header font-bold text-center text-2xl">Buku Induk Virtual Akses Data dengan Mudah</p>
                <p className="font-header font-bold text-center text-4xl">Data Buku Induk Siswa SMKN 2 SINGOSARI</p>
                <div className="flex flex-col items-center mt-6 w-screen">
                    <Link to={"/siswa/"} className="block font-body font-bold bg-[#D9D9D9] text-center w-[715px] py-3 rounded-md text-black my-1 text-sm">Masuk sebagai Siswa</Link>
                    <Link to={"/admin/"} className="block font-body font-bold bg-[#0C7FDA] text-center w-[715px] py-3 rounded-md text-white my-1 text-sm">Masuk sebagai Admin</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;