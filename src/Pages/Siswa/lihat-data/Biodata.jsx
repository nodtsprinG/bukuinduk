import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../components/lihatprofil"
import InputHalaman from "../../../components/pilihHalamanV2"
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import HeaderInput from "../../../components/headerInputV2";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

const Biodata = () => {
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
    localStorage.removeItem("token")
    navigate("/siswa")
  }
  const nextButton = () => {
    navigate("/siswa/lihat-data/tempattinggal")
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll h-min:h-screen text-2xl">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <HeaderInput title={"Biodata"} word={"A"} form={"siswa"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Nama Lengkap</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.data_diri.nama_lengkap}
                  className="h-full rounded-[10px]"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Nama Panggilan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.data_diri.nama_panggilan}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Jenis Kelamin</label>
              </td>
              <td className="w-[37%] h-full">
                <RadioInput
                  value={siswa.data_diri.jenis_kelamin}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tempat Lahir</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.data_diri.tempat_lahir}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tanggal Lahir</label>
              </td>
              <td className="w-[37%] h-full rounded-lg">
                <DatePicker
                  selected={siswa.data_diri.tanggal_lahir}
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Agama</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.data_diri.agama}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Kewarganegaraan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.data_diri.kewarganegaraan}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Anak ke</label>
              </td>
              <td className="w-[37%] h-full">
                <IntegerInput
                  value={siswa.data_diri.anak_ke}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Jumlah Saudara Kandung</label>
              </td>
              <td className="w-[37%] h-full">
                <IntegerInput
                  value={siswa.data_diri.jml_saudara_kandung}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Jumlah Saudara Tiri</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={siswa.data_diri.jml_saudara_tiri}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Jumlah Saudara Angkat</label>
              </td>
              <td className="w-[37%] h-full">
                <IntegerInput
                  value={siswa.data_diri.jml_saudara_angkat}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Anak Yatim</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.data_diri.kelengkapan_ortu}
                  className="w-[37%] bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                >
                </TextInput>
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Bahasa Sehari-hari</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={siswa.data_diri.bahasa_sehari_hari}
                  className="h-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default Biodata;