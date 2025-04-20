/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import { useNavigate, useParams } from "react-router";
import Nextbefore from "../../../Components/nextbefore";
//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

/* 

=====================================================================================================
                    D A T A _ W A L I _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const Wali = () => {
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

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("wali-nama") !== "null")
      setNama(localStorage.getItem("wali-nama"));
    if (localStorage.getItem("wali-tempatlahir") !== "null")
      setTempatlahir(localStorage.getItem("wali-tempatlahir"));
    if (localStorage.getItem("wali-tanggallahir") !== "null")
      setTanggallahir(localStorage.getItem("wali-tanggallahir"));
    if (localStorage.getItem("wali-agama") !== "null")
      setAgama(localStorage.getItem("wali-agama"));
    if (localStorage.getItem("wali-kewarganegaraan") !== "null")
      setKewarganegaraan(localStorage.getItem("wali-kewarganegaraan"));
    if (localStorage.getItem("wali-pendidikan") !== "null")
      setPendidikan(localStorage.getItem("wali-pendidikan"));
    if (localStorage.getItem("wali-pekerjaan") !== "null")
      setPekerjaan(localStorage.getItem("wali-pekerjaan"));
    if (localStorage.getItem("wali-pengeluaran") !== "null")
      setPengeluaran(localStorage.getItem("wali-pengeluaran"));
    if (localStorage.getItem("wali-alamat") !== "null")
      setAlamat(localStorage.getItem("wali-alamat"));
    if (localStorage.getItem("wali-telepon") !== "null")
      setTelepon(localStorage.getItem("wali-alamat"));
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/ibu`);
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
      telepon
    );
    localStorage.setItem("wali-nama", nama ? nama : null);
    localStorage.setItem("wali-tempatlahir", tempatlahir ? tempatlahir : null);
    localStorage.setItem("wali-tanggallahir", tanggallahir ? tanggallahir : null);
    localStorage.setItem("wali-agama", agama ? agama : null);
    localStorage.setItem("wali-kewarganegaraan", kewarganegaraan ? kewarganegaraan : null);
    localStorage.setItem("wali-pendidikan", pendidikan ? pendidikan : null);
    localStorage.setItem("wali-pekerjaan", pekerjaan ? pekerjaan : null);
    localStorage.setItem("wali-pengeluaran", pengeluaran ? pengeluaran : null);
    localStorage.setItem("wali-alamat", alamat ? alamat : null);
    localStorage.setItem("wali-telepon", telepon ? telepon : null);
    navigate(`/siswa/data/${params.action}/hobi`);
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 text-lg overflow-y-auto">
      <HeaderInput title="Keterangan Wali" word="G" form="siswa" />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Informasi Wali</h2>

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
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
            />
          </div>

          {/* Agama */}
          <div>
            <label className="block font-medium mb-1">Agama</label>
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
          </div>

          <div>
            <label className="block font-medium mb-1">Kewarganegaraan</label>
            <TextInput value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
          </div>

          {/* Pendidikan */}
          <div>
            <label className="block font-medium mb-1">Pendidikan</label>
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
            <label className="block font-medium mb-1">Alamat Rumah</label>
            <TextInput value={alamat} onChange={(e) => setAlamat(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Telepon</label>
            <TextInput value={telepon} onChange={(e) => setTelepon(e.target.value)} />
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
export default Wali;
