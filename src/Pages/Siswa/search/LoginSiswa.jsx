import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import Logo from "../../../assets/logosekolah.png"
import { baseUrl } from "../../../utils/constan";
import GoBack from "../../../components/goback"
import detailPreparing from "../../../utils/detailForSiswa";
const Login = () => {
  const [nisn, setNisn] = useState("")
  const [tanggal_lahir, setTanggalLahir] = useState("")

  const navigate = useNavigate()

  const verify = async (id) => {
    if (nisn.length === 0) {
      alert("NISN kosong");
      return;
    }
    if (tanggal_lahir.length === 0) {
      alert("Tanggal lahir kosong");
      return;
    }

    try {
      const response = await axios.post(baseUrl + "/auth/login-siswa", {
        nisn,
        tanggal_lahir,
      });
      detailPreparing(id)
      console.log(response)
      if (response.data.isMatch) {
        const siswaId = response.data.id;
        // Jika data cocok, arahkan ke halaman /siswa/lihat-data
        navigate(`/siswa/lihat-data/biodata`);
        localStorage.setItem("akun-nisn", nisn)
        localStorage.setItem("akun-id", siswaId)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("biodata-tanggal-lahir", tanggal_lahir)
      } else {
        // Jika data tidak cocok, arahkan ke halaman /siswa/data/upload/akun
        navigate("/siswa/data/upload/akun");
      }
    } catch (error) {
      console.error("Gagal login:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-homepage bg-no-repeat w-screen h-screen">
      <div className="flex flex-row items-center justify-center w-11/12">
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={Logo} alt="Logo Sekolah" className="w-44" />
          <p className="font-header text-white font-bold text-3xl text-center mt-3">Buku Induk</p>
        </div>
        <div className="bg-[#D9D9D9] w-1/2 px-10 py-9 rounded-md border-4 border-[#A4A4A4]">
          {/* <p className="font-body opacity-30 text-sm">Langkah 1 dari 2</p> */}
          <p className="font-header font-bold text-3xl mt-2">Masuk</p>
          <div className="flex flex-col mt-10 pt-10 border-t border-black">
            <label className="opacity-20">NISN</label>
            <input onChange={(e) => setNisn(e.currentTarget.value)} className="bg-transparent border-b border-black focus:outline-none p-2"></input>
            <label className="opacity-20 pt-5">Tanggal Lahir</label>
            <input onChange={(e) => setTanggalLahir(e.currentTarget.value)} className="bg-transparent border-b border-black focus:outline-none p-2" type="date"></input>
            <div className="flex flex-row pt-10 w-full">
              <div className="flex flex-row justify-start items-center w-1/2">
                <GoBack to={"/siswa"} className="font-header font-bold bg-[#0083FB] px-4 py-2 text-l text-white rounded-md" />
              </div>
              <div className="flex flex-row justify-end items-center w-1/2">
                <button onClick={verify} className="font-header font-bold bg-[#0083FB] px-4 py-2 text-l text-white rounded-md">Masuk</button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login;