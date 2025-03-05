/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderInput from "../../../components/headerInputV2";
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
  const [alamatdantelpon, setAlamatdantelpon] = useState("");

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
    if (localStorage.getItem("wali-alamatdantelpon") !== "null")
      setAlamatdantelpon(localStorage.getItem("wali-alamatdantelpon"));
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
      alamatdantelpon
    );
      localStorage.setItem("wali-nama", nama ? nama : null);
      localStorage.setItem("wali-tempatlahir", tempatlahir ? tempatlahir : null);
      localStorage.setItem("wali-tanggallahir", tanggallahir ? tanggallahir : null);
      localStorage.setItem("wali-agama", agama ? agama : null);
      localStorage.setItem("wali-kewarganegaraan", kewarganegaraan ? kewarganegaraan : null);
      localStorage.setItem("wali-pendidikan", pendidikan ? pendidikan : null);
      localStorage.setItem("wali-pekerjaan", pekerjaan ? pekerjaan : null);
      localStorage.setItem("wali-pengeluaran", pengeluaran ? pengeluaran : null);
      localStorage.setItem("wali-alamatdantelpon", alamatdantelpon ? alamatdantelpon : null);
      navigate(`/siswa/data/${params.action}/hobi`);
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <HeaderInput title={"Keterangan Wali"} word={"G"} form={"siswa"} />
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
                  className="bg-[#DEE0E1] py-1 px-1 w-full focus:outline-none"
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
                <label className="py-1 ">h. Pengeluaran per Bulan (*Rp)</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={pengeluaran}
                  onChange={(e) => setPengeluaran(e.target.value)}
                  className="h-full"
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
          </tbody>
        </table>
      </div>
      {/* tambahan */}
      <Nextbefore next={nextButton} back={backButton} />
    </div>
  );
};
export default Wali;
