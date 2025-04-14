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
  const [errors, setErrors] = useState({});

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
    if (localStorage.getItem("biodata-kandung") !== "null")
      setKandung(localStorage.getItem("biodata-kandung"));
    if (localStorage.getItem("biodata-angkat") !== "null")
      setAngkat(localStorage.getItem("biodata-angkat"));
    if (localStorage.getItem("biodata-tiri") !== "null")
      setTiri(localStorage.getItem("biodata-tiri"));
    if (localStorage.getItem("biodata-status"))
      setStatus(localStorage.getItem("biodata-status"));
    if (localStorage.getItem("biodata-bahasa"))
      setBahasa(localStorage.getItem("biodata-bahasa"));
  }, []);

  const nextButton = () => {
    const newErrors = {};

    if (!nama) newErrors.nama = "Nama lengkap wajib diisi.";
    if (!panggilan) newErrors.panggilan = "Nama panggilan wajib diisi.";
    if (!jeniskelamin) newErrors.jeniskelamin = "Jenis kelamin wajib diisi.";
    if (!tempatlahir) newErrors.tempatlahir = "Tempat lahir wajib diisi.";
    if (!tanggallahir) newErrors.tanggallahir = "Tanggal lahir wajib diisi.";
    if (!agama) newErrors.agama = "Agama wajib diisi.";
    if (!kewarganegaraan) newErrors.kewarganegaraan = "Kewarganegaraan wajib diisi.";
    if (!anakke) newErrors.anakke = "Nomor anak ke-berapa wajib diisi.";
    if (!bahasa) newErrors.bahasa = "Bahasa sehari-hari wajib diisi.";
    if (!status) newErrors.status = "Status orang tua wajib diisi.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
        text: "Harap lengkapi semua data yang wajib diisi.",
        showCloseButton: true,
      });
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 rounded-lg text-lg overflow-y-auto">
      <HeaderInput title="Data Diri Siswa" word="A" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Lengkap */}
          <div>
            <label className="block font-medium mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <TextInput value={nama} onChange={(e) => setNama(e.target.value)} />
            {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
          </div>

          {/* Nama Panggilan */}
          <div>
            <label className="block font-medium mb-1">
              Nama Panggilan <span className="text-red-500">*</span>
            </label>
            <TextInput value={panggilan} onChange={(e) => setPanggilan(e.target.value)} />
            {errors.panggilan && <p className="text-red-500 text-sm mt-1">{errors.panggilan}</p>}
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block font-medium mb-1">Jenis Kelamin <span className="text-red-500">*</span></label>
            <RadioInput value={jeniskelamin} onChange={(e) => setJeniskelamin(e.target.value)} />
            {errors.jeniskelamin && <p className="text-red-500 text-sm mt-1">{errors.jeniskelamin}</p>}
          </div>

          {/* Agama */}
          <div>
            <label className="block font-medium mb-1">Agama <span className="text-red-500">*</span></label>
            <select
              value={agama}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              onChange={(e) => setAgama(e.target.value)}
            >
              <option value="default" hidden>Pilih</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katholik">Katholik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Hindu</option>
              <option value="Konghucu">Konghuchu</option>
            </select>
            {errors.agama && <p className="text-red-500 text-sm mt-1">{errors.agama}</p>}
          </div>

          {/* Tempat Lahir */}
          <div>
            <label className="block font-medium mb-1">Tempat Lahir <span className="text-red-500">*</span></label>
            <TextInput value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} />
            {errors.tempatlahir && <p className="text-red-500 text-sm mt-1">{errors.tempatlahir}</p>}
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="block font-medium mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
            <DatePicker
              selected={tanggallahir}
              onChange={(date) => setTanggallahir(date)}
              scrollableMonthYearDropdown
              showYearDropdown
              dateFormat="dd-MM-yyyy"
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              maxDate={new Date()}
            />
            {errors.tanggallahir && <p className="text-red-500 text-sm mt-1">{errors.tanggallahir}</p>}
          </div>

          {/* Kewarganegaraan */}
          <div>
            <label className="block font-medium mb-1">Kewarganegaraan <span className="text-red-500">*</span></label>
            <TextInput value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
            {errors.kewarganegaraan && <p className="text-red-500 text-sm mt-1">{errors.kewarganegaraan}</p>}
          </div>

          {/* Bahasa Sehari-hari */}
          <div>
            <label className="block font-medium mb-1">Bahasa Sehari-hari <span className="text-red-500">*</span></label>
            <TextInput value={bahasa} onChange={(e) => setBahasa(e.target.value)} />
            {errors.bahasa && <p className="text-red-500 text-sm mt-1">{errors.bahasa}</p>}
          </div>

          {/* Anak ke-berapa */}
          <div>
            <label className="block font-medium mb-1">Anak Ke <span className="text-red-500">*</span></label>
            <IntegerInput value={anakke} onChange={(e) => setAnakke(e.target.value)} />
            {errors.anakke && <p className="text-red-500 text-sm mt-1">{errors.anakke}</p>}
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
            <label className="block font-medium mb-1">Status Orang Tua <span className="text-red-500">*</span></label>
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
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
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