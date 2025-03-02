import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Logo from "../../../assets/logosekolah.png";
import { baseUrl } from "../../../utils/constan";

const TambahAkun = () => {
  const params = useParams();
  const [jurusan, setJurusan] = useState([]);
  const [angkatan, setAngkatan] = useState([]);
  const [jurusan_id, setJurusan_id] = useState(0);
  const [angkatan_id, setAngkatan_id] = useState(0);
  const [nisn, setNisn] = useState("");
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(baseUrl + "/siswa/jurusan")
      .then((res) => {
        setJurusan(res.data);
        return axios.get(baseUrl + "/siswa/angkatan");
      })
      .then((res) => {
        setAngkatan(res.data);
        setNisn(localStorage.getItem("akun-nisn") || "");
        setJurusan_id(localStorage.getItem("akun-jurusanId") || 0);
        setAngkatan_id(localStorage.getItem("akun-angkatanId") || 0);
      });
  };

  useEffect(fetchData, []);

  const daftar = () => {
    if (jurusan_id && !isNaN(angkatan_id) && !isNaN(nisn)) {
      localStorage.setItem("akun-nisn", nisn);
      localStorage.setItem("akun-jurusanId", jurusan_id);
      localStorage.setItem("akun-angkatanId", angkatan_id);
      navigate(`/admin/audit/${params.id}/biodata`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-b from-blue-200 to-purple-300">
      <div className="flex flex-row items-center justify-center w-11/12 max-w-4xl">
        <div className="flex flex-col items-center w-1/2">
          <img src={Logo} alt="Logo Sekolah" className="w-44 aspect-square" />
          <p className="font-bold text-3xl text-white mt-3">Buku Induk</p>
        </div>
        <div className="bg-white w-1/2 px-10 py-9 rounded-2xl shadow-lg">
          <p className="font-bold text-2xl mb-5">Informasi Siswa</p>
          <div className="flex flex-col space-y-6">
            <div>
              <label className="text-gray-600">NISN</label>
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              />
            </div>
            <div>
              <label className="text-gray-600">Jurusan</label>
              <select
                value={jurusan_id}
                onChange={(e) => setJurusan_id(e.target.value)}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              >
                <option value="default" hidden>
                  Pilih Jurusan
                </option>
                {jurusan.map((jrs) => (
                  <option key={jrs.id} value={jrs.id}>
                    {jrs.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-600">Angkatan</label>
              <select
                value={angkatan_id}
                onChange={(e) => setAngkatan_id(e.target.value)}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              >
                <option value="default" hidden>
                  Pilih Angkatan
                </option>
                {angkatan.map((ank) => (
                  <option key={ank.id} value={ank.id}>
                    {ank.tahun}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={daftar}
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahAkun;