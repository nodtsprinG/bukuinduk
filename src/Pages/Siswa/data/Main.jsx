import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Logo from "../../../assets/logosekolah.png"
import axios from "axios";
import { Listbox } from "@headlessui/react";
import { baseUrl } from "../../../utils/constan";

const TambahAkun = () => {
  const params = useParams();
  const [jurusan, setJurusan] = useState([]);
  const [angkatan, setAngkatan] = useState([]);

  const [jurusanId, setJurusanId] = useState(0);
  const [angkatan_id, setAngkatan_id] = useState(0);
  const [nisn, setNisn] = useState("");

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(baseUrl + "/siswa/jurusan")
      .then((res) => {
        const data = res.data;
        setJurusan(data);
        return axios.get(baseUrl + "/siswa/angkatan");
      })
      .then((res) => {
        const data = res.data;
        setAngkatan(data);
      });
  };

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("akun-nisn"))
      setNisn(localStorage.getItem("akun-nisn"));
    if (localStorage.getItem("akun-jurusanId"))
      setJurusanId(localStorage.getItem("akun-jurusanId"));
    if (localStorage.getItem("akun-angkatanId"))
      setAngkatan_id(localStorage.getItem("akun-angkatanId"));
  }, []);

  useEffect(fetchData, []);

  const daftar = () => {
    console.log(nisn, jurusanId, angkatan_id);
    if (jurusanId && !isNaN(angkatan_id) & !isNaN(nisn)) {
      localStorage.setItem("akun-nisn", nisn);
      localStorage.setItem("akun-jurusanId", jurusanId);
      localStorage.setItem("akun-angkatanId", angkatan_id);
      navigate(`/siswa/data/${params.action}/biodata`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  const back = () => {
    localStorage.clear();
    navigate("/siswa/login")
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 w-screen h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-row w-3/5">

        <div className="flex flex-col items-center justify-center w-1/2 border-r border-r-gray-400 pr-6">
          <img src={Logo} alt="Logo Sekolah" className="w-32 aspect-square" />
          <p className="text-xl font-bold mt-3">SMKN 2 Singosari</p>
        </div>

        <div className="flex flex-col w-1/2 pl-6">
          <p className="text-2xl font-bold mb-4">Tambah Akun</p>
          <label className="text-gray-600 text-sm">NISN</label>
          <input
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring focus:ring-gray-300"
            placeholder="Masukkan NISN"
          />
          <label className="text-gray-600 text-sm mb-1">Jurusan</label>
          <Listbox value={jurusanId} onChange={(value) => setJurusanId(value)}>
            <div className="relative mb-4">
              <Listbox.Button className="w-full rounded border border-gray-300 bg-white p-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                {jurusan.find((j) => j.id == jurusanId)?.nama || "Pilih Jurusan"}
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {jurusan.map((jrs) => (
                  <Listbox.Option
                    key={jrs.id}
                    value={jrs.id}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                  >
                    {jrs.nama}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <label className="text-gray-600 text-sm mb-1">Angkatan</label>
          <Listbox value={angkatan_id} onChange={(value) => setAngkatan_id(value)}>
            <div className="relative mb-4">
              <Listbox.Button className="w-full rounded border border-gray-300 bg-white p-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                {angkatan.find((a) => a.id == angkatan_id)?.tahun || "Pilih Angkatan"}
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {angkatan.map((ank) => (
                  <Listbox.Option
                    key={ank.id}
                    value={ank.id}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                  >
                    {ank.tahun}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
          <div className="flex justify-between mt-4">
            <button
              onClick={back}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Kembali
            </button>
            <button
              onClick={daftar}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Tambah Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahAkun;
