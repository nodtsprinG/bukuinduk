import HeaderInput from "../../../components/headerInputV2";
import { useState, useEffect } from "react";
import Profil from "../../../components/lihatprofil";
import InputHalaman from "../../../components/pilihHalamanV2";
import { TextInput } from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseUrl } from "../../../utils/constan";

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
    navigate("/siswa/lihat-data/ayah")
  }
  const nextButton = () => {
    navigate("/siswa/lihat-data/wali")
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <HeaderInput title={"Ibu"} word={"F"} form={"siswa"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Nama Lengkap</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.ibu_kandung?.nama || "Tidak ada data"}
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
                  value={siswa.ibu_kandung?.tempat_lahir || "Tidak ada data"}
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
                  selected={siswa.ibu_kandung?.tanggal_lahir || new Date()}
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">d. Agama</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.ibu_kandung?.agama || "Tidak ada data"}
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
                  value={siswa.ibu_kandung?.kewarganegaraan || "Tidak ada data"}
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
                  value={siswa.ibu_kandung?.pendidikan || "Tidak ada data"}
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
                  value={siswa.ibu_kandung?.pekerjaan || "Tidak ada data"}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">h. Pengeluaran per Bulan (*Rp)</label>
              </td>
              <td className="w-[50%] h-full flex items-center">
                <span className="mr-2 text-black font-normal">Rp.</span>
                <TextInput
                  value={siswa.ibu_kandung?.pengeluaran_per_bulan || "Tidak ada data"}
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
                  value={siswa.ibu_kandung?.alamat_dan_no_telepon || "Tidak ada data"}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Masih Hidup/ Meninggal Dunia</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.ibu_kandung?.status || "Tidak ada data"}
                  className="w-[50%] bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                  defaultValue={"default"}
                >
                </TextInput>
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
