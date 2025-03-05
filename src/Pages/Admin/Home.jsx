// ========================== Import library
// import axios from "axios";

// ========================== Import state

// ========================== import react-router
import { Routes, Route, useNavigate } from "react-router";
// import { Link } from "react-router-dom";

// ========================== import halaman autentikasi
import Login from "./auth/Login";
import Verify from "./auth/Verify";

import Dashboard from "./Dashboard";
import Pending from "./Pending"

import DataJurusan from "./data/DataJurusan";
import DataAngkatan from "./data/DataAngkatan";
import DataSiswa from "./data/DataSiswa";
import DataMapel from "./data/DataMapel"

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
import Logo from "../../assets/logosekolah.png"
import PendingDetail from "./PendingDetail";
const HomeAdmin = () => {
  const navigate = useNavigate();
  const check = () => {
    if (localStorage.getItem("token")) {
      navigate("/admin/auth/login");
    } else {
      navigate("/admin/auth/login");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-gray-500 bg-no-repeat w-screen h-screen">
      <img src={Logo} alt="Logo Sekolah" className="w-40 h-40"/>
      <div className="text-white">
        <p className="font-header font-bold text-center text-2xl">
          "Buku Induk Virtual Akses Data dengan Mudah"
        </p>
        <p className="font-header font-bold text-center text-4xl">
          Data Buku Induk Siswa SMKN 2 SINGOSARI
        </p>
        <div className="flex flex-col items-center mt-6 w-screen">
          <button
            onClick={check}
            className="block font-body font-bold bg-[#0C7FDA] text-center w-[715px] py-3 rounded-md text-white my-1 text-sm"
          >
            Masuk
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
      <Route exact path="/perkembangan" element={<Perkembangan />} />
      <Route exact path="/selesai" element={<Selesai />} />
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
      {/* [#] Halaman Input Data */}
      <Route exact path="/lihat/:id/*" element={<LihatData />} />
      {/* [#] Data Jurusan */}
      <Route exact path="/datajurusan" element={<DataJurusan />} />
      <Route exact path="/datasiswa" element={<DataSiswa />} />
      <Route exact path="/dataangkatan" element={<DataAngkatan />} />
      <Route exact path="/mapel" element={<DataMapel />} />
      <Route exact path="/pending" element={<Pending />} />
      <Route exact path="/pending/:id" element={<PendingDetail />} />
    </Routes>
  );
};

export default AdminRouting;
