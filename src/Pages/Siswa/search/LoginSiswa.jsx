import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import { baseUrl } from "../../../utils/constan";
import { useEffect } from "react";
// import GoBack from "../../../components/goback"
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 px-4">
      <div className="flex flex-col md:flex-row items-center w-full max-w-3xl bg-white shadow-2xl rounded-lg overflow-hidden">
        
        {/* Bagian Kiri - Logo */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 py-10 px-6">
          <img
            src={`data:image/png;base64,${logo}`}
            alt="Logo Sekolah"
            className="w-40 h-40 rounded-full shadow-lg"
          />
          <p className="text-black font-bold text-2xl mt-4 text-center">{nama}</p>
        </div>

        {/* Bagian Kanan - Form Login */}
        <div className="w-full md:w-1/2 px-10 py-12">
          <p className="font-header font-bold text-3xl">Masuk</p>
          <div className="flex flex-col mt-4 border-t border-gray-400 pt-6">
            <label className="text-gray-700 font-semibold">NISN</label>
            <input
              type="text"
              onChange={(e) => setNisn(e.target.value)}
              className="bg-transparent border border-gray-400 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Masukkan NISN"
            />
            
            <label className="text-gray-700 font-semibold mt-4">
              Tanggal Lahir
            </label>
            <input
              type="date"
              onChange={(e) => setTanggalLahir(e.target.value)}
              className="bg-transparent border border-gray-400 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            
            <div className="flex flex-row pt-8 w-full">
              <button
                onClick={() => navigate("/")}
                className="font-header font-bold bg-gray-500 px-4 py-2 text-white rounded-md hover:bg-gray-700 transition-all"
              >
                Kembali
              </button>
              <button
                onClick={verify}
                className="ml-auto font-header font-bold bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-800 transition-all"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login;