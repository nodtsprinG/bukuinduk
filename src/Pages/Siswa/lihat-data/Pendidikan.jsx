import HeaderInput from "../../../components/headerInputV2";
import { useState, useEffect } from "react";
import Profil from "../../../components/lihatprofil";
import InputHalaman from "../../../components/pilihHalamanV2"
import {
  TextInput,
  IntegerInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import axios from "axios";
import { baseUrl } from "../../../utils/constan";
import toast from "react-hot-toast";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useNavigate } from "react-router";

/* 

=====================================================================================================
                    D A T A _ P E N D I D I K A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const Pendidikan = () => {
  const [siswa, setSiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  // Ambil ID dari localStorage
  const siswaId = localStorage.getItem("akun-id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!siswaId) {
          setError("ID tidak ditemukan di localStorage");
          setLoading(false);
          return;
        }

        // Panggil API untuk mendapatkan data siswa
        const response = await axios.get(baseUrl + `/siswa/data-diri`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setSiswa(response.data);
      } catch (err) {
        console.log(err)
        setError("Gagal mengambil data siswa", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [siswaId]);

  const backButton = () => {
    navigate("/siswa/lihat-data/kesehatan")
  }
  const nextButton = () => {
    navigate("/siswa/lihat-data/ayah")
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <HeaderInput title={"Pendidikan"} word={"D"} form={"siswa"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td>1. Keterangan Sebelumnya</td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Tamatan Dari</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.sebelumnya_tamatan_dari}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">b. Sebelumnya Lama Belajar</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.sebelumnya_lama_belajar}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">c. Tanggal Ijazah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.sebelumnya_tanggal_ijazah}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">d. Nomor Ijazah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.sebelumnya_no_ijazah}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">e. Tanggal SKHUN</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  name="skhun"
                  value={siswa.pendidikan.sebelumnya_tanggal_skhun}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">f. Tanggal SKHUN</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  name="skhun"
                  value={siswa.pendidikan.sebelumnya_no_skhun}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td>2. Pindahan</td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Dari Sekolah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.pindahan_dari_sekolah}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">b. Alasan</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.pindahan_alasan}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td>3. Diterima Disekolah Ini</td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Kelas</label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput
                  value={siswa.pendidikan.diterima_di_kelas}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">b. Bidang Keahlian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.diterima_di_bidang_keahlian}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">c. Program Keahlian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.diterima_di_program_keahlian}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">d. Paket Keahlian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.pendidikan.diterima_di_paket_keahlian}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">e. Tanggal Diterima</label>
              </td>
              <td className="w-[63%] h-full">
                <DatePicker
                  selected={siswa.pendidikan.diterima_tanggal}
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} />
    </div>
  );
};

export default Pendidikan;