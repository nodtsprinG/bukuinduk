import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalaman";
import {
  TextInput,
  IntegerInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
import { Edit, Save, Download } from "lucide-react"; // Import ikon
import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";

const Kesehatan = () => {
  const [siswa, setSiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setError("ID tidak ditemukan");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}/admin/akun/${id}`, {
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
    navigate(`/admin/lihat/${id}/tempattinggal`);
  };

  const nextButton = () => {
    navigate(`/admin/lihat/${id}/pendidikan`);
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

      const kesehatan = {
        ...siswa.kesehatan, // Tambahkan status perubahan
        status_data: "approved",
      };

      console.log("Struktur siswa yang dikirim:", JSON.stringify(kesehatan, null, 2));

      const response = await axios.put(baseUrl + `/admin/data-diri/${id}`, { kesehatan }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response dari backend:", response.data);
      setIsEditing(false); // Kembali ke mode lihat setelah sukses
      Swal.fire({
        icon: 'success',
        title: 'Data Berhasil diperbarui',
        confirmButtonText: 'OK',
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal menyimpan perubahan',
        confirmButtonText: 'OK',
      })
    }
  };

  const downloadPdf = async () => {
    try {
      const nama = siswa?.data_diri?.nama_lengkap || "Dokumen";
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token tidak ditemukan!");
        return alert("Anda belum login!");
      }

      if (!id) {
        console.error("ID tidak valid!");
        return alert("Terjadi kesalahan, ID tidak ditemukan.");
      }

      console.log(`Mengunduh PDF untuk: ${nama}`);

      const response = await axios.get(`${baseUrl}/admin/export-pdf/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Format binary agar bisa di-download
      });

      // Buat URL dari Blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${nama}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup setelah download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
      alert("Terjadi kesalahan saat mengunduh PDF. Coba lagi nanti!");
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
        <InputHalaman />
      </div>

      {/* Tombol Edit / Simpan dan Unduh */}
      <div className="flex items-center justify-end gap-4 my-6">
        <button
          onClick={isEditing ? handleSave : handleEdit}
          className={`flex items-center gap-2 px-6 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 text-white ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Simpan" : "Ubah"}
        </button>
        <button
          onClick={downloadPdf}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          Unduh
        </button>
      </div>

      {/* Form Data Diri */}
      <HeaderInput title={"Kesehatan Siswa"} word={"C"} form={"admin"} />
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