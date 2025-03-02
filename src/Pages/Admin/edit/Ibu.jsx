/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalaman";
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

//Date issues
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
  const [alamatdantelpon, setAlamatdantelpon] = useState("");
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
    if (localStorage.getItem("ibu-alamatdantelpon"))
      setAlamatdantelpon(localStorage.getItem("ibu-alamatdantelpon"));
    if (localStorage.getItem("ibu-status"))
      setStatus(localStorage.getItem("ibu-status"));
  }, []);

  const backButton = () => {
    navigate(`/admin/audit/${params.id}/ayah`);
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
      alamatdantelpon,
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
      alamatdantelpon &&
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
      localStorage.setItem("ibu-alamatdantelpon", alamatdantelpon);
      localStorage.setItem("ibu-status", status);

      navigate(`/admin/audit/${params.id}/wali`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman id={params.id} /></div>
      <HeaderInput title={"Ibu"} word={"F"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Nama Lengkap</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">b. Tempat Lahir</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={tempatlahir}
                  onChange={(e) => setTempatlahir(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">c. Tanggal Lahir</label>
              </td>
              <td className="w-[37%] h-full">
                <DatePicker
                  selected={tanggallahir}
                  onChange={(date) => setTanggallahir(date)}
                  scrollableMonthYearDropdown
                  showYearDropdown
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
                  maxDate={new Date()}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">d. Agama</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={agama}
                  onChange={(e) => setAgama(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">e. Kewarganegaraan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={kewarganegaraan}
                  onChange={(e) => setKewarganegaraan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">f. Pendidikan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={pendidikan}
                  onChange={(e) => setPendidikan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">g. Pekerjaan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={pekerjaan}
                  onChange={(e) => setPekerjaan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">h. Pengeluaran per Bulan</label>
              </td>
              <td className="w-[50%] h-full flex items-center">
                <span className="mr-2 text-black font-normal">Rp.</span>
                <TextInput
                  value={pengeluaran}
                  onChange={(e) => setPengeluaran(e.target.value)}
                  className="h-full w-full border rounded px-2"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">i. Alamat Rumah/Telpon</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={alamatdantelpon}
                  onChange={(e) => setAlamatdantelpon(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Masih Hidup/ Meninggal Dunia</label>
              </td>
              <td className="w-[37%] h-full">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-[50%] bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                  defaultValue={"default"}
                >
                  <option value="default">Pilih</option>
                  <option value={"masih hidup"}>Masih Hidup</option>
                  <option value={"meninggal"}>Meninggal Dunia</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* tambahan */}
      <Nextbefore next={nextButton} back={backButton} />
    </div>
  );
};
export default Ibu;
