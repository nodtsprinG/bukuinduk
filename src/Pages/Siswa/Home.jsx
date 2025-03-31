import { Routes, Route, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/constan";

import CariNisn from "./search/cariNISN";
import DataSiswa from "./search/dataSiswa";
import Login from "./search/LoginSiswa";

// ========================== import halaman audit
import Ayah from "./data/Ayah";
import Biodata from "./data/Biodata";
import Hobi from "./data/Hobi";
import Ibu from "./data/Ibu";
import Kesehatan from "./data/Kesehatan";
import Pendidikan from "./data/Pendidikan";
import TempatTinggal from "./data/Tempattinggal";
import Wali from "./data/Wali";
import TambahAkun from "./data/Main";

// ========================== import halaman liat data
import Lbiodata from "./lihat-data/Biodata"
import LtempatTinggal from "./lihat-data/TempatTinggal"
import Lkesehatan from "./lihat-data/Kesehatan"
import Layah from "./lihat-data/Ayah"
import Libu from "./lihat-data/Ibu"
import Lwali from "./lihat-data/Wali"
import Lpendidikan from "./lihat-data/Pendidikan"
import Lhobi from "./lihat-data/Hobi"
import HalamanBelakang from "./lihat-data/halaman-belakang"

import {resetAll} from "../../utils/resetAll";

const HomeSiswa = () => {
  const navigate = useNavigate();
  const preparingAddData = () => {
    resetAll();
    navigate("/siswa/data/upload/akun");
  };
  const LihatData = () => {
    navigate("/siswa/login")
  }
  const Kembali = () => {
    navigate("/")
  }
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
      {/* Logo Sekolah */}
      <img
        src={`data:image/png;base64,${logo}`}
        alt="Logo Sekolah"
        className="w-40 h-40 rounded-full shadow-lg"
      />

      {/* Judul */}
      <div className="text-white text-center mt-5 max-w-md">
        <p className="font-header font-semibold text-xl opacity-80">
          "Buku Induk Virtual Akses Data dengan Mudah"
        </p>
        <p className="font-header font-bold text-3xl mt-2">
          Data Buku Induk Siswa {nama}
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col items-center mt-6 w-full max-w-md">
        <button
          onClick={preparingAddData}
          className="w-full py-3 text-sm font-bold rounded-lg bg-blue-600 text-white transition-all hover:bg-white hover:text-black shadow-md"
        >
          Daftar
        </button>

        <button
          onClick={LihatData}
          className="w-full py-3 text-sm font-bold rounded-lg bg-blue-600 text-white mt-2 transition-all hover:bg-white hover:text-black shadow-md"
        >
          Masuk
        </button>

        <button
          onClick={Kembali}
          className="w-full py-3 text-sm font-bold rounded-lg bg-blue-600 text-white mt-2 transition-all hover:bg-white hover:text-black shadow-md"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

//Audit system
const AddData = () => {
  return (
    <Routes>
      <Route exact path="/akun" element={<TambahAkun />} />
      <Route exact path="/biodata" element={<Biodata />} />
      <Route exact path="/tempattinggal" element={<TempatTinggal />} />
      <Route exact path="/kesehatan" element={<Kesehatan />} />
      <Route exact path="/pendidikan" element={<Pendidikan />} />
      <Route exact path="/ayah" element={<Ayah />} />
      <Route exact path="/ibu" element={<Ibu />} />
      <Route exact path="/wali" element={<Wali />} />
      <Route exact path="/hobi" element={<Hobi />} />
    </Routes>
  );
};

const LihatData = () => {
  return (
    <Routes>
      <Route exact path="/biodata" element={<Lbiodata />} />
      <Route exact path="/tempattinggal" element={<LtempatTinggal />} />
      <Route exact path="/kesehatan" element={<Lkesehatan />} />
      <Route exact path="/pendidikan" element={<Lpendidikan />} />
      <Route exact path="/ayah" element={<Layah />} />
      <Route exact path="/ibu" element={<Libu />} />
      <Route exact path="/wali" element={<Lwali />} />
      <Route exact path="/hobi" element={<Lhobi />} />
      <Route exact path="/perkembangan" element={<Lhobi />} />
      <Route exact path="/halaman-belakang" element={<HalamanBelakang />} />
    </Routes>
  );
}

const SiswaRouting = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeSiswa />} />
      {/* Halaman Cari */}
      <Route exact path="/cari" element={<CariNisn />} />
      <Route exact path="/result/:nisn" element={<DataSiswa />} />
      <Route exact path="/login" element={<Login />} />
      {/* Masukkan data NISN */}
      <Route exact path="/data/:action/*" element={<AddData />} />
      <Route exact path="/lihat-data/*" element={<LihatData />} />
    </Routes>
  );
};

export default SiswaRouting;
