import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  IntegerInput,
  TextInput,
} from "../../../Components/inputComponent";
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
    console.log(
      nama,
      tempatlahir,
      tanggallahir,
      agama,
      kewarganegaraan,
      pendidikan,
      pekerjaan,
      pengeluaran,
      alamat,
      telepon,
      status
    );
    if (
      nama &&
      tempatlahir &&
      tanggallahir &&
      agama &&
      kewarganegaraan &&
      pendidikan &&
      pekerjaan &&
      pengeluaran &&
      alamat &&
      telepon &&
      status
    ) {
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

      navigate(`/siswa/data/${params.action}/wali`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 text-lg overflow-y-auto">
      <HeaderInput title="Keterangan Ibu" word="F" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Informasi Ibu</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Nama Lengkap</label>
            <TextInput value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Tempat Lahir</label>
            <TextInput value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Tanggal Lahir</label>
            <DatePicker
              selected={tanggallahir}
              onChange={(date) => setTanggallahir(date)}
              scrollableMonthYearDropdown
              showYearDropdown
              dateFormat={"dd-MM-yyyy"}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"              maxDate={new Date()}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Agama</label>
            <TextInput value={agama} onChange={(e) => setAgama(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Kewarganegaraan</label>
            <TextInput value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Pendidikan</label>
            <TextInput value={pendidikan} onChange={(e) => setPendidikan(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Pekerjaan</label>
            <TextInput value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Pengeluaran per Bulan (Rp)</label>
            <div className="flex items-center">
              <span className="text-xl mr-8 text-gray-500">Rp</span>
              <IntegerInput value={pengeluaran} onChange={(e) => setPengeluaran(e.target.value)} className="w-full" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Alamat</label>
            <TextInput value={alamat} onChange={(e) => setAlamat(e.target.value)} />
          </div>
          
          <div>
            <label className="block font-medium mb-1">Telepon</label>
            <TextInput value={telepon} onChange={(e) => setTelepon(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"            >
              <option value="default">Pilih</option>
              <option value="masih hidup">Masih Hidup</option>
              <option value="meninggal">Meninggal Dunia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tombol Navigasi */}
      <div className="grid grid-cols-2 space-x-2 mt-4">
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};
export default Ibu;
