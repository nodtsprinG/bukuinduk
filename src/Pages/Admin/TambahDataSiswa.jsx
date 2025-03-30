import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../../../assets/logosekolah.png"
import axios from "axios";
import GoBack from "../../../components/goback";

import { baseUrl } from "../../../utils/constan";

const TambahAkun = () => {
  const [jurusan, setJurusan] = useState([]);
  const [angkatan, setAngkatan] = useState([]);

  const [jurusanId, setJurusanId] = useState(0);
  const [angkatan_id, setAngkatan_id] = useState(0);
  const [nisn, setNisn] = useState("");

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(baseUrl + "/admin/jurusan")
      .then((res) => {
        const data = res.data;
        setJurusan(data);
        return axios.get(baseUrl + "/admin/angkatan");
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
      navigate(`/admin/dashboard`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-500 bg-no-repeat w-screen h-screen text-[24px]">
      <div className="flex flex-row items-center justify-center w-11/12">
        <div className="flex flex-col items-center justify-center w-1/2">
          <img src={Logo} alt="logo" className="w-44 aspect-square" />
          <p className="font-header text-white font-bold text-3xl text-center mt-3">
            Buku Induk
          </p>
        </div>
        <div className="bg-[#D9D9D9] w-1/2 px-10 py-9 rounded-md border-4 border-[#A4A4A4]">
          <p className="font-header font-bold text-3xl mt-2">Tambah Akun</p>
          <div className="flex flex-col mt-10 pt-10 border-t border-black">
            <label className="opacity-20">NISN</label>
            <input
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              className="bg-transparent border-b border-black focus:outline-none p-2"
            ></input>
            <label className="opacity-20 pt-5">Jurusan</label>
            <select
              value={jurusanId}
              onChange={(e) => setJurusanId(e.target.value)}
              className="bg-transparent border-b border-black focus:outline-none p-2"
              defaultValue={"default"}
            >
              <option value={"default"} hidden>
                Pilih
              </option>
              {jurusan.map((jrs) => {
                return <option value={jrs.id}>{jrs.nama}</option>;
              })}
            </select>
            <label className="opacity-20 pt-5">Angkatan</label>
            <select
              value={angkatan_id}
              onChange={(e) => setAngkatan_id(e.target.value)}
              className="bg-transparent border-b border-black focus:outline-none p-2"
              defaultValue={"default"}
            >
              <option value={"default"} hidden>
                Pilih
              </option>
              {angkatan.map((ank) => {
                return <option value={ank.id}>{ank.tahun}</option>;
              })}
            </select>
            <div className="flex flex-row pt-10 w-full">
              <div className="flex flex-row justify-start items-center w-1/2">
                <GoBack to={"/siswa"} className="font-header font-bold bg-[#0083FB] px-4 py-2 text-l text-white rounded-md" />
              </div>
              <div className="flex flex-row justify-end items-center w-1/2">
                <button
                  onClick={daftar}
                  className="font-header font-bold bg-[#0083FB] p-2 text-l text-white rounded-md"
                >
                  Tambah Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahAkun;
