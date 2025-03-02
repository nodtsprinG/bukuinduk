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
                    D A T A _ K E T E R A N G A N _ P E R K E M B A N G A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const KetPerkembanganSiswa = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [beasiswa, setBeasiswa] = useState("");
  const [meninggalkanTanggal, setMeninggalkanTanggal] = useState("");
  const [meninggalkanAlasan, setMeninggalkanAlasan] = useState("");
  const [akhirpendidikan, setAkhirpendidikan] = useState("");
  const [nomorIjazah, setNomorIjazah] = useState("");
  const [nomorSKHUN, setNomorSKHUN] = useState("");

  const backButton = () => {
    navigate(`/admin/audit/${params.id}/perkembangansiswa`);
  };

  useEffect(() => {
    console.log("Memuat data dari localStorage...");
    setBeasiswa(localStorage.getItem("perkembangan-beasiswa") || "");
    setMeninggalkanTanggal(
      localStorage.getItem("perkembangan-meninggalkan-tanggal")
        ? new Date(localStorage.getItem("perkembangan-meninggalkan-tanggal"))
        : null
    );
    setMeninggalkanAlasan(localStorage.getItem("perkembangan-meninggalkan-alasan") || "");
    setAkhirpendidikan(localStorage.getItem("perkembangan-akhirpendidikan") || "");
    setNomorIjazah(localStorage.getItem("perkembangan-nomor-ijazah") || "");
    setNomorSKHUN(localStorage.getItem("perkembangan-nomor-skhun") || "");
  }, []);

  const nextButton = () => {
    console.log(beasiswa, meninggalkanTanggal, meninggalkanAlasan, akhirpendidikan, nomorIjazah, nomorSKHUN);

    localStorage.setItem("perkembangan-beasiswa", beasiswa);
    localStorage.setItem("perkembangan-meninggalkan-tanggal", meninggalkanTanggal ? meninggalkanTanggal.toISOString() : "");
    localStorage.setItem("perkembangan-meninggalkan-alasan", meninggalkanAlasan);
    localStorage.setItem("perkembangan-akhirpendidikan", akhirpendidikan);
    localStorage.setItem("perkembangan-nomor-ijazah", nomorIjazah);
    localStorage.setItem("perkembangan-nomor-skhun", nomorSKHUN);

    navigate(`/admin/audit/${params.id}/selesaipend`);
  };
  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman id={params.id}/></div>
      <HeaderInput
        title={"Perkembangan Siswa"}
        word={"I"}
        form={"admin"}
      />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Menerima Bea Siswa</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={beasiswa}
                  onChange={(e) => setBeasiswa(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <label className="py-1 font-bold">Meninggalkan Sekolah</label>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">a. Tanggal</label>
              </td>
              <td className="w-[37%] h-full">
                <DatePicker
                  selected={meninggalkanTanggal}
                  onChange={(date) => setMeninggalkanTanggal(date)}
                  dateFormat="dd-MM-yyyy"
                  className="w-full bg-gray-200 py-2 px-2 focus:outline-none rounded-lg"
                  maxDate={new Date()}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">b. Alasan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput value={meninggalkanAlasan} onChange={(e) => setMeninggalkanAlasan(e.target.value)} />
              </td>
            </tr>
            <label className="py-1 font-bold">Akhir Pendidikan</label>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">a. Tamat belajar/lulus</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={akhirpendidikan}
                  onChange={(e) => setAkhirpendidikan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">b. Nomor/Tanggal Ijazah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput value={nomorIjazah} onChange={(e) => setNomorIjazah(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">c. Nomor/Tanggal SKHUN</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput value={nomorSKHUN} onChange={(e) => setNomorSKHUN(e.target.value)} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} />
    </div>
  );
};

export default KetPerkembanganSiswa;
