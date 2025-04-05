import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import { useNavigate, useParams } from "react-router";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Swal from "sweetalert2";

/* 

=====================================================================================================
                    D A T A _ B I O D A T A _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const Biodata = () => {
  const params = useParams();

  //Save data variabel pemting pada kolom input
  const [nama, setNama] = useState("");
  const [panggilan, setPanggilan] = useState("");
  const [jeniskelamin, setJeniskelamin] = useState("");
  const [tempatlahir, setTempatlahir] = useState("");
  const [tanggallahir, setTanggallahir] = useState("");
  const [agama, setAgama] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [anakke, setAnakke] = useState("");
  const [kandung, setKandung] = useState("");
  const [angkat, setAngkat] = useState("");
  const [tiri, setTiri] = useState("");
  const [status, setStatus] = useState("");
  const [bahasa, setBahasa] = useState("");
  const navigate = useNavigate();

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/akun`);
  };

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("biodata-nama"))
      setNama(localStorage.getItem("biodata-nama"));
    if (localStorage.getItem("biodata-panggilan"))
      setPanggilan(localStorage.getItem("biodata-panggilan"));
    if (localStorage.getItem("biodata-jeniskelamin"))
      setJeniskelamin(localStorage.getItem("biodata-jeniskelamin"));
    if (localStorage.getItem("biodata-tempatlahir"))
      setTempatlahir(localStorage.getItem("biodata-tempatlahir"));
    if (localStorage.getItem("biodata-tanggallahir"))
      setTanggallahir(localStorage.getItem("biodata-tanggallahir"));
    if (localStorage.getItem("biodata-agama"))
      setAgama(localStorage.getItem("biodata-agama"));
    if (localStorage.getItem("biodata-kewarganegaraan"))
      setKewarganegaraan(localStorage.getItem("biodata-kewarganegaraan"));
    if (localStorage.getItem("biodata-anakke"))
      setAnakke(localStorage.getItem("biodata-anakke"));
    if (localStorage.getItem("biodata-kandung")!== "null")
      setKandung(localStorage.getItem("biodata-kandung"));
    if (localStorage.getItem("biodata-angkat")!== "null")
      setAngkat(localStorage.getItem("biodata-angkat"));
    if (localStorage.getItem("biodata-tiri")!== "null")
      setTiri(localStorage.getItem("biodata-tiri"));
    if (localStorage.getItem("biodata-status"))
      setStatus(localStorage.getItem("biodata-status"));
    if (localStorage.getItem("biodata-bahasa"))
      setBahasa(localStorage.getItem("biodata-bahasa"));
  }, []);

  const nextButton = () => {
    console.log(
      nama,
      panggilan,
      jeniskelamin,
      tempatlahir,
      tanggallahir,
      agama,
      kewarganegaraan,
      anakke,
      kandung || 0,
      angkat || 0,
      tiri || 0,
      status,
      bahasa
    );
    if (
      nama &&
      panggilan &&
      jeniskelamin &&
      tempatlahir &&
      tanggallahir &&
      agama &&
      kewarganegaraan &&
      anakke &&
      bahasa
    ) {
      if (params.action === "upload") {
        localStorage.setItem("biodata-nama", nama);
        localStorage.setItem("biodata-panggilan", panggilan);
        localStorage.setItem("biodata-jeniskelamin", jeniskelamin);
        localStorage.setItem("biodata-tempatlahir", tempatlahir);
        localStorage.setItem("biodata-tanggallahir", tanggallahir);
        localStorage.setItem("biodata-agama", agama);
        localStorage.setItem("biodata-kewarganegaraan", kewarganegaraan);
        localStorage.setItem("biodata-anakke", anakke);
        localStorage.setItem("biodata-kandung", kandung || 0);
        localStorage.setItem("biodata-angkat", angkat || 0);
        localStorage.setItem("biodata-tiri", tiri || 0);
        localStorage.setItem("biodata-status", status);
        localStorage.setItem("biodata-bahasa", bahasa);
      }
      navigate(`/siswa/data/${params.action}/tempattinggal`);
    } else {
      Swal.fire({
        icon: "error",
        text: "Semua data belum terisi",
        showCloseButton: true,
      })
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 rounded-lg text-lg overflow-y-auto">
      <HeaderInput title="Data Diri Siswa" word="A" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Lengkap */}
          <div>
            <label className="block font-medium mb-1">Nama Lengkap</label>
            <TextInput value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>

          {/* Nama Panggilan */}
          <div>
            <label className="block font-medium mb-1">Nama Panggilan</label>
            <TextInput value={panggilan} onChange={(e) => setPanggilan(e.target.value)} />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block font-medium mb-1">Jenis Kelamin</label>
            <RadioInput value={jeniskelamin} onChange={(e) => setJeniskelamin(e.target.value)} />
          </div>

          {/* Agama */}
          <div>
            <label className="block font-medium mb-1">Agama</label>
            <TextInput value={agama} onChange={(e) => setAgama(e.target.value)} />
          </div>

          {/* Tempat Lahir */}
          <div>
            <label className="block font-medium mb-1">Tempat Lahir</label>
            <TextInput value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} />
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block font-medium mb-1">Tanggal Lahir</label>
            <DatePicker
              selected={tanggallahir}
              onChange={(date) => setTanggallahir(date)}
              scrollableMonthYearDropdown
              showYearDropdown
              dateFormat="dd-MM-yyyy"
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              maxDate={new Date()}
            />
          </div>

          {/* Kewarganegaraan */}
          <div>
            <label className="block font-medium mb-1">Kewarganegaraan</label>
            <TextInput value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
          </div>

          {/* Bahasa Sehari-hari */}
          <div>
            <label className="block font-medium mb-1">Bahasa Sehari-hari</label>
            <TextInput value={bahasa} onChange={(e) => setBahasa(e.target.value)} />
          </div>

          {/* Anak ke-berapa */}
          <div>
            <label className="block font-medium mb-1">Anak Ke</label>
            <IntegerInput value={anakke} onChange={(e) => setAnakke(e.target.value)} />
          </div>

          {/* Jumlah Saudara Kandung */}
          <div>
            <label className="block font-medium mb-1">Jumlah Saudara Kandung</label>
            <IntegerInput
              value={kandung ?? ""}
              nullable
              onChange={(e) => setKandung(e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>

          {/* Jumlah Saudara Tiri */}
          <div>
            <label className="block font-medium mb-1">Jumlah Saudara Tiri</label>
            <IntegerInput
              value={tiri ?? ""}
              nullable
              onChange={(e) => setTiri(e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>

          {/* Jumlah Saudara Angkat */}
          <div>
            <label className="block font-medium mb-1">Jumlah Saudara Angkat</label>
            <IntegerInput
              value={angkat ?? ""}
              nullable
              onChange={(e) => setAngkat(e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>

          {/* Status Orang Tua */}
          <div>
            <label className="block font-medium mb-1">Status Orang Tua</label>
            <select
              value={status}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="default" hidden>Pilih</option>
              <option value="lengkap">Lengkap</option>
              <option value="yatim">Yatim</option>
              <option value="piatu">Piatu</option>
              <option value="yatim piatu">Yatim Piatu</option>
            </select>
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

export default Biodata;