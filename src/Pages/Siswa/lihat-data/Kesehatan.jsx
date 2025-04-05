import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../components/lihatprofil";
import {
  TextInput,
  IntegerInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInputV2";
import { Edit, Save } from "lucide-react";
import Swal from "sweetalert2";

// import DatePicker from "react-datepicker";

const Kesehatan = () => {
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
    navigate(`/siswa/lihat-data/tempattinggal`);
  };

  const nextButton = () => {
    navigate(`/siswa/lihat-data/pendidikan`);
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const handleChange = (e, field) => {
    setSiswa((prev) => ({
      ...prev,
      kesehatan: {
        ...prev.kesehatan,
        [field]: e.target.value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      delete siswa.kesehatan.id
      const kesehatan = {
        ...siswa.kesehatan,
        status_perubahan: "pending", // Tambahkan status perubahan
      };

      console.log("Struktur siswa yang dikirim:", JSON.stringify(kesehatan, null, 2));

      const response = await axios.put(baseUrl + `/siswa/data-diri`, { kesehatan: kesehatan }, {
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

  const getUnit = (field) => {
    switch (field) {
      case "tinggi":
        return "cm";
      case "berat_badan":
        return "kg";
      case "suhu":
        return "°C";
      default:
        return "";
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
      <HeaderInput title={"Kesehatan Siswa"} word={"C"} form={"siswa"} />
      <div className="bg-white shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Penyakit", field: "penyakit_pernah_diderita" },
            { label: "Kelainan Jasmani", field: "kelainan_jasmani" },
            { label: "Tinggi Badan (cm)", field: "tinggi", type: "integer" },
            { label: "Berat Badan", field: "berat_badan", type: "integer" },
          ].map(({ label, field, type }, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">{label}</label>
              {type === "integer" ? (
                <div>
                  <IntegerInput
                    value={siswa.kesehatan[field]}
                    onChange={(e) => isEditing && handleChange(e, field)}
                    className="input-field"
                    disabled={!isEditing}
                  />
                  <span className="ml-8">{getUnit(field)}</span>
                </div>
              ) : (
                <TextInput
                  value={siswa.kesehatan[field]}
                  onChange={(e) => isEditing && handleChange(e, field)}
                  className="input-field"
                  disabled={!isEditing}
                />
              )}
            </div>
          ))}

          {/* Anak Yatim */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Golongan Darah</label>
            <select
              name="tinggal_dengan"
              value={siswa.kesehatan.gol_darah || ""}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              onChange={(e) =>
                isEditing &&
                setSiswa((prev) => ({
                  ...prev,
                  kesehatan: { ...prev.kesehatan, gol_darah: e.target.value },
                }))
              }
              disabled={!isEditing}
            >
              <option value="" hidden>Pilih</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
              <option value="lainnya">Lainnya</option>
              <option value="tidak_diketahui">Tidak diketahui</option>
            </select>
          </div>
        </div>
      </div>
      {/* Tombol Next & Back */}
      <div className="flex justify-end space-x-4">
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default Kesehatan;