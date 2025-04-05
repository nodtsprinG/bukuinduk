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

const Biodata = () => {
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
    Swal.fire({
      title: "Konfirmasi Keluar",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire("Berhasil Keluar", "Anda telah keluar.", "success").then(() => {
          navigate("/siswa/login");
        });
      }
    });
  };

  const nextButton = () => {
    navigate("/siswa/lihat-data/tempattinggal");
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const handleChange = (e, field) => {
    setSiswa((prev) => ({
      ...prev,
      data_diri: {
        ...prev.data_diri,
        [field]: e.target.value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      delete siswa.data_diri.id
      const biodata = {
        ...siswa.data_diri,
        status_perubahan: "pending", // Tambahkan status perubahan
      };

      console.log("Struktur siswa yang dikirim:", JSON.stringify(biodata, null, 2));

      const response = await axios.put(baseUrl + `/siswa/data-diri`, { data_diri: biodata }, {
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
      <HeaderInput title={"Data Diri Siswa"} word={"A"} form={"siswa"} />
      <div className="bg-white shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Nama Lengkap", field: "nama_lengkap" },
            { label: "Nama Panggilan", field: "nama_panggilan" },
            { label: "Jenis Kelamin", field: "jenis_kelamin", type: "radio" },
            { label: "Bahasa Sehari-hari", field: "bahasa_sehari_hari" },
            { label: "Tempat Lahir", field: "tempat_lahir" },
            { label: "Tanggal Lahir", field: "tanggal_lahir", type: "date" },
            { label: "Agama", field: "agama" },
            { label: "Kewarganegaraan", field: "kewarganegaraan" },
            { label: "Anak ke", field: "anak_ke", type: "integer" },
            { label: "Jumlah Saudara Kandung", field: "jml_saudara_kandung", type: "integer" },
            { label: "Jumlah Saudara Tiri", field: "jml_saudara_tiri", type: "integer" },
            { label: "Jumlah Saudara Angkat", field: "jml_saudara_angkat", type: "integer" },
          ].map(({ label, field, type }, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">{label}</label>
              {type === 'date' ? (
                <DatePicker
                  selected={siswa.data_diri[field] ? new Date(siswa.data_diri[field]) : null}
                  onChange={(date) => isEditing && handleChange({ target: { value: date } }, field)}
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
                  disabled={!isEditing}
                />
              ) : type === "integer" ? (
                <IntegerInput
                  value={siswa.data_diri[field]}
                  onChange={(e) => isEditing && handleChange(e, field)}
                  className="input-field"
                  disabled={!isEditing}
                />
              ) : type === "radio" ? (
                <RadioInput
                  value={siswa.data_diri[field]}
                  onChange={(e) => isEditing && handleChange(e, field)}
                  className="input-field"
                  disabled={!isEditing}
                />
              ) : (
                <TextInput
                  value={siswa.data_diri[field]}
                  onChange={(e) => isEditing && handleChange(e, field)}
                  className="input-field"
                  disabled={!isEditing}
                />
              )}
            </div>
          ))}

          {/* Anak Yatim */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Status</label>
            <select
              name="anak_yatim"
              value={siswa.data_diri.kelengkapan_ortu || ""}
              className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
              onChange={(e) =>
                isEditing &&
                setSiswa((prev) => ({
                  ...prev,
                  data_diri: { ...prev.data_diri, kelengkapan_ortu: e.target.value },
                }))
              }
              disabled={!isEditing}
            >
              <option value="" hidden>Pilih</option>
              <option value="lengkap">Lengkap</option>
              <option value="yatim">Yatim</option>
              <option value="piatu">Piatu</option>
              <option value="yatim piatu">Yatim Piatu</option>
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

export default Biodata;