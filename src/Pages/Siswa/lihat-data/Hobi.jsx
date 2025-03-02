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
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

/* 

=====================================================================================================
                    D A T A _ H O B I _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const Hobi = () => {
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
    navigate("/siswa/lihat-data/wali")
  }
  const nextButton = () => {
    navigate("/siswa/lihat-data/perkembangan")
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <HeaderInput title={"Hobi"} word={"H"} form={"siswa"}/>
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Kesenian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.hobi_siswa?.kesenian}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Olahraga</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.hobi_siswa?.olahraga}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Organisasi/Kemasyarakatan</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.hobi_siswa?.organisasi}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Lain-lain</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.hobi_siswa?.lain_lain || "Tidak ada"}
                  className="h-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} lastpage={true} />
    </div>
  );
};
export default Hobi;
