/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useNavigate, useParams } from "react-router";

/* 

=====================================================================================================
                    D A T A _ P E N D I D I K A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const Pendidikan = () => {
  const navigate = useNavigate();
  const params = useParams()

  const [tanggal, setTanggal] = useState(new Date());

  const [tamatan, setTamatan] = useState("");
  const [tanggalIjazah, setTanggalIjazah] = useState("")
  const [nomorijazah, setNomorijazah] = useState("");
  const [tanggalSkhun, setTanggalSkhun] = useState("");
  const [nomorskhun, setNomorSKHUN] = useState("")
  const [darisekolah, setDarisekolah] = useState("");
  const [alasan, setAlasan] = useState("");
  const [bidangkeahlian, setBidangkeahlian] = useState("");
  const [programkeahlian, setProgramkeahlian] = useState("");
  const [paketkeahlian, setPaketkeahlian] = useState("");
  const [kelas, setKelas] = useState(0);
  const [lamabelajar, setLamabelajar] = useState("")

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("pendidikan-tanggal"))
      setTanggal(localStorage.getItem("pendidikan-tanggal"));

    if (localStorage.getItem("pendidikan-tamatan"))
      setTamatan(localStorage.getItem("pendidikan-tamatan"));

    if (localStorage.getItem("pendidikan-tanggal-ijazah"))
      setTanggalIjazah(localStorage.getItem("pendidikan-tanggal-ijazah"));
    if (localStorage.getItem("pendidikan-nomor-ijazah"))
      setNomorijazah(localStorage.getItem("pendidikan-nomor-ijazah"));
    if (localStorage.getItem("pendidikan-tanggal-skhun"))
      setTanggalSkhun(localStorage.getItem("pendidikan-tanggal-skhun"));
    if (localStorage.getItem("pendidikan-nomor-skhun"))
      setNomorSKHUN(localStorage.getItem("pendidikan-nomor-skhun"));
    if (localStorage.getItem("pendidikan-darisekolah") !== "null")
      setDarisekolah(localStorage.getItem("pendidikan-darisekolah"));
    if (localStorage.getItem("pendidikan-alasan") !== "null")
      setAlasan(localStorage.getItem("pendidikan-alasan"));
    if (localStorage.getItem("pendidikan-bidangkeahlian"))
      setBidangkeahlian(localStorage.getItem("pendidikan-bidangkeahlian"));
    if (localStorage.getItem("pendidikan-programkeahlian"))
      setProgramkeahlian(localStorage.getItem("pendidikan-programkeahlian"));
    if (localStorage.getItem("pendidikan-paketkeahlian"))
      setPaketkeahlian(localStorage.getItem("pendidikan-paketkeahlian"));
    if (localStorage.getItem("pendidikan-kelas"))
      setKelas(localStorage.getItem("pendidikan-kelas"));
    if (localStorage.getItem("pendidikan-sebelumnyalamabelajar"))
      setLamabelajar(localStorage.getItem("pendidikan-sebelumnyalamabelajar"))
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/kesehatan`);
  };

  const nextButton = () => {
    console.log(
      tanggal,
      tamatan,
      lamabelajar,
      tanggalIjazah,
      nomorijazah,
      tanggalSkhun,
      nomorskhun,
      darisekolah || "-",
      alasan || "-",
      bidangkeahlian,
      programkeahlian,
      paketkeahlian,
      kelas
    );
    if (
      tanggal &&
      tamatan &&
      lamabelajar &&
      tanggalIjazah &&
      nomorijazah &&
      tanggalSkhun &&
      nomorskhun &&
      bidangkeahlian &&
      programkeahlian &&
      paketkeahlian &&
      kelas
    ) {
      localStorage.setItem("pendidikan-tanggal", tanggal);
      localStorage.setItem("pendidikan-tamatan", tamatan);
      localStorage.setItem("pendidikan-tanggal-ijazah", tanggalIjazah);
      localStorage.setItem("pendidikan-nomor-ijazah", nomorijazah);
      localStorage.setItem("pendidikan-tanggal-skhun", tanggalSkhun);
      localStorage.setItem("pendidikan-nomor-skhun", nomorskhun);
      localStorage.setItem("pendidikan-darisekolah", darisekolah ? darisekolah : null);
      localStorage.setItem("pendidikan-alasan", alasan ? alasan : null);
      localStorage.setItem("pendidikan-bidangkeahlian", bidangkeahlian);
      localStorage.setItem("pendidikan-programkeahlian", programkeahlian);
      localStorage.setItem("pendidikan-paketkeahlian", paketkeahlian);
      localStorage.setItem("pendidikan-kelas", kelas);
      localStorage.setItem("pendidikan-sebelumnyalamabelajar", lamabelajar)
      navigate(`/siswa/data/${params.action}/ayah`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 rounded-lg text-lg overflow-y-auto">
      <HeaderInput title="Pendidikan Siswa" word="D" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">

        {/* Keterangan Sebelumnya */}
        <h2 className="text-xl font-bold mb-4">1. Keterangan Sebelumnya</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block font-medium mb-1">Tamatan Dari</label>
            <TextInput value={tamatan} onChange={(e) => setTamatan(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Sebelumnya Lama Belajar</label>
            <div className="flex items-center">
              <IntegerInput value={lamabelajar} onChange={(e) => setLamabelajar(e.target.value)} />
              <span className="ml-2 text-gray-700">Tahun</span>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Tanggal Ijazah</label>
            <DatePicker
              selected={tanggalIjazah}
              onChange={(date) => setTanggalIjazah(date)}
              scrollableMonthYearDropdown
              showYearDropdown
              dateFormat={"dd-MM-yyyy"}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none" />
          </div>

          <div>
            <label className="block font-medium mb-1">Nomor Ijazah</label>
            <TextInput value={nomorijazah} onChange={(e) => setNomorijazah(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Tanggal SKHUN</label>
            <DatePicker
              selected={tanggalSkhun}
              onChange={(date) => setTanggalSkhun(date)}
              scrollableMonthYearDropdown
              showYearDropdown
              dateFormat={"dd-MM-yyyy"}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Nomor SKHUN</label>
            <TextInput value={nomorskhun} onChange={(e) => setNomorSKHUN(e.target.value)} />
          </div>
        </div>

        {/* Pindahan */}
        <h2 className="text-xl font-bold mt-6 mb-4">2. Pindahan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Dari Sekolah</label>
            <TextInput value={darisekolah} onChange={(e) => setDarisekolah(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Alasan</label>
            <TextInput value={alasan} onChange={(e) => setAlasan(e.target.value)} />
          </div>
        </div>

        {/* Diterima di Sekolah Ini */}
        <h2 className="text-xl font-bold mt-6 mb-4">3. Diterima di Sekolah Ini</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Kelas</label>
            <IntegerInput value={kelas} onChange={(e) => setKelas(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Tanggal</label>
            <DatePicker
              selected={tanggal}
              onChange={(date) => setTanggal(date)}
              scrollableMonthYearDropdown
              showYearDropdown
              dateFormat={"dd-MM-yyyy"}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              maxDate={new Date()}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bidang Keahlian</label>
            <TextInput value={bidangkeahlian} onChange={(e) => setBidangkeahlian(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Program Keahlian</label>
            <TextInput value={programkeahlian} onChange={(e) => setProgramkeahlian(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Paket Keahlian</label>
            <TextInput value={paketkeahlian} onChange={(e) => setPaketkeahlian(e.target.value)} />
          </div>

        </div>
      </div>

      {/* Tombol Next & Back */}
      <div className="flex justify-end space-x-4">
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default Pendidikan;