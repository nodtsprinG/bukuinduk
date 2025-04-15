// ========================== Import library
import axios from "axios";

import { useState, useEffect } from "react";

import { baseUrl } from "../../utils/constan";
import { Routes, Route, useNavigate } from "react-router";
// import { Link } from "react-router-dom";

// ========================== import halaman autentikasi
import Login from "./auth/Login";
import Verify from "./auth/Verify";
import VerifyToken from "./auth/VerifikasiToken";
import Aktivasi from "./auth/Aktivasi";

import Dashboard from "./Dashboard";
import Pending from "./Pending"
import Unverified from "./Unverified"

import DataJurusan from "./data/DataJurusan";
import DataAngkatan from "./data/DataAngkatan";
import DataSiswa from "./data/DataSiswa";
import DataMapel from "./data/DataMapel";
import DataPetugas from "./data/DataPetugas"
import DataSekolah from "./data/DataSekolah"

import Lbiodata from "./lihat-data/Biodata"
import LtempatTinggal from "./lihat-data/TempatTinggal"
import Lkesehatan from "./lihat-data/Kesehatan"
import Layah from "./lihat-data/Ayah"
import Libu from "./lihat-data/Ibu"
import Lwali from "./lihat-data/Wali"
import Lpendidikan from "./lihat-data/Pendidikan"
import Lhobi from "./lihat-data/Hobi"
import Perkembangan from "./lihat-data/perkembangan"
import Selesai from "./lihat-data/Selesai"
import LHalamanBelakang from './lihat-data/halaman-belakang'
import PendingDetail from "./PendingDetail";
import TambahSiswa from "./PendingDetail"
const HomeAdmin = () => {
  const navigate = useNavigate();
  const check = () => {
    if (localStorage.getItem("token")) {
      navigate("/admin/auth/login");
    } else {
      navigate("/admin/auth/login");
    }
  };
  const Kembali = () => {
    navigate ("/");
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
      {/* Gunakan logo dari API jika tersedia, jika tidak pakai default */}
      <img
        src={`data:image/png;base64,${logo}`}
        alt="Logo Sekolah"
        className="w-40 h-40 rounded-full shadow-lg"
      />
      <div className="text-white">
        <p className="font-header font-bold text-center text-2xl">
          "Buku Induk Virtual Akses Data dengan Mudah"
        </p>
        <p className="font-header font-bold text-center text-4xl">
          Data Buku Induk Siswa {nama}
        </p>
        <div className="flex flex-col items-center mt-6 w-screen">
          <button
            onClick={check}
            className="block font-body font-bold bg-blue-600 text-center w-[715px] py-3 rounded-md text-white my-1 hover:bg-white hover:text-black text-sm"
          >
            Masuk
          </button>
          <button
            onClick={Kembali}
            className="block font-body font-bold bg-blue-600 text-center w-[715px] py-3 rounded-md text-white my-1 hover:bg-white hover:text-black text-sm"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
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
      <Route exact path="/perkembangansiswa" element={<Perkembangan />} />
      <Route exact path="/selesaipend" element={<Selesai />} />
      {/* <Route exact path="/hobi" element={<Perkembangan />} /> */}
      <Route exact path="/halaman-belakang" element={<LHalamanBelakang />} />
    </Routes>
  );
}

const AdminRouting = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeAdmin />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      {/* [#] Auth */}
      <Route exact path="/auth/login" element={<Login />} />
      <Route exact path="/auth/verification/:code" element={<Verify />} />
      <Route exact path="/auth/aktivasi" element={<Aktivasi />} />
      <Route exact path="/verify/:token" element={<VerifyToken />} />
      {/* [#] Halaman Input Data */}
      <Route exact path="/lihat/:id/*" element={<LihatData />} />
      <Route exact path="/tambah" element={<TambahSiswa />} />
      {/* [#] Data Jurusan */}
      <Route exact path="/datajurusan" element={<DataJurusan />} />
      <Route exact path="/data-sekolah" element={<DataSekolah />} />
      <Route exact path="/datasiswa" element={<DataSiswa />} />
      <Route exact path="/dataangkatan" element={<DataAngkatan />} />
      <Route exact path="/mapel" element={<DataMapel />} />
      <Route exact path="/petugas" element={<DataPetugas />} />
      <Route exact path="/pending" element={<Pending />} />
      <Route exact path="/unverified" element={<Unverified />} />
      <Route exact path="/pending/:id" element={<PendingDetail />} />
    </Routes>
  );
};

export default AdminRouting;
