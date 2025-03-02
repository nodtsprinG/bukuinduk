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

/* 
=====================================================================================================
                D A T A _ T E M P A T _ T I N G G A L_ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<
! Warning : Dilarang mengganti sembarangan pada bagian ini
=====================================================================================================
*/



const TempatTinggal = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = useParams();
  const [alamat, setAlamat] = useState("");
  const [telp, setTelp] = useState("");
  const [tinggal, setTinggal] = useState("");
  const [jarak, setJarak] = useState("");

  // const [data, setData] = useState({
  //   alamat: "",
  //   telp: "",
  //   tinggal: "",
  //   jarak: "",
  // });

  // Load data dari localStorage
  useEffect((id) => {
    if (localStorage.getItem("tempattinggal-alamat"))
      setAlamat(localStorage.getItem("tempattinggal-alamat"))
    if (localStorage.getItem("tempattinggal-telp"))
      setTelp(localStorage.getItem("tempattinggal-telp"))
    if (localStorage.getItem("tempattinggal-tinggal"))
      setTinggal(localStorage.getItem("tempattinggal-tinggal"))
    if (localStorage.getItem("tempattinggal-jarak"))
      setJarak(localStorage.getItem("tempattinggal-jarak"))
  }, []);

  const backButton = () => {
    navigate(`/admin/audit/${id}/biodata`);
  };

  const nextButton = () => {
    console.log(
      alamat,
      telp,
      tinggal,
      jarak,
    );
    if (
      alamat &&
      telp &&
      tinggal &&
      jarak
    ) {
      if (params.action === "upload") {
        localStorage.setItem("tempattinggal-alamat", alamat);
        localStorage.setItem("tempattinggal-telp", telp);
        localStorage.setItem("tempattinggal-tinggal", tinggal);
        localStorage.setItem("tempattinggal-jarak", jarak);
      }

      navigate(`/admin/audit/${params.id}/kesehatan`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      {/* Profil dan Header */}
      <div className="my-10 w-full">
        <Profil />
      </div>
      <InputHalaman id={params.id} />
      <HeaderInput title="Tempat Tinggal" word="B" form="admin" />

      {/* Form Input */}
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Alamat</label>
              </td>
              <td className="w-[63%]">
                <TextInput
                  name="alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">No Telp/HP</label>
              </td>
              <td className="w-[63%]">
                <TextInput
                  name="telp"
                  value={telp}
                  onChange={(e) => setTelp(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Tinggal Dengan</label>
              </td>
              <td className="w-[63%]">
                <select
                  name="tinggal"
                  value={tinggal}
                  onChange={(e) => setTinggal(e.target.value)}
                  className="w-full bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                >
                  <option value="" hidden>Pilih</option>
                  <option value="ortu">Orang Tua</option>
                  <option value="saudara">Saudara</option>
                  <option value="lainnya">Lainnya</option>
                  <option value="wali">Wali</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Jarak Tempat Tinggal ke Sekolah (*km)</label>
              </td>
              <td className="w-[37%]">
                <IntegerInput
                  name="jarak"
                  value={jarak}
                  onChange={(e) => setJarak(e.target.value)}
                />
                <label className="text-normal">KM</label>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      {/* Tombol Navigasi */}
      <Nextbefore back={backButton} next={nextButton} />
    </div>
  );
};

export default TempatTinggal;
