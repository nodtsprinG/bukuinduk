import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../components/lihatprofil";
import InputHalaman from "../../../Components/pilihHalamanV2";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
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
      title:"Konfirmasi Keluar",
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
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-2xl">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      {/* Tombol Edit / Simpan */}
      <div className="flex justify-end my-4">
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            <Edit className="w-5 h-5" />
            Ubah
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition duration-300 shadow-md hover:shadow-lg"
          >
            <Save className="w-5 h-5" />
            Simpan
          </button>
        )}
      </div>
      <HeaderInput title={"Data Diri Siswa"} word={"A"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            {[
              { label: "Nama Lengkap", field: "nama_lengkap" },
              { label: "Nama Panggilan", field: "nama_panggilan" },
              { label: "Jenis Kelamin", field: "jenis_kelamin", type: "radio" },
              { label: "Tempat Lahir", field: "tempat_lahir" },
              { label: "Agama", field: "agama" },
              { label: "Kewarganegaraan", field: "kewarganegaraan" },
              { label: "Anak ke", field: "anak_ke", type: "integer" },
              { label: "Jumlah Saudara Kandung", field: "jml_saudara_kandung", type: "integer" },
              { label: "Jumlah Saudara Tiri", field: "jml_saudara_tiri", type: "integer" },
              { label: "Jumlah Saudara Angkat", field: "jml_saudara_angkat", type: "integer" },
              { label: "Bahasa Sehari-hari", field: "bahasa_sehari_hari" },
            ].map(({ label, field, type }, index) => (
              <tr key={index}>
                <td className="w-[63%] h-full">
                  <label className="py-1">{label}</label>
                </td>
                <td className="w-[37%] h-full">
                  {type === "integer" ? (
                    <IntegerInput
                      value={siswa.data_diri[field]}
                      onChange={(e) => isEditing && handleChange(e, "kelengkapan_ortu")}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : type === "radio" ? (
                    <RadioInput
                      value={siswa.data_diri[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : (
                    <TextInput
                      value={siswa.data_diri[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  )}
                </td>
              </tr>
            ))}

            {/* Input Tanggal Lahir */}
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tanggal Lahir</label>
              </td>
              <td className="w-[37%] h-full rounded-lg">
                <DatePicker
                  selected={new Date(siswa.data_diri.tanggal_lahir)}
                  onChange={(date) =>
                    isEditing &&
                    setSiswa((prev) => ({
                      ...prev,
                      data_diri: { ...prev.data_diri, tanggal_lahir: date },
                    }))
                  }
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
                  disabled={!isEditing}
                />
              </td>
            </tr>

            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Anak Yatim</label>
              </td>
              <td className="w-[37%] h-full">
                <select
                  name="anak_yatim"
                  value={siswa.data_diri.kelengkapan_ortu || ""}
                  className="w-full bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                  onChange={(e) =>
                    isEditing &&
                    setSiswa((prev) => ({
                      ...prev,
                      data_diri: { ...prev.data_diri, kelengkapan_ortu: e.target.value },
                    }))
                  }
                  disabled={!isEditing} // Hanya bisa diubah saat mode edit
                >
                  <option value="" hidden>Pilih</option>
                  <option value="lengkap">Lengkap</option>
                  <option value="yatim">Yatim</option>
                  <option value="piatu">Piatu</option>
                  <option value="yatim piatu">Yatim Piatu</option>
                </select>
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