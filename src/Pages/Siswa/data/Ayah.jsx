/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

/* 

=====================================================================================================
                    D A T A _ A Y A H _ K A N D U N G _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const Ayah = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [tanggallahir, setTanggallahir] = useState(new Date());
  const [nama, setNama] = useState("");
  const [tempatlahir, setTempatlahir] = useState("");
  const [agama, setAgama] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [pengeluaran, setPengeluaran] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("Di cek dulu...");
    console.log()
    if (localStorage.getItem("ayah-nama"))
      setNama(localStorage.getItem("ayah-nama"));
    if (localStorage.getItem("ayah-tempatlahir"))
      setTempatlahir(localStorage.getItem("ayah-tempatlahir"));
    if (localStorage.getItem("ayah-tanggallahir"))
      setTanggallahir(localStorage.getItem("ayah-tanggallahir"));
    if (localStorage.getItem("ayah-agama"))
      setAgama(localStorage.getItem("ayah-agama"));
    if (localStorage.getItem("ayah-kewarganegaraan"))
      setKewarganegaraan(localStorage.getItem("ayah-kewarganegaraan"));
    if (localStorage.getItem("ayah-pendidikan"))
      setPendidikan(localStorage.getItem("ayah-pendidikan"));
    if (localStorage.getItem("ayah-pekerjaan"))
      setPekerjaan(localStorage.getItem("ayah-pekerjaan"));
    if (localStorage.getItem("ayah-pengeluaran"))
      setPengeluaran(localStorage.getItem("ayah-pengeluaran"));
    if (localStorage.getItem("ayah-alamat"))
      setAlamat(localStorage.getItem("ayah-alamat"));
    if (localStorage.getItem("ayah-telepon"))
      setTelepon(localStorage.getItem("ayah-telepon"));
    if (localStorage.getItem("ayah-status"))
      setStatus(localStorage.getItem("ayah-status"));
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/pendidikan`);
  };

  const nextButton = () => {
    const newErrors = {};

    if (!nama) newErrors.nama = "Nama ayah wajib diisi.";
    if (!tempatlahir) newErrors.tempatlahir = "Tempat lahir wajib diisi.";
    if (!tanggallahir) newErrors.tanggallahir = "Tanggal lahir wajib diisi.";
    if (!agama) newErrors.agama = "Agama wajib diisi.";
    if (!kewarganegaraan) newErrors.kewarganegaraan = "Kewarganegaraan wajib diisi.";
    if (!pendidikan) newErrors.pendidikan = "Pendidikan wajib diisi.";
    if (!pekerjaan) newErrors.pekerjaan = "Pekerjaan wajib diisi.";
    if (!pengeluaran) newErrors.pengeluaran = "Pengeluaran wajib diisi.";
    if (!alamat) newErrors.alamat = "Alamat ayah wajib diisi.";
    if (!status) newErrors.status = "Status ayah wajib diisi.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (params.action === "upload") {
        localStorage.setItem("ayah-nama", nama);
        localStorage.setItem("ayah-tempatlahir", tempatlahir);
        localStorage.setItem("ayah-tanggallahir", tanggallahir);
        localStorage.setItem("ayah-agama", nama);
        localStorage.setItem("ayah-kewarganegaraan", kewarganegaraan);
        localStorage.setItem("ayah-pendidikan", pendidikan);
        localStorage.setItem("ayah-pekerjaan", pekerjaan);
        localStorage.setItem("ayah-pengeluaran", pengeluaran);
        localStorage.setItem("ayah-alamat", alamat);
        localStorage.setItem("ayah-telepon", telepon || "-");
        localStorage.setItem("ayah-status", status);
      }
      navigate(`/siswa/data/${params.action}/ibu`);
    } else {
      Swal.fire({
        icon: "error",
        text: "Harap lengkapi semua data yang wajib diisi.",
        showCloseButton: true,
      });
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 text-lg overflow-y-auto">
      <HeaderInput title="Keterangan Ayah" word="E" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Informasi Ayah</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
            <TextInput value={nama} onChange={(e) => setNama(e.target.value)} />
            {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Tempat Lahir <span className="text-red-500">*</span></label>
            <TextInput value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} />
            {errors.tempatlahir && <p className="text-red-500 text-sm">{errors.tempatlahir}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Tanggal Lahir <span className="text-red-500">*</span></label>
            <DatePicker
              selected={tanggallahir}
              onChange={(date) => setTanggallahir(date)}
              scrollableMonthYearDropdown
              showYearDropdown
              dateFormat={"dd-MM-yyyy"}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
            />
            {errors.tanggallahir && <p className="text-red-500 text-sm">{errors.tanggallahir}</p>}
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
            {errors.agama && <p className="text-red-500 text-sm">{errors.agama}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Kewarganegaraan <span className="text-red-500">*</span></label>
            <TextInput value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
            {errors.kewarganegaraan && <p className="text-red-500 text-sm">{errors.kewarganegaraan}</p>}
          </div>

          {/* Pendidikan */}
          <div>
            <label className="block font-medium mb-1">Pendidikan <span className="text-red-500">*</span></label>
            <select
              value={pendidikan}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              onChange={(e) => setAgama(e.target.value)}
            >
              <option value="default" hidden>Pilih</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP Sederajat</option>
              <option value="SMA/SMK/MA">SMA/SMK/MA</option>
              <option value="Diploma 1 (D1)">D1</option>
              <option value="Diploma 2 (D2)">D2</option>
              <option value="Diploma 3 (D3)">D3</option>
              <option value="D4/Diploma 4 (D4)/Sarjana (S1)">D4/S1</option>
              <option value="Magister (S2)">S2</option>
              <option value="Doktor (S3)">S3</option>
            </select>
            {errors.pendidikan && <p className="text-red-500 text-sm">{errors.pendidikan}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Pekerjaan <span className="text-red-500">*</span></label>
            <TextInput value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
            {errors.pekerjaan && <p className="text-red-500 text-sm">{errors.pekerjaan}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Pengeluaran per Bulan <span className="text-red-500">*</span></label>
            <div className="flex items-center">
              <span className="text-xl mr-8 text-gray-500">Rp</span>
              <IntegerInput value={pengeluaran} step={100000} onChange={(e) => setPengeluaran(e.target.value)} className="w-full" />
            </div>
            {errors.pengeluaran && <p className="text-red-500 text-sm">{errors.pengeluaran}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Alamat Rumah <span className="text-red-500">*</span></label>
            <TextInput value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Telepon <span className="text-red-500">*</span></label>
            <TextInput value={telepon} onChange={(e) => setTelepon(e.target.value)} />
            {errors.telepon && <p className="text-red-500 text-sm">{errors.telepon}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Status Ayah <span className="text-red-500">*</span></label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
            >
              <option value="default">Pilih</option>
              <option value="masih hidup">Masih Hidup</option>
              <option value="meninggal">Meninggal Dunia</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
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
export default Ayah;
