import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../components/lihatprofil";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInputV2";
import DatePicker from "react-datepicker";
import { Edit, Save } from "lucide-react";
import Swal from "sweetalert2";

const Pendidikan = () => {
  const [siswa, setSiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
  const navigate = useNavigate();
  const id = localStorage.getItem("akun-id")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setError("ID tidak ditemukan");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}/siswa/data-diri`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setSiswa(response.data);
      } catch (err) {
        setError("Gagal mengambil data siswa");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const backButton = () => {
    navigate(`/siswa/lihat-data/kesehatan`);
  };

  const nextButton = () => {
    navigate(`/siswa/lihat-data/ayah`);
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const handleChange = (e, field) => {
    setSiswa((prev) => ({
      ...prev,
      pendidikan: {
        ...prev.pendidikan,
        [field]: e.target.value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      delete siswa.pendidikan.id
      const pendidikan = {
        ...siswa.pendidikan,
        status_data: "pending", // Tambahkan status perubahan
      };

      console.log("Struktur siswa yang dikirim:", JSON.stringify(pendidikan, null, 2));

      const response = await axios.put(baseUrl + `/siswa/data-diri`, { pendidikan: pendidikan }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response dari backend:", response.data);
      setIsEditing(false); // Kembali ke mode lihat setelah sukses
      Swal.fire({
        icon: "info",
        title: "Menunggu Konfirmasi",
        text: "Perubahan data Anda sedang menunggu konfirmasi.",
        showConfirmButton: false,
        timer: 3000,
      })
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Silakan coba lagi.",
        showConfirmButton: false,
        timer: 3000,
      })
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 w-screen px-10 pb-6 h-screen overflow-y-auto text-xl">
      {/* Profil dan Input Halaman */}
      <div className="my-10 w-full flex flex-col gap-6">
        <Profil />
      </div>

      {/* Tombol Edit / Simpan dan Unduh */}
      <div className="flex items-center justify-end gap-4 mt-6">
        <button
          onClick={isEditing ? handleSave : handleEdit}
          className={`flex items-center gap-2 px-6 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 text-white ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Simpan" : "Ubah"}
        </button>
      </div>

      {/* Form Data Diri */}
      <HeaderInput title={"Pendidikan Siswa"} word={"D"} form={"siswa"} />
      <div className="bg-white shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Tamatan dari", field: "sebelumnya_tamatan_dari" },
            { label: "Lama belajar", field: "sebelumnya_lama_belajar" },
            { label: "Tanggal Ijazah", field: "sebelumnya_tanggal_ijazah", type: "date" },
            { label: "Nomor Ijazah", field: "sebelumnya_no_ijazah" },
            { label: "Tanggal SKHUN", field: "sebelumnya_tanggal_skhun", type: "date" },
            { label: "Nomor SKHUN", field: "sebelumnya_no_skhun" },
            { label: "Pindahan", field: "pindahan_dari_sekolah" },
            { label: "Alasan", field: "pindahan_alasan" },
            { label: "Tanggal Diterima", field: "diterima_tanggal", type: "date" },
            { label: "Diterima Di Kelas", field: "diterima_di_kelas", type: "integer" },
            { label: "Bidang Keahlian", field: "diterima_di_bidang_keahlian" },
            { label: "Program Keahlian", field: "diterima_di_program_keahlian" },
            { label: "Paket Keahlian", field: "diterima_di_paket_keahlian" },
          ].map(({ label, field, type }, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">{label}</label>
              {type === 'date' ? (
                <DatePicker
                  selected={siswa.pendidikan[field] ? new Date(siswa.pendidikan[field]) : null}
                  onChange={(date) => isEditing && handleChange({ target: { value: date } }, field)}
                  dateFormat={"dd - MM - yyyy"}
                  className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
                  disabled={!isEditing}
                />
              ) : type === "integer" ? (
                <div>
                  <IntegerInput
                    value={siswa.pendidikan[field]}
                    onChange={(e) => isEditing && handleChange(e, field)}
                    className="input-field"
                    disabled={!isEditing}
                  />

                </div>
              ) : type === "radio" ? (
                <RadioInput
                  value={siswa.pendidikan[field]}
                  onChange={(e) => isEditing && handleChange(e, field)}
                  className="input-field"
                  disabled={!isEditing}
                />
              ) : (
                <TextInput
                  value={siswa.pendidikan[field]}
                  onChange={(e) => isEditing && handleChange(e, field)}
                  className="input-field"
                  disabled={!isEditing}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Tombol Next & Back */}
      <div className="flex justify-end space-x-4">
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default Pendidikan;