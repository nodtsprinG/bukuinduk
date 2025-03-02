import HeaderInput from "../../../components/headerInputV2";
import { useState, useEffect } from "react";
import Profil from "../../../components/lihatprofil"
import InputHalaman from "../../../components/pilihHalamanV2"
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../../utils/constan";
/* 

=====================================================================================================
                    D A T A _ K E S E H A T A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const Kesehatan = () => {
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
            Authorization : `Bearer ${localStorage.getItem("token")}`
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
    navigate("/siswa/lihat-data/tempattinggal")
  }
  const nextButton = () => {
    navigate("/siswa/lihat-data/pendidikan")
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll h-min:h-screen text-[24px]">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <HeaderInput title={"Kesehatan"} word={"C"} form={"siswa"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Golongan Darah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.kesehatan.gol_darah}
                  className="w-full bg-[#E3E5E6] text-black p-2 rounded"
                >
                </TextInput>
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Penyakit Yang Pernah Diderita</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.kesehatan.penyakit_pernah_diderita}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Kelainan Jasmani</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.kesehatan.kelainan_jasmani}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tinggi Badan (*cm)</label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput
                  value={siswa.kesehatan.tinggi}
                  className="h-full"
                />
                <label className="ml-4 text-normal">CM</label>
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Berat Badan (*kg)</label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput
                  value={siswa.kesehatan.berat_badan}
                  className="h-full"
                />
                <label className="ml-4 text-normal">KG</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} />
    </div>
  );
};

export default Kesehatan;
