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
    navigate(`/siswa/lihat-data/ibu`);
  };

  const nextButton = () => {
    navigate(`/siswa/lihat-data/hobi`);
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const handleChange = (e, field) => {
    setSiswa((prev) => ({
      ...prev,
      wali: {
        ...prev.wali,
        [field]: e.target.value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      delete siswa.wali.id
      const wali = {
        ...siswa.wali,
        status_perubahan: "pending", // Tambahkan status perubahan
      };

      console.log("Struktur siswa yang dikirim:", JSON.stringify(wali, null, 2));

      const response = await axios.put(baseUrl + `/siswa/data-diri`, { wali: wali }, {
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
      <HeaderInput title={"Keterangan Wali"} word={"G"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            {[
              { label: "Nama Wali", field: "nama" },
              { label: "Tempat Lahir", field: "tempat_lahir" },
              { label: "Tanggal Lahir", field: "tanggal_lahir", type: "date" },
              { label: "Agama", field: "agama" },
              { label: "Kewarganegaraan", field: "kewarganegaraan" },
              { label: "Pendidikan", field: "pendidikan" },
              { label: "Pekerjaan", field: "pekerjaan" },
              { label: "Pengeluaran per Bulan", field: "pengeluaran_per_bulan" },
              { label: "Alamat/No Telepon", field: "alamat_dan_no_telepon" },
            ].map(({ label, field, type }, index) => (
              <tr key={index}>
                <td className="w-[63%] h-full">
                  <label className="py-1">{label}</label>
                </td>
                <td className="w-[37%] h-full">
                  {type === "integer" ? (
                    <IntegerInput
                      value={siswa.wali[field]}
                      onChange={(e) => isEditing && handleChange(e, "kelengkapan_ortu")}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : type === "radio" ? (
                    <RadioInput
                      value={siswa.wali[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : type === 'date' ? (
                    <DatePicker
                      value={siswa.wali[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full w-1/2 px-4 py-2 bg-[#DEE0E1] rounded-lg"
                      disabled={!isEditing}
                    />
                  ) : (
                    <TextInput
                      value={siswa.wali[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className=" w-full h-full"
                      disabled={!isEditing}
                    />
                  )}
                </td>
              </tr>
            ))}
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