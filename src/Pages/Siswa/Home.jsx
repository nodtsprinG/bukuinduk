import { Routes, Route, useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
import GoBack from "../../Components/goback"

// ========================== import halaman liat data
import Lbiodata from "./lihat-data/Biodata"
import LtempatTinggal from "./lihat-data/TempatTinggal"
import Lkesehatan from "./lihat-data/Kesehatan"
import Layah from "./lihat-data/Ayah"
import Libu from "./lihat-data/Ibu"
import Lwali from "./lihat-data/Wali"
import Lpendidikan from "./lihat-data/Pendidikan"
import Lhobi from "./lihat-data/Hobi"
import Perkembangan from "./lihat-data/perkembangan"
import HalamanBelakang from "./lihat-data/halaman-belakang"

import resetAll from "../../Utils/resetAll";

import Logo from "../../assets/logosekolah.png"

const HomeSiswa = () => {
  const navigate = useNavigate();
  const preparingAddData = () => {
    resetAll();
    navigate("/siswa/data/upload/akun");
  };



  return (
    <div className="flex flex-col justify-center items-center bg-homepage bg-no-repeat w-screen h-screen">
      <img src={Logo} alt="Logo Sekolah" className="w-40 h-40"/>
      <div className="text-white">
        <p className="font-header font-bold text-center text-2xl mt-5">
          "Buku Induk Virtual Akses Data dengan Mudah"
        </p>
        <p className="font-header font-bold text-center text-4xl">
          Data Buku Induk Siswa SMKN 2 SINGOSARI
        </p>
        <div className="flex flex-col items-center mt-6 w-screen">
          <button
            onClick={preparingAddData}
            className="block font-body font-bold bg-[#D9D9D9] text-center w-[715px] py-3 rounded-md text-black my-1 text-sm"
          >
            Daftar
          </button>
          <Link
            to={"/siswa/login"}
            className="block font-body font-bold bg-[#0C7FDA] text-center w-[715px] py-3 rounded-md text-white my-1 text-sm"
          >
            Masuk
          </Link>
          <GoBack to={"/"} className="block font-body font-bold bg-gray-900 text-center w-[715px] py-3 rounded-md text-white my-1 text-sm" />
        </div>
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
      <Route exact path="/hobi" element={<Perkembangan />} />
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
