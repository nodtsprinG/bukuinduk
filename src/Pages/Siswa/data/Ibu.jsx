import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  IntegerInput,
  TextInput,
} from "../../../Components/inputComponent";
import Swal from "sweetalert2";
import Nextbefore from "../../../Components/nextbefore";
import { useNavigate, useParams } from "react-router";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

/* 

=====================================================================================================
                    D A T A _ I B U _ K A N D U N G _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const Ibu = () => {
  const navigate = useNavigate();
  const params = useParams()

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
    if (localStorage.getItem("ibu-nama"))
      setNama(localStorage.getItem("ibu-nama"));
    if (localStorage.getItem("ibu-tempatlahir"))
      setTempatlahir(localStorage.getItem("ibu-tempatlahir"));
    if (localStorage.getItem("ibu-tanggallahir"))
      setTanggallahir(localStorage.getItem("ibu-tanggallahir"));
    if (localStorage.getItem("ibu-agama"))
      setAgama(localStorage.getItem("ibu-agama"));
    if (localStorage.getItem("ibu-kewarganegaraan"))
      setKewarganegaraan(localStorage.getItem("ibu-kewarganegaraan"));
    if (localStorage.getItem("ibu-pendidikan"))
      setPendidikan(localStorage.getItem("ibu-pendidikan"));
    if (localStorage.getItem("ibu-pekerjaan"))
      setPekerjaan(localStorage.getItem("ibu-pekerjaan"));
    if (localStorage.getItem("ibu-pengeluaran"))
      setPengeluaran(localStorage.getItem("ibu-pengeluaran"));
    if (localStorage.getItem("ibu-alamat"))
      setAlamat(localStorage.getItem("ibu-alamat"));
    if (localStorage.getItem("ibu-telepon"));
    setTelepon(localStorage.getItem("ibu-telepon"))
    if (localStorage.getItem("ibu-status"))
      setStatus(localStorage.getItem("ibu-status"));
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/ayah`);
  };

  const nextButton = () => {
    const newErrors = {};

    if (!nama) newErrors.nama = "Nama ibu wajib diisi.";
    if (!tempatlahir) newErrors.tempatlahir = "Tempat lahir wajib diisi.";
    if (!tanggallahir) newErrors.tanggallahir = "Tanggal lahir wajib diisi.";
    if (!agama) newErrors.agama = "Agama wajib diisi.";
    if (!kewarganegaraan) newErrors.kewarganegaraan = "Kewarganegaraan wajib diisi.";
    if (!pendidikan) newErrors.pendidikan = "Pendidikan wajib diisi.";
    if (!pekerjaan) newErrors.pekerjaan = "Pekerjaan wajib diisi.";
    if (!pengeluaran) newErrors.pengeluaran = "Pengeluaran wajib diisi.";
    if (!alamat) newErrors.alamat = "Alamat ibu wajib diisi.";
    if (!status) newErrors.status = "Status ibu wajib diisi.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (params.action === "upload") {
        localStorage.setItem("ibu-nama", nama);
        localStorage.setItem("ibu-tempatlahir", tempatlahir);
        localStorage.setItem("ibu-tanggallahir", tanggallahir);
        localStorage.setItem("ibu-agama", nama);
        localStorage.setItem("ibu-kewarganegaraan", kewarganegaraan);
        localStorage.setItem("ibu-pendidikan", pendidikan);
        localStorage.setItem("ibu-pekerjaan", pekerjaan);
        localStorage.setItem("ibu-pengeluaran", pengeluaran);
        localStorage.setItem("ibu-alamat", alamat);
        localStorage.setItem("ibu-telepon", telepon || "-");
        localStorage.setItem("ibu-status", status);
      }
      navigate(`/siswa/data/${params.action}/wali`);
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
      <HeaderInput title="Keterangan Ibu" word="F" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Informasi Ibu</h2>

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
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none" maxDate={new Date()}
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
              <option value="SMP Sederajat">SMP Sederajat</option>
              <option value="SMA/SMK Sederajat">SMA/SMK/MA Sederajat</option>
              <option value="D1">D1</option>
              <option value="D2">D2</option>
              <option value="D3">D3</option>
              <option value="D4/S1">D4/S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
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
            <label className="block font-medium mb-1">Alamat <span className="text-red-500">*</span></label>
            <TextInput value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Telepon <span className="text-red-500">*</span></label>
            <TextInput value={telepon} onChange={(e) => setTelepon(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Status Ibu <span className="text-red-500">*</span></label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"            >
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
export default Ibu;
