import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import HeaderInput from "../../../components/headerInputV2";
import Profil from "../../../components/lihatprofil";
import InputHalaman from "../../../components/pilihHalamanV2";
import { IntegerInput, TextInput } from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import { baseUrl } from "../../../utils/constan";
import axios from "axios";

/* 
=====================================================================================================
                D A T A _ T E M P A T _ T I N G G A L_ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<
! Warning : Dilarang mengganti sembarangan pada bagian ini
=====================================================================================================
*/

const TempatTinggal = () => {
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
    navigate("/siswa/lihat-data/biodata")
  }
  const nextButton = () => {
    navigate("/siswa/lihat-data/kesehatan")
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const mappingTinggalDengan = {
    ortu: "Orang Tua",
    saudara: "Saudara",
    lainnya: "Lainnya",
    wali: "Wali",
  };

  const tinggalDengan = mappingTinggalDengan[siswa.tempat_tinggal.tinggal_dengan] || "Tidak Diketahui";

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      {/* Profil dan Header */}
      <div className="my-10 w-full">
        <Profil />
      </div>
      <InputHalaman />
      <HeaderInput title="Tempat Tinggal" word="B" form="siswa" />

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
                  value={siswa.tempat_tinggal.alamat}
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
                  value={siswa.tempat_tinggal.no_telepon}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Tinggal Dengan</label>
              </td>
              <td className="w-[63%]">
                <TextInput
                  name="tinggal"
                  value={tinggalDengan}
                  className="w-full bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                >
                </TextInput>
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Jarak Tempat Tinggal ke Sekolah (*km)</label>
              </td>
              <td className="w-[63%]">
                <IntegerInput
                  name="jarak"
                  value={siswa.tempat_tinggal.jarak_ke_sekolah}
                />
                <label className="ml-4 text-normal">KM</label>
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
