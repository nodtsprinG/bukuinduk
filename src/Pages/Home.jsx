import { Link } from "react-router-dom";
import axios from 'axios'
import { baseUrl } from "../utils/constan";
import { useEffect, useState } from "react";
const Home = () => {
    const [nama, setNama] = useState("");
    const [logo, setLogo] = useState(null);
    useEffect(() => {
        axios.get(baseUrl + "/data-sekolah")
          .then((res) => {
            console.log("Data user:", res.data); // Debugging
            setNama(res.data.nama);
            setLogo(res.data.logo);
          })
          .catch((err) => console.error("Gagal mengambil data sekolah:", err));
      }, []);

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-gray-600 to-gray-900 w-screen h-screen">
            <div className="text-white flex flex-col justify-center items-center ">
                {/* Gunakan logo dari API jika tersedia, jika tidak pakai default */}
                <img
                    src={`data:image/png;base64,${logo}`}
                    alt="Logo Sekolah"
                    className="w-40 h-40 rounded-full shadow-lg"
                />
                <p className="font-header font-bold text-center text-2xl">Buku Induk Virtual Akses Data dengan Mudah</p>
                <p className="font-header font-bold text-center text-4xl">Data Buku Induk Siswa { nama || "Masukkan Nama Sekolah / Instansi"}</p>
                <div className="flex flex-col items-center mt-6 w-screen">
                    <Link to={"/siswa/login"} className="block font-body font-bold bg-blue-600 text-center w-[715px] hover:bg-[#D9D9D9] py-3 hover:text-black rounded-md text-white my-1 text-sm">Masuk sebagai Siswa</Link>
                    <Link to={"/admin/auth/login/"} className="block font-body font-bold bg-blue-600 text-center w-[715px] hover:bg-[#D9D9D9] py-3 hover:text-black rounded-md text-white my-1 text-sm">Masuk sebagai Admin</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;