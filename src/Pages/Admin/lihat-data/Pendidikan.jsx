import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalaman";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
import DatePicker from "react-datepicker";
import { Edit, Save, Download } from "lucide-react"; // Import ikon
import Swal from "sweetalert2";

const Pendidikan = () => {
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
    navigate(`/admin/lihat/${id}/kesehatan`);
  };

  const nextButton = () => {
    navigate(`/admin/lihat/${id}/ayah`);
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

      const pendidikan = {
        ...siswa.pendidikan, // Tambahkan status perubahan
        status_perubahan: "approved",
      };

      console.log("Struktur siswa yang dikirim:", JSON.stringify(pendidikan, null, 2));

      const response = await axios.put(baseUrl + `/admin/data-diri/${id}`, { pendidikan }, {
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
      <HeaderInput title={"Pendidikan Siswa"} word={"D"} form={"admin"} />
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
            { label: "Tanggal Diterima", field: "diterima_tanggal" },
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
                  dateFormat={"dd-MM-yyyy"}
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
      <div className="grid grid-cols-2 space-x-4">
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default Pendidikan;